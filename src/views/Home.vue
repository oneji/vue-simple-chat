<template>
    <div class="home" v-if="!contentLoading">
        <users-list
            :items="users"
            @start-chat="startChat">
        </users-list>

        <b-row>
            <b-col md="4">
                <h5>Чаты:</h5>
                <rooms-list :items="rooms"></rooms-list>
            </b-col>

            <b-col md="8">
                <chat-box></chat-box>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from '@/axios';
import config from '../config'
import { mapState } from 'vuex';
import UsersList from '@/components/Users/UsersList';
import RoomsList from '@/components/Rooms/RoomsList'
import ChatBox from '@/components/Chat/ChatBox'

export default {
    name: 'Home',
    components: {
        UsersList,
        RoomsList,
        ChatBox
    },
    computed: {
        ...mapState('auth', [ 'user' ]),
        ...mapState([ 'contentLoading' ]),
    },
    sockets: {
        chat(data) {
            console.log('socket', data);
        }
    },
    data() {
        return {
            users: [],
            rooms: []
        }
    },
    methods: {
        startChat(userId) {
            axios.post('rooms', {
                users: [userId],
                type: 'private',
                currentUserId: this.user.id
            })
            .then(response => {
                console.log(response);
            })
            .catch(error => console.log(error))
        }
    },
    mounted() {
        axios.get('users')
            .then(({ data }) => {
                this.users = data.data;
            })
            .catch(error => console.log(error))
        
        axios.get('rooms')
            .then(({ data }) => {
                this.rooms = data.data;
                console.log('[Home.vue] rooms: ', this.rooms)
            })
            .catch(error => console.log(error))
    }
}
</script>
