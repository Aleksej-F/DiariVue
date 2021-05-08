<template>
    <div id="app" class="wrapper">
        
        <Calendar
            v-if="basic === 'o'"
            
            :title="titleHed"
            v-on:clicknav="clickNavHead"
            
            :goods="monthTable"
            v-on:tablsNev="tablsNev"
            
            :tabls="tabls"

            v-on:getSaveLocalStorage="getSaveLocalStorage"
            v-on:delzapbegin="delzapbegin"
            v-on:expenses="openExpenses"
            v-on:statistik="openStatistik"
        />
       
        <Statistics 
            :title="statTitle"
            :stter="stter"
            v-on:statClick="calcStatistik"
            v-on:zakrstatistik="zakrStatistik"
            v-else-if="basic === 's'"
        />
        
        <Expenses
            v-else-if="basic === 'r'"
            :title="titleHed"
            :expenses="saveExpenses"
            v-on:zakrExpenses="zakrExpenses"
        />
    </div>   
</template>
<script>
import firebase from 'firebase/app'

import Calendar from './components/Calendar.vue'
import Statistics from './components/Statistics.vue'
import Expenses from './components/Expenses.vue'
import HeaderNav from './components/HeaderNav.vue'
import HeaderDay from './components/HeaderDay.vue'
import GoodsList from './components/GoodList.vue'
import Tablis from './components/Tablis.vue'

