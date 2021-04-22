<template>
    <div>
        <div class="expenses__head">
            <p>Расходы</p> 
            <div v-on:click="$emit('zakrExpenses')" class="expenses__head-zakr">Х</div>
        </div>
        
       
        <HeaderNav
                :title="title"
                v-on:clicknav="statClickNavHead"
            />
        
    </div>
</template>

<script>
import HeaderNav from './HeaderNav.vue'
export default {
    props: ['title', 'stter'],
    components: {
        HeaderNav,
    },
    methods: {    
         statClickNavHead(e){
            let tit = +this.title;
            tit += e;
            this.title = String(tit)
            this.$emit('statClick', this.title);
        },
        
    }
}
</script>