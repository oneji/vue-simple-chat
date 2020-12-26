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
    },

    [mutationTypes.SET_ROOMS] (state, rooms) {
        state.rooms = rooms;
    },

    [mutationTypes.PUSH_NEW_MESSAGE] (state, message) {
        state.rooms.map(room => {
            if(room._id === message.room) {
                room.messages.push(message);
            }
        })

        if(message.room === state.currentChat._id) {
            state.currentChat.messages.push(message);
        }
    },

    [mutationTypes.PUSH_ROOM] (state, room) {
        state.rooms.push(room);
    },

    [mutationTypes.MARK_MESSAGE_AS_READ] (state, message) {
        state.rooms.map(room => {
            room.messages.map(m => {
                if(m._id === message._id) m.seenAt = message.seenAt;
            })
        });
    }
}