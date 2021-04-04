<template>
    <div class="oknostatist" id="oknostatist1">
         <div v-on:click="$emit('zakrstatistik')" id="zakrstat">Х</div>
        <HeaderNav
            :title="title"
            v-on:clicknav="statClickNavHead"
        />
        <div class="stattablis" id="stattabli">
                <div class="stattabl">Месяц</div>
                <div class="stattabl">Сумма</div>
                <div class="stattabl">Кол-во</div>
                <div class="stattabl">Расходы</div>
                <div class="stattabl">Доход</div>
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