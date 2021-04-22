<template>
    <div>
            <HeaderNav
                v-on:clicknav="clicknav"
                :title="title"
            /> 

            <HeaderDay/>

            <GoodsList 
                :goods="goods"
                v-on:tablsNev="tablsNev"
            />
            <div class="shape">
                <Tablis
                    
                    :goods="tabls"
                    v-if="clikDay"
                /> 
            </div> 
            <div class="razdel"> </div>
            <div class="block_button">
                <div class="button" id="p4" v-on:click="$emit('getSaveLocalStorage')"></div>
                <div class="button" id="delz" v-on:click="$emit('delzapbegin')"></div>
                <div class="button" id="rashodi" v-on:click="$emit('expenses')"></div>
                <div class="button" id="stat" v-on:click="$emit('statistik')"></div>
            </div>
    </div>
</template>

<script>
import HeaderNav from './HeaderNav.vue'
import HeaderDay from './HeaderDay.vue'
import GoodsList from './GoodList.vue'
import Tablis from './Tablis.vue'

export default {
    name: 'Calendar',
    props: ['title','goods','tabls'],
    components: {
        HeaderNav,
        HeaderDay,
        GoodsList,
        Tablis,
    },
    data:() => ({
        clikDay: false
    }),
    methods: {
        tablsNev(e){
            this.clikDay = true
            this.$emit('tablsNev', e);
        },
        clicknav(e){
            this.clikDay = false
            this.$emit('clicknav', e);
        },
        addtask(e) {
            console.log('inputKey tttt    ', e);
            this.$emit('addtask', e);
        }
        
    }
}
</script>
