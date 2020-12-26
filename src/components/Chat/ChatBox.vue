<template>
    <b-overlay :show="loading" rounded="sm">
        <b-card header-tag="header">
            <template #header>
                <h6 class="mb-0">
                    {{ chat.fullName }}

                    <div class="container-dot" v-if="typing">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                </h6>
            </template>
            <div class="messages-box" v-if="chat" ref="messagesBox"> 
                <ul class="mb-0" ref="messagesInnerBox">
                    <chat-box-item
                        v-for="message in currentChat.messages" :key="message._id"
                        :item="message"
                        :observer="observer">
                    </chat-box-item>
                </ul>
            </div>
            <div class="no-messages" v-else>Сообщений пока нет...</div>
        </b-card>

        <message-input
            @send="sendMessage">
        </message-input>
    </b-overlay>
</template>

<script>
import { mapState } from 'vuex'
import ChatBoxItem from './ChatBoxItem'
import MessageInput from './MessageInput'

export default {
    components: {
        ChatBoxItem,
        MessageInput
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
            this.typing = true;
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
                
                const i = target.getAttribute('data-id');
                console.log(i)
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

    .messages-box ul {
        padding: 0 20px;
        list-style-type: none;
    }

    .messages-box .message-out {
        text-align: right;
        margin: 10px 0;
    }

    .messages-box .message-out .message-body {
        padding: 5px 10px;
        background-color: #48b0f7;
        color: #fff;
        border-radius: 5px;
    }

    .messages-box .message-out .message-time {
        margin-bottom: 10px;
        color: #b7b3b3;
        font-size: 12px;
    }
    
    .messages-box .message-in {
        margin: 10px 0;
    }

    .messages-box .message-in .message-body {
        padding: 5px 10px;
        background-color: rgba(85,110,230,.1);
        color: #000;
        border-radius: 5px;
    }

    .messages-box .message-in .message-time {
        margin-bottom: 10px;
        color: #b7b3b3;
        font-size: 12px;
    }

    .container-dot {
        margin: 0 5px;
        display: inline-block;
    }

    .dot {
        height: 10px;
        width: 10px;
        border-radius: 100%;
        display: inline-block;
        background-color: #B4B5B9;
        animation: 1.2s typing-dot ease-in-out infinite;
        margin-right: 5px;
    }

    .dot:nth-of-type(2) {
        animation-delay: 0.15s;
    }

    .dot:nth-of-type(3) {
        animation-delay: 0.25s;
    }

    @keyframes typing-dot {
        15% {
            transform: translateY(-35%);
            opacity: 0.5;
        }
        30% {
            transform: translateY(0%);
            opacity: 1;
        }
    }
</style>