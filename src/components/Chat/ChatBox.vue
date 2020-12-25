<template>
    <b-overlay :show="loading" rounded="sm">
        <b-card :header="chat.fullName">
            <div class="messages-box" v-if="chat"> 
                <ul class="mb-0">
                    <li
                        :class="{
                            'message-in': message.user.uid !== user.id,
                            'message-out': message.user.uid === user.id 
                        }"
                        v-for="message in currentChat.messages" :key="message._id">
                        <span class="message-body">{{ message.body }}</span>
                        <br>
                        <span class="message-time">20:00</span>    
                    </li>
                </ul>
            </div>
            <div class="no-messages" v-else>Сообщений пока нет...</div>
        </b-card>

        <b-input-group class="mt-3">
            <b-form-input
                @keyup.enter="sendMessage"
                v-model="message">
            </b-form-input>

            <b-input-group-append>
                <b-button variant="info" @click="sendMessage">Отправить</b-button>
            </b-input-group-append>
        </b-input-group>
    </b-overlay>
</template>

<script>
import { mapState } from 'vuex'

export default {
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
    data() {
        return {
            message: ''
        }
    },
    methods: {
        sendMessage() {
            console.log({
                roomId: this.currentChat._id,
                body: this.message,
                userId: this.user.id
            })

            this.$store.dispatch('chat/sendMessage', {
                roomId: this.currentChat._id,
                body: this.message,
                userId: this.user.id
            });
        }
    }
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
</style>