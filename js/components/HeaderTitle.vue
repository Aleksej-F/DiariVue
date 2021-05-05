<template >
    <div class="expenses__head">
            
            <div v-on:click="$emit('zakr')" class="expenses__head-zakr"> 
                <p>Х</p> 
            </div>
             <p>{{ title }}</p>
            
    </div>
</template>
<script>
export default {
    props: ['title'],
    
}
</script>