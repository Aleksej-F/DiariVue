import Vue from 'vue'
import App from './App.vue'
//import './style.css'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

firebase.initializeApp({
    apiKey: "AIzaSyB6xfKN_W0a0zfeE6sQwASq5pI-iN5PbTE",
    authDomain: "diary-64427.firebaseapp.com",
    projectId: "diary-64427",
    storageBucket: "diary-64427.appspot.com",
    messagingSenderId: "173254307942",
    appId: "1:173254307942:web:204505cf2a7cbc8e2d3da7",
    measurementId: "G-RYGRQ3GP54"

})




new Vue({
    
    render: h => h(App),
}).$mount('#app');


document.onload