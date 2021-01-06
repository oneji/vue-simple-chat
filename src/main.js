import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import VueMoment from 'vue-moment'
import io from './config/socket'
import moment from 'moment'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

require('moment/locale/ru')

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMoment, { moment });

Vue.use(new VueSocketIO({
    debug: true,
    connection: io,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}))

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
