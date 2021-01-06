<template>
    <div style="height: 100%; background-color: #e5ddd5;">
        <div 
            :style="`
                height: 100%; 
                display: flex; 
                box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2),0 2px 2px 0 rgba(0, 0, 0, .14),0 1px 5px 0 rgba(0, 0, 0, .12); 
                background-image: url(${require('@/assets/images/chat-bg.png')});
                background-size: contain;
                background-position: center;
            `">
            <b-card class="rooms-card" style="border-right: 0; height: 100%; border-radius: 0; min-width: 400px">
                <template #header>
                    <div class="header">
                        <div class="username">
                            <h6 class="mt-0 mb-0">{{ user.first_name + ' ' + user.last_name }}</h6>
                            <p class="mb-0" style="font-size: 12px; color: #9B9CA3">Онлайн</p>
                        </div>

                        <b-button
                            size="sm"
                            v-b-modal.startChatModal
                            style="border-radius: 100%; width: 35px; height: 35px;"
                        >
                            <b-icon icon="chat-left-text"></b-icon>
                        </b-button>
                    </div>
                </template>

                <rooms-list
                    :items="rooms"
                    v-if="rooms.length > 0">
                </rooms-list>

                <rooms-list-skeleton :loading="roomsLoading"></rooms-list-skeleton>
            </b-card>
            
            <b-overlay :show="loading" rounded="sm" style="flex-grow: 1">
                <b-card header-tag="header" class="chat-card">
                    <template #header v-if="chat.fullName">
                        <h6 class="mt-0 mb-0">{{ chat.fullName }}</h6>
                        <p class="mb-0" style="font-size: 12px; color: #9B9CA3">
                            <user-typing-icon
                                :size="8"
                                v-if="currentChat._id === typing">
                            </user-typing-icon>
                            <span v-else>{{ userStatus }}</span>
                        </p>
                    </template>
                    
                    <div class="messages-box" v-if="currentChat" ref="messagesBox">
                        <div class="no-messages" v-if="!currentChat.messages">Выберите чат в левой колонке чтобы начать диалог</div>
                        <div ref="messagesInnerBox">
                            <chat-box-date-item
                                v-for="message in currentChat.messages" :key="message.date"
                                :item="message"
                                :observer="observer">
                            </chat-box-date-item>
                        </div>
                    </div>
                    
                    <template #footer v-if="chat.fullName">
                        <message-input
                            v-if="currentChat._id"
                            @send="sendMessage">
                        </message-input>
                    </template>
                </b-card>
            </b-overlay>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import ChatBoxDateItem from './ChatBoxDateItem'
import MessageInput from './MessageInput'
import UserTypingIcon from '../UserTypingIcon'
import config from '@/config'
import RoomsList from '@/components/Rooms/RoomsList';
import RoomsListSkeleton from '@/components/Rooms/RoomsListSkeleton';

export default {
    components: {
        ChatBoxDateItem,
        MessageInput,
        UserTypingIcon,
        RoomsList,
        RoomsListSkeleton,
    },
    computed: {
        ...mapState('chat', [ 'currentChat', 'loading' ]),
        ...mapState('auth', [ 'user' ]),
        ...mapState('chat', [ 'rooms', 'typing' ]),
        chat() {
            if(this.currentChat.users) {
                return this.currentChat.users.filter(user => user.uid !== this.user.id)[0];
            }

            return {
                fullName: ''
            }
        },
        userStatus() {
            if(this.chat.status === 'online') {
                return 'Онлайн'
            }

            return 'был(а) в сети ' + this.$moment(this.chat.lastSeenAt).from();
        }
    },
    data() {
        return {
            observer: null,
            roomsLoading: true
        }
    },
    methods: {
        sendMessage(message) {
            this.$store.dispatch('chat/sendMessage', {
                roomId: this.currentChat._id,
                body: message,
                userId: this.user.id,
                orderId: null
            })
            .then(message => {
                this.$socket.emit('sendMessage', message);
                this.scrollToBottom();
            })
        },
        scrollToBottom() {
            const messagesBox = this.$refs.messagesBox;
            messagesBox.scrollTop = messagesBox.scrollHeight;
        },
        onElementObserved(entries) {
            entries.forEach(({ target, isIntersecting}) => {
                if (!isIntersecting) {
                    return;
                }
                
                this.observer.unobserve(target);
                
                const id = target.getAttribute('data-id');
                const type = target.getAttribute('data-type');
                const seen = Boolean(target.getAttribute('data-seen'));
                const date = target.getAttribute('data-date');

                if(type === 'in' && !seen) {
                    this.$store.dispatch('chat/markMessageAsRead', id);
                }

            });
        }
    },
    updated() {
        this.scrollToBottom();
    },
    created() {
        this.observer = new IntersectionObserver(
            this.onElementObserved, 
            {
                root: this.$refs.messagesInnerBox,
                threshold: 1.0,
            }
        );
    },
    mounted() {
        this.$store.dispatch('chat/getRooms')
            .then(() => {
                this.roomsLoading = false;
                this.$socket.emit('joinRoom', {
                    rooms: this.rooms.map(room => room._id)
                });
            });
    },
    beforeDestroy() {
        this.observer.disconnect();
    },
}
</script>

<style scoped>
    .messages-box, .no-messages {
        height: 100%;
        overflow-y: auto;
    }

    .no-messages {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .messages-box > div {
        padding: 0 20px;
        list-style-type: none;
        background-size: contain;
        background-position: center;
        /* opacity: 0.06; */
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .chat-card {
        height: 100%;
        border-radius: 0;
    }
    
    .chat-card > .card-body {
        padding: 0;
        background-color: #EBEBEB;
    }
    
    .rooms-card > .card-body {
        padding: 0;
    }
</style>