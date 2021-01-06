<template>
    <div class="message-input">
        <!-- <a href="#" class="files-button action-btn">
            <b-icon icon="image" color="#919191"></b-icon>
        </a> -->
        <input
            type="text"
            placeholder="Введите сообщение..."
            @keypress="onKeyPress"
            @keyup.enter="sendMessage"
            v-model="message">

        <!-- <VueRecordAudio /> -->
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState('auth', [ 'user' ]),
        ...mapState('chat', {
            room: 'currentChat'
        })
    },
    data() {
        return {
            message: '',
            typing: false,
            timeoute: undefined
        }
    },
    methods: {
        timeoutFunction() {
            this.typing = false;
            this.$socket.emit('stopTyping', {
                user: this.user,
                room: this.room._id
            });
        },
        sendMessage() {
            if(this.message === '') return;
            
            this.$emit('send', this.message)
            this.message = '';
            this.timeoutFunction();
        },
        onKeyPress(e) {
            if(this.typing === false) {
                this.typing = true;
                this.$socket.emit('typing', {
                    user: this.user,
                    room: this.room._id
                });

                this.timeout = setTimeout(this.timeoutFunction, 5000);
            } else {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(this.timeoutFunction, 5000);
            }
        }
    }
}
</script>

<style scoped>
    .message-input {
        width: 100%;
        display: flex;
        align-items: center;
        transition: .3s all ease;
        justify-content: space-between;
    }

    .message-input input {
        width: 100%;
        border: none;
        outline: none;
        padding: 10px 20px;
        border-radius: 20px;
        font-size: 14px;
    }

    .message-input .action-btn {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .3s all ease;
        border-radius: 100%;
    }

    .message-input .action-btn:hover {
        background-color: #ddd;
    }

    .vue-audio-recorder {
        width: 40px;
        height: 40px;
    }
</style>