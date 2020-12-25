<template>
    <div class="home">
        <users-list
            :items="users"
            @start-chat="startChat">
        </users-list>
    </div>
</template>

<script>
import axios from '@/axios';
import { mapState } from 'vuex';
import UsersList from '../components/Users/UsersList';
import config from '../config'

export default {
    name: 'Home',
    components: {
        UsersList
    },
    computed: {
        ...mapState('auth', [ 'user' ]),
        ...mapState([ 'contentLoading' ])
    },
    sockets: {
        chat(data) {
            console.log('socket', data);
        }
    },
    data() {
        return {
            users: []
        }
    },
    methods: {
        startChat(user) {
            console.log(user);
        }
    },
    mounted() {
        axios({
            url: 'users',
            baseURL: config.chatURL
        })
        .then(({ data }) => {
            this.users = data.data;
        })
        .catch(error => console.log(error))
    }
}
</script>
