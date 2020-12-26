<template>
    <b-input-group class="mt-3">
        <b-form-input
            @keypress="onKeyPress"
            @keyup.enter="sendMessage"
            v-model="message">
        </b-form-input>

        <b-input-group-append>
            <b-button variant="info" @click="sendMessage">Отправить</b-button>
        </b-input-group-append>
    </b-input-group>
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

<style>

</style>