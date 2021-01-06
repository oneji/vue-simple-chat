<template>
    <div class="home" v-if="!contentLoading">
        <div class="home__podlojka"></div>

        <chat-box></chat-box>

        <b-modal id="startChatModal" title="Выберите контакт" hide-footer>
            <users-list
                :items="users"
                @start-chat="startChat">
            </users-list>
        </b-modal>
    </div>
</template>

<script>
import axios from '@/axios';
import config from '../config';
import { mapState } from 'vuex';
import UsersList from '@/components/Users/UsersList';
import ChatBox from '@/components/Chat/ChatBox';

export default {
    name: 'Home',
    components: {
        UsersList,
        ChatBox
    },
    computed: {
        ...mapState('auth', [ 'user' ]),
        ...mapState([ 'contentLoading' ])
    },
    data() {
        return {
            users: [],
            roomsLoading: true
        }
    },
    methods: {
        startChat(userId) {
            this.$store.dispatch('chat/startChat', {
                user: userId,
                type: 'private',
                currentUserId: this.user.id
            }).then((room) => {
                this.$socket.emit('joinRoom', {
                    rooms: [room._id]
                });
            });
        }
    },
    mounted() {
        axios.get('users')
            .then(({ data }) => {
                this.users = data.data.filter(user => user.uid !== this.user.id);
            })
            .catch(error => console.log(error))
    }
}
</script>

<style scoped>
    .home {
        height: 100vh;
        padding: 50px;
        width: 80%;
        display: block;
        margin: 0 auto;
    }
    
    .home__podlojka {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 150px;
        background-color: #009688;
    }
</style>
