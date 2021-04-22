<template>
    <div class="tablis" id="p3">
			<div class="tabli">Время</div>
			<div class="tabli">Ф.И.О.</div>
			<div class="tabli">Телефон</div>
			<div class="tabli">Оплата</div>
			
				<input type="text" class="texti" 
					v-for="(good, index) in goods"
					:key="good.id"
					v-model="good.zar"
					:data="index"/>
			
		</div>
</template>
<script>
export default {
    props: ['goods'],
   	
	
	
}
</script>