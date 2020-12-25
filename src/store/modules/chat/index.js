import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const chatModule = {
    namespaced: true,
    state: {
        currentChat: {},
        loading: false,
        rooms: []
    },

    getters,
    mutations,
    actions
}

export default chatModule