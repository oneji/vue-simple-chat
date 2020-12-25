import * as mutationTypes from './mutation-types'

export default {
    [mutationTypes.SET_LOADING] (state, flag) {
        state.loading = flag;
    },

    [mutationTypes.SET_CHAT] (state, chat) {
        state.currentChat = chat;
    },

    [mutationTypes.ADD_MESSAGE] (state, message) {
        state.currentChat.messages.push(message);
    }
}