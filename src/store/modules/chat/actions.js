import * as mutationTypes from './mutation-types'
import { 
    startChat,
    getRooms,
    getRoomById,
    sendMessage,
    markMessageAsRead
} from '@/services/chat'

export default {
    async startChat({ commit }, roomData) {
        try {
            let { data } = await startChat(roomData);

            console.log(data);

            commit(mutationTypes.PUSH_ROOM, data.data);
        } catch (error) {
            console.log(error);
        }
    },

    async getRooms({ commit, rootState }) {
        try {
            let userId = rootState.auth.user.id;
            let { data } = await getRooms(userId);

            commit(mutationTypes.SET_ROOMS, data.data);
        } catch (error) {
            console.log(error)
        }
    },

    async getChatById({ commit }, roomId) {
        commit(mutationTypes.SET_LOADING, true);

        try {
            let { data } = await getRoomById(roomId);

            commit(mutationTypes.SET_CHAT, {
                messages: data.messages,
                ...data.room
            });
        } catch (error) {
            console.log(error);
        } finally {
            commit(mutationTypes.SET_LOADING, false);
        }
    },

    sendMessage({ commit }, messageData) {
        return new Promise(async (resolve, reject) => {
            try {
                let { data } = await sendMessage(messageData);
                commit(mutationTypes.ADD_MESSAGE, data.data);

                resolve(data.data);
            } catch (error) {
                reject(error);
            }
        })
    },

    'SOCKET_newMessage' ({ commit }, message) {
        commit(mutationTypes.PUSH_NEW_MESSAGE, message);
    },

    'SOCKET_userChangeStatus' ({ commit }, data) {
        commit(mutationTypes.USER_CHANGE_STATUS, data);
    },

    async markMessageAsRead({ commit }, messageId) {
        try {
            let { data } = await markMessageAsRead(messageId);

            commit(mutationTypes.MARK_MESSAGE_AS_READ, data.data);
        } catch (error) {
            console.log(error);
        }
    }
}