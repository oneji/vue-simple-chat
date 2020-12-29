<template>
    <b-overlay :show="loading" rounded="sm">
        <b-card header-tag="header" style="box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2),0 2px 2px 0 rgba(0, 0, 0, .14),0 1px 5px 0 rgba(0, 0, 0, .12)">
            <template #header v-if="chat.fullName">
                <h6 class="mb-0">
                    <span class="mr-2">{{ chat.fullName }}</span>

                    <user-typing-icon v-if="typing"></user-typing-icon>
                </h6>
            </template>
            <div class="messages-box" v-if="currentChat" ref="messagesBox"> 
                <div ref="messagesInnerBox">
                    <div class="no-messages" v-if="!currentChat.messages">Выберите чат в левой колонке чтобы начать диалог</div>
                    <chat-box-item
                        v-for="message in currentChat.messages" :key="message._id"
                        :item="message"
                        :observer="observer">
                    </chat-box-item>
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
import ChatBoxItem from './ChatBoxItem'
import MessageInput from './MessageInput'
import UserTypingIcon from '../UserTypingIcon'

export default {
    components: {
        ChatBoxItem,
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
            typing: false
        }
    },
    methods: {
        sendMessage(message) {
            this.$store.dispatch('chat/sendMessage', {
                roomId: this.currentChat._id,
                body: message,
                userId: this.user.id
            })
            .then(data => {
                this.$socket.emit('sendMessage', data);
            });
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

    .messages-box .message-out {
        margin: 5px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    
    .messages-box .message-in {
        margin: 5px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
</style>