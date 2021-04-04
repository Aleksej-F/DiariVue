<template>
    <div id="app" class="wrapper">
        <div v-if="basic">
            <HeaderNav
                v-on:clicknav="clickNavHead"
                :title="titleHed"
            /> 
            <HeaderDay
                :title="dayMonth"
            />              
            <GoodsList 
                :goods="monthTable"
                v-on:tablsNev="tablsNev"
            />
            <div class="shape">
            <Tablis
                v-on:addtask="tablsInput"
                :goods="tabls"
            /> 
            </div> 
            <div class="razdel"> </div>
            <div class="block_button">
                <div class="button" id="p4" v-on:click="getSaveLocalStorage"></div>
                <div class="button" id="delz" v-on:click="delzapbegin"></div>
                <div class="button" id="rashodi" v-on:click="rashodibegin" ></div>
                <div class="button" id="stat" v-on:click="statistik" ></div>
            </div>
        </div>
        <Statistics 
            :title="statTitle"
            :stter="stter"
            v-on:statClick="calcStatistik"
            v-on:zakrstatistik="zakrstatistik"
            v-else/>
    </div>   
</template>
<script>
import Statistics from './components/Statistics.vue'
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
        Statistics
    },

    data() {
        return {
            monthTable: { 
                cellClick: 0,
                arr:[],
                cellClickKodmet: ''
            },
            titleHed:'',
            statTitle:'',
            date2 : new Date(),  // текущая дата
            date1 : new Date(),  // текущая дата для изменения
            smech : [6, 7, 1, 2, 3, 4, 5],  // смещение нумерации дней
            jacheka : '1',
            tabls :[],  // массив для хранения записей таблицы
            
            dayMonth : ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС',],
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
            saveRecordings: {},
            basic: true,
            stter:[],

        }
    },
    created() {
        //this.saveLocalStorage1() 
        // обращаемся к фун-ии для считывания списка записей
        this.loadingLocalStorage()
        this.tablsCreate()
        // обращаемся к фун-ии для заполнения месяца данными
        this.generatingMonthData(this.date1.getFullYear(),this.date1.getMonth(),this.date1.getDate(),this.jacheka);  
    },
    computed: {
        
    },
    methods: {
        // ф-ия определения дня на заданное количество дней назад
 		getDateAgo(date, days){
		 	let dateCopy = new Date(date);
			dateCopy.setDate(date.getDate() - days);
			return dateCopy.getDate();
		},
		// ф-ия определения последнего дня месяца
		getLastDayOfMonth(year, month){
			let date = new Date(year, month + 1, 0);
			return date.getDate();
		},

		generatingMonthData(year,month,days,jcheika) {
			this.titleHed = this.monthN[month][0] + " " + year;
            this.statTitle = year;
            // текущая дата 
			let date3 = new Date(year,month,days);    
			// устанавливаем дату для заполнения календаря
			let date1 = new Date(year,month,days);  
			// дата для определения смещения от первого числа
			let date = new Date(date1.getFullYear(),date1.getMonth(),1);    
			//устанавливаем дату для первой ячейки
			date3.setDate(date.getDate() - this.smech[date.getDay()]);
			//console.log('kodmet   ' + kodmet);			
			this.monthTable.arr = [];
			const min = 0;
			const max = 4;
			for (let n = 0; n < 42; n++) { 
				
                let item = {
					id: n,
					day: date3.getDate(),
                    // формируем ключ - дату
                    kodmet: 'p'+ date3.getFullYear() + '' + this.monthN[date3.getMonth()][1] + '' + date3.getDate(),
					prMonth: date3.getMonth() !== date1.getMonth(), //признак текущего месяца
					prSunday: date3.getDay() === 0, // признак выходного
					prCir2: false, //признак стилей для анимации
					prCir3: false,
                    //признак текущего дня
					prCurrentDay: ((date3.getMonth() === this.date2.getMonth())&&((date3.getDate() === this.date2.getDate())))
                };
				
                if (item.kodmet in this.saveRecordings) {
                    item.recordsDay = this.saveRecordings[item.kodmet].couterRecordings; // кол-во записей в день
                } else {item.recordsDay = 0}
				date3.setDate(date3.getDate() + 1);
				//console.log('item '+ item.day+ '  '+item.prMonth+ '    '+item.prSunday+ '    '+item.recordsDay);
				this.monthTable.arr.push({ ...item});
			    //console.log('this.monthTable   '+this.monthTable[n].day)
			}
			//this.monthTable.cellClick = jcheika;
			
		},

		//********************** ф-ия  клик по стрелке назад или вперед на окне календаря
		clickNavHead(a){
			this.date1.setMonth(this.date1.getMonth() + a);  // переопределяем месяц 
			this.generatingMonthData(this.date1.getFullYear(),this.date1.getMonth(),this.date1.getDate(), 1);     // обращение к ф-ии для обновления данных месяца
            this.tablsCreate();
            this.tablDen()

        }, 
		// ввод в полях Input
        tablsInput(e) { 
           	this.tabls[e.target.attributes.data.value].zar = e.target.value;
            
		},
        // создание таблицы 
        tablsCreate(){
            for (let ii=0; ii<16; ii++) {
                this.tabls[ii] = {id: ii, zar: ''};
            }
        },
        tablsNev(ind) {
            const date = this.monthTable.arr[ind].kodmet;          
            const prizn = date in this.saveRecordings;
            let tabl= [];
            if (prizn) {
                tabl =  this.saveRecordings[date].tabls 
            }
            for (let ii=0; ii<16; ii++) {
                if (prizn) {
                    this.tabls[ii].zar = tabl[ii]; 
                } else {
                    this.tabls[ii].zar =''
                }
            } 
            this.tablDraw()
        },
        getSaveLocalStorage() {
            console.log('saveLocalStorage ' )
            const prizn = this.monthTable.cellClickKodmet in this.saveRecordings;
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
            console.log(this.saveRecordings[this.monthTable.cellClickKodmet])
            if (couterRecordings > 0) {
                this.saveLocalStorage()
            }
           this.loadingLocalStorage()
           this.monthTable.arr[this.monthTable.cellClick].recordsDay = couterRecordings;
        },

        loadingLocalStorage() {
            this.saveRecordings = JSON.parse(localStorage.getItem('recordings')); // спарсим в объект список записей
        },
        saveLocalStorage1() {
            let serialObj = JSON.stringify({});         // сериализуем  объект
            try {	
		        localStorage.setItem('recordings', serialObj); // запишем его в хранилище по ключу recordings
	        } 
	        catch (e) {
		        if (e == QUOTA_EXCEEDED_ERR) {
			        alert('Превышен лимит памяти');
		        }
	        }
        },
        tablDraw(){
	        let ter1 = document.getElementsByClassName('texti'); // выбираем все DIVы с классом texti в объект ter1     
            for (let ii=0; ii<16; ii++) {
                ter1[ii].value = this.tabls[ii].zar;
            } 
        },
        saveLocalStorage() {
            let serialObj = JSON.stringify(this.saveRecordings);         // сериализуем  объект
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
            let isprizn = confirm("Вы точно хотите удалить записи?");
            if (isprizn) {
                delete  this.saveRecordings[this.monthTable.cellClickKodmet];
                this.saveLocalStorage();
                this.monthTable.arr[this.monthTable.cellClick].recordsDay = 0;
                console.log(this.monthTable.cellClick)
                this.tablsNev(this.monthTable.cellClick);
            }
        },
        statistik()  {
            this.calcStatistik(this.statTitle)
            this.basic = false;
        },
        zakrstatistik(){
            this.basic = true;
        },
        calcStatistik(e){
            let stschet = [0,0,0];
            let stschet_itig = [0,0,0];
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
                this.stter[stmes*5] = {zn:this.monthN[stmes][0], id:stmes * 5};
                this.stter[stmes*5+1] = {zn:stschet[0], id:stmes * 5 + 1} ; 
                this.stter[stmes*5+2] = {zn:stschet[2] + " / " + stschet[1], id:stmes * 5 + 2}  ;
                this.stter[stmes*5+3] = {zn:'', id:stmes * 5 + 3} ;
                this.stter[stmes*5+4] = {zn:'', id:stmes * 5 + 4} ;  
                stschet_itig[0] = stschet_itig[0] + stschet[0];
                stschet_itig[1] = stschet_itig[1] + stschet[1];
                stschet_itig[2] = stschet_itig[2] + stschet[2];
                stschet=[0,0,0];
                
            }
            this.stter[stmes*5] = {zn:'Итого', id:stmes * 5} ;
            this.stter[stmes*5+1] = {zn:stschet_itig[0], id:stmes * 5 + 1} ;
            this.stter[stmes*5+2] = {zn:stschet_itig[2] + " / " + stschet_itig[1], id:stmes * 5 + 2}  ;
            this.stter[stmes*5+3] = {zn:'', id:stmes * 5 + 3} ;
            this.stter[stmes*5+4] = {zn:'', id:stmes * 5 + 4} ;  
            
        }

    },
    

}
</script>

<style scoped>
 
</style>