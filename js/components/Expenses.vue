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
             
            <div class="expenses__tablis-tabl" v-for="(item) in expensesFilter" :key="item.idi">
                <input type="text" class="texti" v-model="item.date"  >
                <input type="text" class="texti" v-model="item.category" >
                <input type="text" class="texti" v-model="item.amount" >
            </div>
            
        </div>
        <div class="razdel"> </div>
        <div class="block_button">
            <div class="button" v-on:click="expensesSave"></div>
            <div class="button" v-on:click="$emit('delzapbegin')"></div>
           
            </div>

        
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
            expensesFilter:[]
        }
    },
    created() {
       this.loadingExpensesLocalStorage() //считываем расходы из LocalStorage
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
            this.expensesFilter =[]
            if (!prizn) { 
                for (let index = 0; index < 20; index++) {
                    this.expensesFilter.push({date:'', category:'', amount:'',  idi: kod + index})
                }
            } else {
                for (let index = 0; index < this.expenses[kod].tablis.length; index++) {
                    this.expensesFilter.push(this.expenses[kod].tablis[index])
                }
            }
        },
        
        statClickNavHead(e){
            this.dateExpenses.setMonth(this.dateExpenses.getMonth() + e);  // переопределяем месяц 
            this.title =  updateTitle.updateTitle(this.dateExpenses)
            this.calcExpensesFilter()
        },

        expensesSave(){
            const kod = 'p' + updateTitle.updateMonth(this.dateExpenses)+ this.dateExpenses.getFullYear()
            const prizn = kod in this.expenses;
            console.log('this.tablExpenses  ' + this.tablExpenses)
            
            if (!prizn) {
                this.expenses[kod] = {tablis: []}
            }
            this.expenses[kod].totalAmount = 0
            let a = 0
            for (let index = 0; index < 20; index++) {
                   this.expenses[kod].tablis[index] = {
                       date: this.expensesFilter[index].date,
                       category: this.expensesFilter[index].category,
                       amount: this.expensesFilter[index].amount
                    } 
                    this.expenses[kod].totalAmount = this.expenses[kod].totalAmount + Number(this.expensesFilter[index].amount)
                    a += 3 
            }
            console.log('this.tablExpenses  ' + this.tablExpenses)
            console.log('this.expenses ' + this.expenses[kod])
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