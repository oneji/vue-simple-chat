<template>
    <b-overlay :show="loading" rounded="sm">
        <b-card header-tag="header" style="box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2),0 2px 2px 0 rgba(0, 0, 0, .14),0 1px 5px 0 rgba(0, 0, 0, .12)">
            <template #header v-if="chat.fullName">
                <b-media class="w-100">
                    <template #aside>
                        <div class="user-avatar-wrapper">
                            <b-img
                                :src="getUsersPhoto"
                                width="40"
                                height="40"
                                alt="Фото"
                                rounded="circle">
                            </b-img>
                        </div>
                    </template>

                    <h6 class="mt-0 mb-0">
                        {{ chat.fullName }}
                    </h6>
                    <p class="mb-0" style="font-size: 12px; color: #9B9CA3">
                        <user-typing-icon
                            :size="8"
                            v-if="typing">
                        </user-typing-icon>
                        <span v-else>{{ userStatus }}</span>
                    </p>
                </b-media>
            </template>
            <div class="messages-box" v-if="currentChat" ref="messagesBox">
                <div ref="messagesInnerBox">
                    <div class="no-messages" v-if="!currentChat.messages">Выберите чат в левой колонке чтобы начать диалог</div>
                    <chat-box-date-item
                        v-for="message in currentChat.messages" :key="message.date"
                        :item="message"
                        :observer="observer">
                    </chat-box-date-item>
                </div>
            </div>
        </b-card>

        <message-input
            v-if="currentChat._id"
            @send="sendMessage">
        </message-input>
    </b-overlay>
</template>

<script>
import { mapState } from 'vuex'
import ChatBoxDateItem from './ChatBoxDateItem'
import MessageInput from './MessageInput'
import UserTypingIcon from '../UserTypingIcon'
import config from '@/config'

export default {
    components: {
        ChatBoxDateItem,
        MessageInput,
        UserTypingIcon
    },
    computed: {
        ...mapState('chat', [ 'currentChat', 'loading' ]),
        ...mapState('auth', [ 'user' ]),
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
        },
        storageURL() {
            return config.storageURL;
        },
        getUsersPhoto() {
            return this.chat.photo ? `${this.storageURL}/${this.chat.photo}` : require('@/assets/images/no-photo.png'); 
        }
    },
    sockets: {
        userTyping(data) {
            if(this.currentChat._id === data.room) {
                this.typing = true;
            }
        },
        stoppedTyping(data) {
            this.typing = false;
        }
    },
    data() {
        return {
            observer: null,
            typing: false,
            currentDate: null
        }
    },
    methods: {
        sendMessage(message) {
            this.$store.dispatch('chat/sendMessage', {
                roomId: this.currentChat._id,
                body: message,
                userId: this.user.id
            })
            .then(message => {
                console.log(message)
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

                this.currentDate = date;

                if(type === 'in' && !seen) {
                    this.$store.dispatch('chat/markMessageAsRead', id);
                }

            });
        }
    },
    updated() {
        console.log('object')
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
    beforeDestroy() {
        this.observer.disconnect();
    },
}
</script>

<style scoped>
    .messages-box, .no-messages {
        height: 500px;
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
    }
</style>