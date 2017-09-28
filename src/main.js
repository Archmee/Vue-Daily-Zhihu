import Vue from 'vue'
import axios from 'axios'
import store from './store.js'
import router from './router.js'
import App from './App.vue'
import VueInfiniteScroll from 'vue-infinite-scroll'

import { Swipe, SwipeItem } from 'mint-ui'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

import './assets/css/normalize.css'
import './assets/css/common.css'

Vue.use(VueInfiniteScroll);

Vue.prototype.$http = axios

new Vue({
    store,
    router,
    el: '#app',
    render: h => h(App)
})