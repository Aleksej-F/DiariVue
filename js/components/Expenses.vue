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
             <div class="expenses__tablis-tabl"
                v-for="(item,index) in expensesFilter"
                :data="index"
                
             >
             
                <input type="text" class="texti" v-model="item.date" v-on:input="expensesInputKey" :data="item.id[0]">
                <input type="text" class="texti" v-model="item.category" v-on:input="expensesInputKey" :data="item.id[1]">
                <input type="text" class="texti" v-model="item.amount" v-on:input="expensesInputKey" :data="item.id[2]">
            </div>
             <div class="expenses__tablis-tabl"
             >
                <input type="text" class="texti">
                <input type="text" class="texti">
                <input type="text" class="texti">
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
    props: ['expenses','stter'],
    data() {
        return {
            title:'',
            dateExpenses: new Date(),  // текущая дата для изменения
            //tablsExpenses:[],  // массив для хранения записей таблицы расходов
           //date:{ year, month}
           tablExpenses:[],
        }
    },
    created() {
       console.log('Expenses Expenses.arr  created  ' + this.expenses.arr.length) 
       
    },
    mounted(){
       //this.tablsExpenses = this.expensesFilter()
        this.title =  updateTitle.updateTitle(this.dateExpenses)
        console.log('Expenses Expenses.arr  mounted  ' + this.expenses.arr.length)
    },
    components: {
        HeaderNav,
    },
    computed: {
        expensesFilter() {
            const kod = 'p' + updateTitle.updateMonth(this.dateExpenses)+ this.dateExpenses.getFullYear()
            const prizn = kod in this.expenses.arr;
            let c = 1
            let expens =[]
            if (!prizn) { 
                for (let index = 0; index < 20; index++) {
                    expens.push({date:'',category:'',amount:'',id:[c,c+1,c+2]})
                    c +=3
                }
            
            } else {
            
                console.log('this expenses   ' + this.expenses.arr[kod].length)
                
                if (this.expenses.arr[kod].length < 20) {
                    for (let index = 0; index < this.expenses.arr[kod].length; index++) {
                        expens.push(this.expenses.arr[kod][index])
                    }
                    for (let index = this.expenses.arr[kod].length; index < 20; index++) {
                        expens.push({date:'',category:'',amount:''})
                    
                        
                    }
                }
            }
            console.log('expens   ' + expens)
            return expens
        }
    },
    methods: {    
        statClickNavHead(e){
            
            this.dateExpenses.setMonth(this.dateExpenses.getMonth() + e);  // переопределяем месяц 
            this.title =  updateTitle.updateTitle(this.dateExpenses)
           
        },
        expensesSave(){
            const kod = 'p' + updateTitle.updateMonth(this.dateExpenses)+ this.dateExpenses.getFullYear()
            const prizn = kod in this.expenses.arr;
            if (!prizn) {
                this.expenses.arr.push({[kod]:[]})

                for (let index = 0; index < 20; index++) {
                   this.expenses.arr[kod].push( this.expensesFilter[index] )  
                }
            }
        },
        expensesInputKey(e){
            console.log(e.target.value)
            console.log(e.target.attributes.data.value)
            
        }
        //calsExpenses(year,month)
        
    }
}
</script>