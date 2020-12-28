<template>
    <b-list-group class="mb-2">
        <b-list-group-item
            href="#"
            v-for="room in items"
            :key="room._id"
            @click="openChat(room._id)"
            class="message-wrapper"
            :active="currentChat._id === room._id"
        >
            <rooms-list-item :item="room"></rooms-list-item>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
import { mapState } from 'vuex';
import RoomsListItem from './RoomsListItem'

export default {
    props: {
        items: {
            type: Array
        }
    },
    components: {
        RoomsListItem
    },
    computed: {
        ...mapState('auth', {
            currentUser: 'user'
        }),
        ...mapState('chat', ['currentChat'])
    },
    methods: {
        openChat(roomId) {
            if(this.currentChat._id !== roomId) {
                this.$store.dispatch('chat/getChatById', roomId);
            }
        }
    }
}
</script>

<style scoped>
    .message-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>