<template>
    <b-input-group class="mt-3">
        <b-form-input
            @keyup.enter="sendMessage"
            v-model="message">
        </b-form-input>

        <b-input-group-append>
            <b-button variant="info" @click="sendMessage">Отправить</b-button>
        </b-input-group-append>
    </b-input-group>
</template>

<script>
export default {
    data() {
        return {
            message: ''
        }
    },
    methods: {
        sendMessage() {
            this.$emit('send', this.message)
            this.message = '';
        }
    }
}
</script>

<style>

</style>