<template>
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
	


</template>
<script>
export default {
    props: ['title'],
    
}
</script>

<style>
 
</style>