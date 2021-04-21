import firebase from 'firebase/app'

export default {
    actions: {
      async fetchRecordings({commit, dispatch}) {
        try {
          const uid = await dispatch('getUid')
          const categories = (await firebase.database().ref(`/users/${uid}/diary`).once('value')).val() || {}
          console.log(categories)
          // return Object.keys(categories).map(key => ({...categories[key], id: key}))
        } catch (e) {
          commit('setError', e)
          throw e
        }
      },
      
    }
  }
  