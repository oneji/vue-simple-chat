import * as mutationTypes from './mutation-types'
import socket from '@/config/socket'

export default {
    [mutationTypes.SET_LOADING] (state, flag) {
        state.loading = flag;
    },

    [mutationTypes.SET_CHAT] (state, chat) {
        state.currentChat = chat;
    },

    [mutationTypes.ADD_MESSAGE] (state, message) {
        state.currentChat.messages.push(message);

        state.rooms.map(room => {
            if(room._id === message.room) {
                room.messages.push(message);
                room.lastMessage = message;
            }
        })
    },

    [mutationTypes.SET_ROOMS] (state, rooms) {
        state.rooms = rooms;
    },

    [mutationTypes.PUSH_NEW_MESSAGE] (state, message) {
        state.rooms.map(room => {
            if(room._id === message.room) {
                room.messages.push(message);
                room.lastMessage = message;
                room.unreadMessages++;
            }
        })

        if(message.room === state.currentChat._id) {
            state.currentChat.messages.push(message);
        }
    },

    [mutationTypes.PUSH_ROOM] (state, room) {
        let exists = false;
        state.rooms.map(stateRoom => {
            if(stateRoom._id === room._id) {
                exists = true;
            }
        });
        
        if(!exists) {
            state.rooms.push(room)
            socket.emit('joinRoom', {
                rooms: [room._id]
            });
        };
    },

    [mutationTypes.MARK_MESSAGE_AS_READ] (state, message) {
        state.rooms.map(room => {
            room.messages.map(m => {
                if(m._id === message._id) {
                    m.seenAt = message.seenAt;
                    room.unreadMessages--;
                }
            })
        });
    },

    [mutationTypes.USER_CHANGE_STATUS] (state, data) {
        const { userId, status } = data;
        state.rooms.map(room => {
            room.users.map(user => {
                if(user._id === userId) {
                    user.status = status;
                }
            });
        })
    }
}