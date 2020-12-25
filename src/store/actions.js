import * as mutationTypes from './mutation-types'

export default {    
    setContentLoading({ commit }, flag) {
        commit(mutationTypes.SET_CONTENT_LOADING, flag);
    },
}