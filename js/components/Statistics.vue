<template>
    <div class="oknostatist">
         <div v-on:click="$emit('zakrstatistik')" >Х</div>
        
        <HeaderNav
            :title="title"
            v-on:clicknav="statClickNavHead"
        />
        <div class="stattablis">
                
                    <div class="stattabl stattabl__toprow">Месяц</div>
                    <div class="stattabl stattabl__toprow">Сумма</div>
                    <div class="stattabl stattabl__toprow">Кол-во</div>
                    <div class="stattabl stattabl__toprow">Расходы</div>
                    <div class="stattabl stattabl__toprow">Доход</div>
               
                <div class="stattabl"
                    v-for="st in stter"
                    :key="st.id"
                >{{ st.zn }}</div>
                
        </div>
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