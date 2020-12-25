<template>
    <b-list-group>
        <b-list-group-item
            href="#"
            v-for="room in items"
            :key="room._id"
            @click="openChat(room._id)"
        >
            <rooms-list-item :item="room"></rooms-list-item>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
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
    methods: {
        openChat(roomId) {
            this.$store.dispatch('chat/getChatById', roomId);
        }
    }
}
</script>

<style>

</style>