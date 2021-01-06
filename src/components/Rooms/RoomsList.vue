<template>
    <ul class="rooms-list">
        <li
            v-for="room in items"
            :key="room._id"
            @click="openChat(room._id)"
            :class="{ 'messge-wrapper active': currentChat._id === room._id, 'message-wrapper': currentChat._id !== room._id }"
        >
            <rooms-list-item :item="room"></rooms-list-item>
        </li>
    </ul>
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

    .rooms-list {
        padding: 0;
        list-style-type: none;
    }

    .rooms-list li {
        padding: 15px 20px;
        transition: .3s all ease;
        border-bottom: 1px solid #EBEBEB;
    }

    .rooms-list li.active {
        background-color: #EBEBEB;
    }
    
    .rooms-list li.active:hover {
        background-color: #EBEBEB;
    }
    
    .rooms-list li:hover {
        background-color: #F5F5F5;
        cursor: pointer;
    }
</style>