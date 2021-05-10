<template>
    <div>
		<div class="tablis" >
			<div class="tabli">Время</div>
			<div class="tabli">Ф.И.О.</div>
			<div class="tabli">Телефон</div>
			<div class="tabli">Оплата</div>
		</div>		
		<div class="tablis" 
			v-for="(good) in goods" :key="good.id">
			<input  class="texti" type = "time" v-model="good.time"	/>
			<input  class="texti" type = "text" v-model="good.name"	/>
			<input  class="texti" type = "text" v-model="good.telephone"	/>
			<input  class="texti" type = "number" v-model="good.summ"	/>
		</div>
	</div>
</template>
<script>
export default {
    props: ['goods'],
}
</script>