import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  actions: {
   async updateTitle({dispatch, commit}, {date}) {
     const monthN = {   // Название месяца
      0: ["Январь", "01"],
      1: ["Февраль", "02"],
      2: ["Март", "03"],
      3: ["Апрель", "04"],
      4: ["Май", "05"],
      5: ["Июнь", "06"],
      6: ["Июль", "07"],
      7: ["Август", "08"],
      8: ["Сентябрь", "09"],
      9: ["Октябрь", "10"],
      10: ["Ноябрь", "11"],
      11: ["Декабрь", "12"],
    }   

     let title = monthN[date.getMonth()][0] + " " + date.getFullYear();
     console.log ('// Название месяца  ' + title )
     return await title
   }
  },
  getters: {
    error: s => s.error
  },
  modules: {
   // recordings
  }
})
