import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters'
import actions from './actions'
import mutations from './mutations'

// Modules
import authModule from './modules/auth'
import chatModule from './modules/chat'

export default new Vuex.Store({
    state: {
        contentLoading: false
    },
    modules: {
        auth: authModule,
        chat: chatModule
    },

    getters,
    mutations,
    actions,
})
