<template>
    <div class="hear1">
			<p class="hear"
				v-for="good in title"
				:key="good.id"
			> {{ good }} </p>
	</div>
</template>

<script>
export default {
    props: ['title'],
}
</script>