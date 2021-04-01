<template>
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
</template>
<script>
export default {
    props: ['goods'],
    methods: {
		inputKey(e) {
			
			this.$emit('addtask', e);
		},
	 }
}
</script>