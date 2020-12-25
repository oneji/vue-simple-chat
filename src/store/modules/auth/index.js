import getters from './getters'
import mutations from './mutations'
import actions from './actions'

const authModule = {
    namespaced: true,
    state: {
        loading: false,
        isAuthenticated: !!localStorage.getItem('token'),
        user: null,
        error: false,
        errorMessage: ''
    },

    getters,
    mutations,
    actions
}

export default authModule