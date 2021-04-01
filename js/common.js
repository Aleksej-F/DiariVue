var cellWidth = 80;                 // размер ячеек
var cellHeight = 80;                // размер ячеек

Vue.component('headernav', {
	props: ['title'],
	template: `
		<div class="header">
            <div class="header_btn" 
            	v-on:click="$emit('clicknav', -1)"
            ></div>
            <div>
                <p class="header_butn">{{ title }}</p>
            </div>
            <div class="header_btn" 
            	v-on:click="$emit('clicknav', 1)"
            ></div>
        </div>
	`,

});

Vue.component('headerday', {
	props: ['title'],
	template: `
		<div class="hear1">
			<p class="hear"
				v-for="good in title"
				:key="good.id"
			> {{ good }} </p>
		</div>
	`,
});

Vue.component('tablis', {
	props: ['goods'],
	template: `
		<div class="tablis" id="p3">
			<div class="tabli">Время</div>
			<div class="tabli">Ф.И.О.</div>
			<div class="tabli">Телефон</div>
			<div class="tabli">Оплата</div>
			<div class="tabli"
				v-for="(good, index) in goods"
				:key="good.id"
			><input type="text" class="texti" :data="index"
				v-bind:value="good"
				v-on:input="(e) => inputKey(e)"
			/>  </div>
			
		</div>
	`,
	methods: {
		inputKey(e) {
			
			this.$emit('addtask', e);
		},
	 }
});


Vue.component('goodslist', {
    props: ['goods'],
    template: `
        <div class="goods-list">
        	<div class="hearid" id="board">
	            <div class="ter"  
	            	v-for="good in goods.arr" 
                	:key="good.id"
                	v-bind:class="{ 'month-color': good.prMonth, 'text-danger': good.prSunday, 'current-day': good.prCurrentDay }"
	            	v-on:click.prevent="myClickKell(good,goods)"
	            > {{ good.day }}
	                <div class="cir1"
	                	v-bind:class="{ cir2: good.prCir2, cir3: good.prCir3 }"
	                ></div>
	                <div class="cir"> {{ good.recordsDay }} </div>
	            </div>
         	</div>

        </div>
    `,
     methods: {
     	myClickKell(good,goods) {
     	//	console.log(goods.cellClick);
     		goods.arr[goods.cellClick].prCir2 = false;
     		goods.cellClick = good.id;
     		//if (good.prCir2) {good.prCir2 = !good.prCir2}
     		good.prCir3 = true;
     		setTimeout(() => good.prCir3 = false, 200);
     		good.prCir2 = true;
     	}
     }
});

new Vue ({
	el:' #app',
	data: {
		monthTable: { 
			cellClick: 0,
			arr:[]
		},
		titleHed:'',
		date2 : new Date(),  // текущая дата
		date1 : new Date(),  // текущая дата для изменения
		smech : [6, 7, 1, 2, 3, 4, 5],  // смещение нумерации дней
		jacheka : 1,
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
	},

	created() {// методы выполняемые после загрузки
        // обращаемся к фун-ии для заполнения месяца данными
        this.generatingMonthData(this.date1.getFullYear(),this.date1.getMonth(),this.date1.getDate(),this.jacheka);  
    },

    computed: { //вычисляемые параметры
    },

    methods: { // методы
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
			// текущая дата 
			let date3 = new Date(year,month,days);    
			// устанавливаем дату для заполнения календаря
			let date1 = new Date(year,month,days);  
			// дата для определения смещения от первого числа
			let date = new Date(date1.getFullYear(),date1.getMonth(),1);    
			//устанавливаем дату для первой ячейки
			date3.setDate(date.getDate() - this.smech[date.getDay()]);
			// формируем ключ по дате
			let kodmet ='p'+ year +''+this.monthN[month][1] +'' + days; 
			console.log('kodmet   '+kodmet)			
			this.monthTable.arr = [];
			
			const min = 1;
			const max = 4;
			for (n = 0; n<42; n++) { 
				const item = {
					id: n,
					day: date3.getDate(),
					prMonth: date3.getMonth() !== date1.getMonth(),
					prSunday: date3.getDay() === 0,
					recordsDay: Math.round( min - 0.5 + Math.random() * (max - min + 1)),
					prCir2: false,
					prCir3: false,
					prCurrentDay: ((date3.getMonth() === this.date2.getMonth())&&((date3.getDate() === this.date2.getDate())))

				};
				item.day;
				date3.setDate(date3.getDate() + 1);
				//console.log('item '+ item.day+ '  '+item.prMonth+ '    '+item.prSunday+ '    '+item.recordsDay);
				 this.monthTable.arr.push({ ...item});
			//console.log('this.monthTable   '+this.monthTable[n].day)
			}
			this.monthTable.cellClick = jcheika;
			this.titleHed = this.monthN[month][0] + " " +year;
			
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

	

})