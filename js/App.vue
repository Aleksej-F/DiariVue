<template>
    <div id="app" class="wrapper">
        <HeaderNav
            v-on:clicknav="clickNavHead"
            :title="titleHed"
        /> 
        <HeaderDay
            :title="dayMonth"
        />              
        <GoodsList 
            :goods="monthTable"
        />
        <div class="shape">
        <Tablis
               v-on:addtask="tablsInput"
            :goods="tabls"
        /> 
        </div> 
        <div class="razdel"> </div>
        <div class="block_button">
            <div class="button" onclick="savezapbegin()" id="p4"></div>
            <div class="button" onclick="delzapbegin()" id="delz"></div>
            <div class="button" onclick="rashodibegin()" id="rashodi"></div>
            <div class="button" onclick="statistik()" id="stat"></div>
        </div>
    </div>   
</template>
<script>

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
        Tablis
    },

    data() {
        return {
            monthTable: { 
			cellClick: 0,
			arr:[]
            },
            titleHed:'',
            date2 : new Date(),  // текущая дата
            date1 : new Date(),  // текущая дата для изменения
            smech : [6, 7, 1, 2, 3, 4, 5],  // смещение нумерации дней
            jacheka : '1',
            tabls : ['','','','','','','','','','','','','','','','',],  // массив для хранения записей таблицы
            vidcodmed : [],// массив для хранения ключей - дат
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
  
        }
    },
    created() {
         // обращаемся к фун-ии для заполнения месяца данными
        
        this.generatingMonthData(this.date1.getFullYear(),this.date1.getMonth(),this.date1.getDate(),this.jacheka);  
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
            console.log("generatingMonthData" + this.titleHed);
            // текущая дата 
			let date3 = new Date(year,month,days);    
			// устанавливаем дату для заполнения календаря
			let date1 = new Date(year,month,days);  
			// дата для определения смещения от первого числа
			let date = new Date(date1.getFullYear(),date1.getMonth(),1);    
			//устанавливаем дату для первой ячейки
			date3.setDate(date.getDate() - this.smech[date.getDay()]);
			// формируем ключ по дате
			let kodmet ='p'+ year +'' + this.monthN[month][1] + '' + days; 
			//console.log('kodmet   ' + kodmet);			
			this.monthTable.arr = [];
			
			const min = 1;
			const max = 4;
			for (let n = 0; n < 42; n++) { 
				let item = {
					id: n,
					day: date3.getDate(),
					prMonth: date3.getMonth() !== date1.getMonth(), //признак текущего месяца
					prSunday: date3.getDay() === 0, // признак выходного
					recordsDay: Math.round( min - 0.5 + Math.random() * (max - min + 1)), // кол-во записей в день
					prCir2: false, //признак стилей для анимации
					prCir3: false,
                    //признак текущего дня
					prCurrentDay: ((date3.getMonth() === this.date2.getMonth())&&((date3.getDate() === this.date2.getDate())))

				};
				//item.day;
				date3.setDate(date3.getDate() + 1);
				//console.log('item '+ item.day+ '  '+item.prMonth+ '    '+item.prSunday+ '    '+item.recordsDay);
				this.monthTable.arr.push({ ...item});
			//console.log('this.monthTable   '+this.monthTable[n].day)
			}
			this.monthTable.cellClick = jcheika;
			
			
			//console.log('this.monthTable   '+this.monthTable[n])
			//console.log('this.monthTable   '+this.monthTable)
			 
		},

		//********************** ф-ия  клик по стрелке назад или вперед на окне календаря
		clickNavHead(a){
			this.date1.setMonth(this.date1.getMonth() + a);  // переопределяем месяц 
			this.generatingMonthData(this.date1.getFullYear(),this.date1.getMonth(),this.date1.getDate(),1);     // обращение к ф-ии для обновления данных месяца
		}, 
		
		tablsInput(e) { // ввод в полях Input
			this.tabls[e.target.attributes.data.value] = e.target.value;
		},


    },
    

}
</script>

<style scoped>
 
</style>