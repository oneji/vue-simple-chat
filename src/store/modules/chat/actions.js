import { getRoomById, sendMessage } from '@/services/chat'
import * as mutationTypes from './mutation-types'

export default {
    async getChatById({ commit }, roomId) {
        commit(mutationTypes.SET_LOADING, true);

        try {
            let { data } = await getRoomById(roomId);

            commit(mutationTypes.SET_CHAT, {
                messages: data.data.messages,
                ...data.data.room
            });
        } catch (error) {
            console.log(error);
        } finally {
            commit(mutationTypes.SET_LOADING, false);
        }
    },

    async sendMessage({ commit }, messageData) {
        try {
            let { data } = await sendMessage(messageData);

            console.log(data)
            commit(mutationTypes.ADD_MESSAGE, data.data);
        } catch (error) {
            console.log(error);
        }
    }
}