export default {
    name: 'App',
    components: {
        HeaderNav,
        HeaderDay,
        GoodsList,
        Tablis,
        Statistics,
        Expenses,
        Calendar,
    },

    data() {
        return {
            monthTable: {  //объект с информацией календаря
                cellClick: 0, //номер кликнутой ячейки
                arr:[],
                cellClickKodmet: '' // код кликнутой ячейки для поиска записей
            },
            titleHed:'',
            statTitle:'',
            date2 : new Date(),  // текущая дата
            date1 : new Date(),  // текущая дата для изменения
            smech : [6, 7, 1, 2, 3, 4, 5],  // смещение нумерации дней
            tabls :[],  // массив для хранения записей таблицы календаря
            
            monthN : {   // Название месяца
                0: ["Январь", "01"],
                1: ["Февраль", "02"],
                2: ["Март", "03"],
                3: ["Апрель", "04"],
                4: ["Май", "05"],
                5: ["Июнь", "06"],
                6: ["Июль", "07"],
                7: ["Август", "08"],
                8: ["Сентябрь", "09"],
                9: ["Октябрь", "10"],
                10: ["Ноябрь", "11"],
                11: ["Декабрь", "12"],
            },            
            saveRecordings: {},     //объект с записями
            saveExpenses: {},         // объект с расходами
            basic: 'o',              // признак активного окна
            stter:[],

        }
    },
    created() {
        
        // обращаемся к фун-ии для считывания списка записей
        // this.fetchRecordings()
        this.loadingLocalStorage()
        console.log('app saveExpenses.arr   ')
        console.log(this.saveExpenses)
         // обращаемся к фун-ии для формирования объекта месяца
        this.generatingMonthData()
        // обращаемся к фун-ии для заполнения объекта месяца данными
        this.generatingMonthData1(this.date1.getFullYear(),this.date1.getMonth(),this.date1.getDate(),this.jacheka);  
    },
    computed: {
        
    },
    methods: {
       
		generatingMonthData() {
			for (let n = 0; n < 42; n++) { 
				let item = {
					id: n,
					day: 1,
                    kodmet: '',// формируем ключ - дату
					prMonth: false, //признак текущего месяца
					prSunday: false, // признак выходного
					prCir2: false, //признак стилей для анимации
					prCir3: false,
                    prCurrentDay: false,//признак текущего дня
                    recordsDay:0
                };
				this.monthTable.arr.push({ ...item});
			}
        },
        // 
		generatingMonthData1(year,month,days) {
			this.titleHed = this.monthN[month][0] + " " + year;
            this.statTitle = year;
                //  дата активного месяца
			let date1 = new Date(year,month,days);  
                // дата для определения смещения от первого числа
			let date = new Date(year,month,1);    
			    // дата для первой ячейки
            let date3 = new Date(year,month,days); 
			date3.setDate(date.getDate() - this.smech[date.getDay()]);	
			
			for (let n = 0; n < 42; n++) { 
				this.monthTable.arr[n].day= date3.getDate();
                    // формируем ключ - дату
                this.monthTable.arr[n].kodmet= 'p'+ date3.getFullYear() + '' + this.monthN[date3.getMonth()][1] + '' + date3.getDate();
				this.monthTable.arr[n].prMonth= date3.getMonth() !== date1.getMonth(); //признак текущего месяца
				this.monthTable.arr[n].prSunday= date3.getDay() === 0; // признак выходного
				this.monthTable.arr[n].prCir2= false; //признак стилей для анимации
				this.monthTable.arr[n].prCir3= false;
                    //признак текущего дня
				this.monthTable.arr[n].prCurrentDay= ((date3.getMonth() === this.date2.getMonth())&&((date3.getDate() === this.date2.getDate())))
                    // проверка кол-ва записей в день
                if (this.monthTable.arr[n].kodmet in this.saveRecordings) {
                    this.monthTable.arr[n].recordsDay = this.saveRecordings[this.monthTable.arr[n].kodmet].couterRecordings; 
                } else {this.monthTable.arr[n].recordsDay = 0}
				date3.setDate(date3.getDate() + 1);
			}
			
		},
        // ф-я обновления заголовка для Expenses
        calsExpenses(year,month,){
            this.titleHed = this.monthN[month][0] + " " + year;

        },
		//********************** ф-ия  клик по стрелке назад или вперед на окне календаря
		clickNavHead(a){
			this.date1.setMonth(this.date1.getMonth() + a);  // переопределяем месяц 
			this.generatingMonthData1(this.date1.getFullYear(),this.date1.getMonth(),this.date1.getDate(), 1);     // обращение к ф-ии для обновления данных месяца
        }, 
        // клик по стрелке назад или вперед на окне расходов
		
        tablsNev(ind) {
            const date = this.monthTable.arr[this.monthTable.cellClick].kodmet;          
            const prizn = date in this.saveRecordings;
            
            this.tabls =[]
            
            for (let ii=0; ii<16; ii++) {
                if (prizn) {
                    this.tabls[ii] = {id: date + ii, zar:  this.saveRecordings[date].tabls[ii]};
                } else {
                    this.tabls[ii] = {id: date + ii, zar: ''};
                }
            } 
            //console.log('ggggggg   ', this.tabls)
        },
               
        getSaveLocalStorage() {
           
            if (this.monthTable.cellClick === 0) {
                return
            }
            //console.log('saveLocalStorage ' )
            const prizn = this.monthTable.cellClickKodmet in this.saveRecordings;
            console.log('saveLocalStorage ' + prizn )
            console.log( this.tabls)
            if (!prizn) {
                this.saveRecordings[this.monthTable.cellClickKodmet] = {tabls: []};
            }
            let counterPaid = 0; 
            let couterRecordings = 0;
            let pr = false;   
            for (let ii = 1; ii < 17; ii++) {
                    if (this.tabls[ii-1].zar !== '') {pr = true};
                    if (ii % 4 === 0) {
                        if (pr === true) {couterRecordings += 1;}
                        if (this.tabls[ii-1].zar !== '') {counterPaid += 1;} 
                        pr = false;
                    }
                    this.saveRecordings[this.monthTable.cellClickKodmet].tabls[ii-1] = this.tabls[ii-1].zar
            }
            this.saveRecordings[this.monthTable.cellClickKodmet].counterPaid = counterPaid;
            this.saveRecordings[this.monthTable.cellClickKodmet].couterRecordings = couterRecordings;
            console.log('массив записей дня для сохранения  ',this.saveRecordings[this.monthTable.cellClickKodmet])
            if (couterRecordings > 0) {
                this.saveLocalStorage()
                console.log('сохранил')
            } else if (prizn) { 
                console.log('удалил этот  день')
                delete  this.saveRecordings[this.monthTable.cellClickKodmet];// удаляем запись из списка записей
                this.saveLocalStorage();
            } else {console.log('не стал сохранять')};

           this.loadingLocalStorage()
           this.monthTable.arr[this.monthTable.cellClick].recordsDay = couterRecordings;
        },

        loadingLocalStorage() {
            this.saveRecordings = JSON.parse(localStorage.getItem('recordings')); // спарсим в объект список записей
            if (this.saveRecordings===null) {this.saveRecordings = {}}
            this.saveExpenses = JSON.parse(localStorage.getItem('expenses')); // спарсим в объект список записей
            if (this.saveExpenses===null) {this.saveExpenses = {}}
        },

        saveLocalStorage() {
            let serialObj = JSON.stringify(this.saveRecordings);         // сериализуем  объект
//                this.firebaseSaveRecordings(serialObj);
                try {	
                    localStorage.setItem('recordings', serialObj); // запишем его в хранилище по ключу recordings
                } 
                catch (e) {
                    if (e == QUOTA_EXCEEDED_ERR) {
                        alert('Превышен лимит памяти');
                    }
                }
        },

        delzapbegin() {
            console.log(this.monthTable.cellClick)
            if (this.monthTable.cellClick === 0) {
                return
            }
            
            let isprizn = confirm("Вы точно хотите удалить записи?");
            
            if (isprizn) {
                delete  this.saveRecordings[this.monthTable.cellClickKodmet];// удаляем запись из списка записей
                this.saveLocalStorage();
                this.monthTable.arr[this.monthTable.cellClick].recordsDay = 0;
                
                this.tablsNev();
            }
        },

        openStatistik()  {
            this.calcStatistik(this.statTitle)
            this.basic = 's';
        },
        zakrStatistik(){
            this.basic = 'o';
        },
        openExpenses() {
            this.basic = 'r';
        },
        zakrExpenses(){
            this.basic = 'o';
        },
        calcStatistik(e){
            this.saveExpenses = JSON.parse(localStorage.getItem('expenses')); // спарсим в объект список записей
            if (this.saveExpenses===null) {this.saveExpenses = {}}
            
            let stschet = [0,0,0,0,0];
            let stschet_itig = [0,0,0,0,0];
            this.statTitle = e;
            let stmes=0
            for (stmes=0; stmes<12; stmes++){
                for (let stden=1; stden<32; stden++){
                    let stkodmet ='p' + this.statTitle + '' + this.monthN[stmes][1] + '' + stden; // формируем ключ - дату
                    let prizn = stkodmet in this.saveRecordings;  
                    if(prizn) {
                        let zz = 3;
                        for (let stzap=0; stzap<3; stzap++) {
                            if (this.saveRecordings[stkodmet].tabls[zz] !== '') {
                                stschet[0] = Number.parseInt(stschet[0]) + Number.parseInt(this.saveRecordings[stkodmet].tabls[zz]);
                                
                            }
                            zz +=4
                            
                        }
                        stschet[1] += this.saveRecordings[stkodmet].counterPaid; //счетчик по оплате
                        stschet[2] += this.saveRecordings[stkodmet].couterRecordings; //счетчик по колличеству записанных
                    }
                }
                let stkod ='p'  + this.monthN[stmes][1] +  this.statTitle  ; // формируем ключ - дату
                console.log('stkod    -  ' + stkod)
                const prizn = stkod in this.saveExpenses
                console.log(this.saveExpenses)
                console.log( prizn)
                if (prizn) {
                    for (let a = 0; a < this.saveExpenses[stkod].tablis.length; a++) {
                        console.log( this.saveExpenses[stkod].tablis[a].amount)
                        stschet[3] = stschet[3] + Number(this.saveExpenses[stkod].tablis[a].amount)
                    }
                    
                    stschet[4] = stschet[1] - stschet[3]
                }
                this.stter[stmes*5] = {zn:this.monthN[stmes][0], id:stmes * 5};
                this.stter[stmes*5+1] = {zn:stschet[0], id:stmes * 5 + 1} ; 
                this.stter[stmes*5+2] = {zn:stschet[2] + " / " + stschet[1], id:stmes * 5 + 2}  ;
                this.stter[stmes*5+3] = {zn:stschet[3], id:stmes * 5 + 3} ;
                this.stter[stmes*5+4] = {zn:stschet[4], id:stmes * 5 + 4} ;  
                stschet_itig[0] = stschet_itig[0] + stschet[0];
                stschet_itig[1] = stschet_itig[1] + stschet[1];
                stschet_itig[2] = stschet_itig[2] + stschet[2];
                stschet_itig[3] = stschet_itig[3] + stschet[3];
                stschet_itig[4] = stschet_itig[4] + stschet[4];
                stschet=[0,0,0,0,0];
                
            }
            this.stter[stmes*5] = {zn:'Итого', id:stmes * 5} ;
            this.stter[stmes*5+1] = {zn:stschet_itig[0], id:stmes * 5 + 1} ;
            this.stter[stmes*5+2] = {zn:stschet_itig[2] + " / " + stschet_itig[1], id:stmes * 5 + 2}  ;
            this.stter[stmes*5+3] = {zn:stschet_itig[3], id:stmes * 5 + 3} ;
            this.stter[stmes*5+4] = {zn:stschet_itig[4], id:stmes * 5 + 4} ;  
            
        },
        async firebaseSaveRecordings(title) {
            try {
                const uid = firebase.auth().currentUser.uid 
                console.log('серв  ', uid)
                await firebase.database().ref(`/users/${uid}/diary`).set(title)
            } catch (e) { 
               console.log('fgffff  ', e) 
            }
        },
        async fetchRecordings() {
            
            try {
               
                await this.firebaseLogin()
                
                console.log('загрузка записей  ')
                const uid = firebase.auth().currentUser.uid
                const recordings = (await firebase.database().ref(`/users/${uid}/diary`).once('value')).val() || {}
                console.log('загрузка записей   ',JSON.parse(recordings))
                let t=0
                for (let key in JSON.parse(recordings)) { 
                    t++
                     console.log(key)
                }
                console.log('загрузка записей кол-во:  ',t)
                // return Object.keys(categories).map(key => ({...categories[key], id: key}))
            } catch (e) {
            console.log('fgffff  ', e) 
            }
        },
        async firebaseLogin() {
            try {
                const email = 'dir@mail.ru' 
                const password ='123456'
                await firebase.auth().signInWithEmailAndPassword(email, password)
                console.log('залогинился  ')
            } catch (e) {
            console.log('fgffff  ', e) 
            }
        },


    },
    

}
</script>

<style scoped>
 
</style>