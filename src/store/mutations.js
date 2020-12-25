import * as mutationTypes from './mutation-types'

export default {
    [mutationTypes.SET_CONTENT_LOADING] (state, flag) {
        state.contentLoading = flag;
    }
}