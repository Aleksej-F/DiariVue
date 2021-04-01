<template>
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
</template>
<script>
export default {
    props: ['goods'],
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
}
</script>