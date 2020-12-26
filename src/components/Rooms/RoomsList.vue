<template>
    <b-list-group>
        <b-list-group-item
            href="#"
            v-for="room in items"
            :key="room._id"
            @click="openChat(room._id)"
            class="message-wrapper"
        >
            <rooms-list-item :item="room"></rooms-list-item>
            <b-badge variant="success" pill v-if="room.messages.filter(message => message.user.uid !== currentUser.id && !message.seenAt).length > 0">
                {{ room.messages.filter(message => message.user.uid !== currentUser.id && !message.seenAt).length }}
            </b-badge>
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
        })
    },
    methods: {
        openChat(roomId) {
            this.$store.dispatch('chat/getChatById', roomId);
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