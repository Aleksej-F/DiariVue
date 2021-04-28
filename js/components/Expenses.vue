<template>
    <div class="expenses">
        <div class="expenses__head">
            <p>Расходы</p> 
            <div v-on:click="$emit('zakrExpenses')" class="expenses__head-zakr">Х</div>
        </div>
        
        <HeaderNav
            :title="title"
            v-on:clicknav="statClickNavHead"
        />
        
        <div class="expenses__tablis">
            <div class="expenses__tablis-tabl">
                <p>Дата</p>
                <p>На что</p>
                <p>Сумма</p>
            </div>
            <div class="expenses__tablis-tablis">
            
                <div class="expenses__tablis-tabl" v-for="(item) in expensesFilter" :key="item.idi">
                    <input type="text" class="expenses__tablis-texti" v-model="item.item.date"  v-on:input="saveExpensesLocalStorage">
                    <input type="text" class="expenses__tablis-texti" v-model="item.item.category" v-on:input="saveExpensesLocalStorage">
                    <input type="text" class="expenses__tablis-texti" v-model="item.item.amount" v-on:input="saveExpensesLocalStorage">
                </div>
            </div> 
        </div>
<!--
        <div class="razdel"> </div>
        <div class="block_button">
            <div class="button" v-on:click="calcExpensesSave"></div>
            <div class="button" v-on:click="$emit('delzapbegin')"></div>
           
        </div>
-->
        
    </div>
</template>

<script>
import HeaderNav from './HeaderNav.vue'
import updateTitle from '.././func/update.js'
export default {
    props: ['expenses'],
    data() {
        return {
            title:'',
            dateExpenses: new Date(),  // текущая дата для изменения
            tablExpenses:[],
            expensesFilter:[],
            index: 20
        }
    },
    created() {
      // this.loadingExpensesLocalStorage() //считываем расходы из LocalStorage
       this.calcExpensesFilter()
    },
    mounted(){
        this.title =  updateTitle.updateTitle(this.dateExpenses)  // обновляем заголовок
    },
    components: {
        HeaderNav,
    },
    computed: {
       
    },
    methods: {  
        calcExpensesFilter() {
            
            const kod = 'p' + updateTitle.updateMonth(this.dateExpenses) + this.dateExpenses.getFullYear()
            const prizn = kod in this.expenses;
            
            console.log('this.expenses')
            console.log(this.expenses)
            
            this.expensesFilter = []
            if (!prizn) { 
                this.expenses[kod]={tablis: []}
                for (let index = 0; index < this.index; index++) {
                    this.expenses[kod].tablis.push({date:'', category:'', amount:''})
                }
            } 
                for (let index = 0; index < this.expenses[kod].tablis.length; index++) {
                    this.expensesFilter.push({item: this.expenses[kod].tablis[index], idi: kod + index})
                    //this.expensesFilter[index].idi = kod + index
                }
            console.log('this.expensesFilter')
            console.log(this.expensesFilter)
        },
        
        statClickNavHead(e){
            this.dateExpenses.setMonth(this.dateExpenses.getMonth() + e);  // переопределяем месяц 
            this.title =  updateTitle.updateTitle(this.dateExpenses)
            this.calcExpensesFilter()
        },

        calcExpensesSave(){
            const kod = 'p' + updateTitle.updateMonth(this.dateExpenses)+ this.dateExpenses.getFullYear()
            const prizn = kod in this.expenses;
            console.log('this.tablExpenses  ' + this.tablExpenses)
            console.log(this.tablExpenses)
            if (!prizn) {
                this.expenses[kod] = {tablis: []}
                this.expenses[kod].totalAmount = 0
                let a = 0
                for (let index = 0; index < this.index; index++) {
                    this.expenses[kod].tablis[index] = {
                        date: this.expensesFilter[index].date,
                        category: this.expensesFilter[index].category,
                        amount: this.expensesFilter[index].amount
                        } 
                        this.expenses[kod].totalAmount = this.expenses[kod].totalAmount + Number(this.expensesFilter[index].amount)
                        a += 3 
                }
                this.calcExpensesFilter()
            }
            
            console.log('this.tablExpenses  ' + this.tablExpenses)
            console.log(this.tablExpenses)
            console.log('this.expenses ' + this.expenses[kod])
            console.log(this.expenses[kod])
            
            this.saveExpensesLocalStorage()
        },
        
        saveExpensesLocalStorage() {
            let serialObj = JSON.stringify(this.expenses);         // сериализуем  объект
//                this.firebaseSaveRecordings(serialObj);
                try {	
                    localStorage.setItem('expenses', serialObj); // запишем его в хранилище по ключу recordings
                } 
                catch (e) {
                    if (e == QUOTA_EXCEEDED_ERR) {
                        alert('Превышен лимит памяти');
                    }
                }
        },

        loadingExpensesLocalStorage() {
            this.expenses = JSON.parse(localStorage.getItem('expenses')); // спарсим в объект список записей
            if (this.expenses===null) {this.expenses = {}}
        },
       
    }
}
</script>