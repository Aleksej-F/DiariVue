<template>
    <div class="hear1">
			<p class="hear"
				v-for="good in dayMonth"
				:key="good.id"
			> {{ good }} </p>
	</div>
</template>

<script>
export default {
    props: ['title'],
	data: () => ({
	dayMonth : ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС',],
	}),
}
</script>