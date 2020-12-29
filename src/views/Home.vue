<template>
    <div class="home" v-if="!contentLoading">

        <b-modal id="startChatModal" title="Выберите контакт" hide-footer>
            <users-list
                :items="users"
                @start-chat="startChat">
            </users-list>
        </b-modal>

        <b-row>
            <b-col md="4">
                <b-button
                    class="mb-2"
                    block
                    variant="success"
                    size="sm"
                    v-b-modal.startChatModal>
                    Начать чат
                </b-button>
                <h5>Чаты:</h5>
                
                <rooms-list
                    :items="rooms"
                    v-if="rooms.length > 0">
                </rooms-list>

                <rooms-list-skeleton :loading="roomsLoading"></rooms-list-skeleton>
            </b-col>

            <b-col md="8">
                <chat-box></chat-box>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from '@/axios';
import config from '../config';
import { mapState } from 'vuex';
import UsersList from '@/components/Users/UsersList';
import RoomsList from '@/components/Rooms/RoomsList';
import ChatBox from '@/components/Chat/ChatBox';
import RoomsListSkeleton from '@/components/Rooms/RoomsListSkeleton';

export default {
    name: 'Home',
    components: {
        UsersList,
        RoomsList,
        RoomsListSkeleton,
        ChatBox
    },
    computed: {
        ...mapState('auth', [ 'user' ]),
        ...mapState([ 'contentLoading' ]),
        ...mapState('chat', [ 'rooms' ])
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
            });
        }
    },
    mounted() {
        axios.get('users')
            .then(({ data }) => {
                this.users = data.data.filter(user => user.uid !== this.user.id);
            })
            .catch(error => console.log(error))

        this.$store.dispatch('chat/getRooms')
            .then(() => {
                this.roomsLoading = false;
                this.$socket.emit('joinRoom', {
                    rooms: this.rooms.map(room => room._id)
                });
            });
    }
}
</script>
