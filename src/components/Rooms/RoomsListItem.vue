<template>
    <b-media class="w-100">
        <template #aside>
            <div class="user-avatar-wrapper">
                <b-img
                    :src="getUsersPhoto"
                    width="40"
                    height="40"
                    :alt="filteredRoomUser.fullName"
                    rounded="circle">
                </b-img>

                <div class="status" v-if="filteredRoomUser.status === 'online'"></div>
            </div>
        </template>

        <h6 class="mt-0 mb-0">
            {{ filteredRoomUser.fullName }}
            <span class="last-message__time">{{ item.lastMessage.createdAt | moment('H:mm') }}</span>
        </h6>
        <p class="mb-0" style="font-size: 12px">
            <user-typing-icon
                :size="8"
                v-if="this.item._id === typing">
            </user-typing-icon>
            <span v-else>{{ item.lastMessage.body }}</span>

            <b-badge variant="success" pill v-if="item.unreadMessages > 0" class="unread-messages-counter">
                {{ item.unreadMessages }}
            </b-badge>
        </p>
    </b-media>
</template>

<script>
import { mapState } from 'vuex'
import config from '@/config'
import UserTypingIcon from '../UserTypingIcon'

export default {
    props: {
        item: {
            type: Object,
        }
    },
    components: {
        UserTypingIcon
    },
    computed: {
        ...mapState('auth', {
            currentUser: 'user'
        }),
        ...mapState('chat', [ 'typing' ]),
        storageURL() {
            return config.storageURL;
        },
        filteredRoomUser() {
            return this.item.users.filter(user => user.uid !== this.currentUser.id)[0];
        },
        getUsersPhoto() {
            return this.filteredRoomUser.photo ? `${this.storageURL}/${this.filteredRoomUser.photo}` : require('@/assets/images/no-photo.png'); 
        }
    }
}
</script>

<style scoped>
    .last-message__time, .unread-messages-counter {
        float: right;
        font-size: 12px;
    }

    .user-avatar-wrapper {
        position: relative;
    }

    .status {
        width: 8px;
        height: 8px;
        position: absolute;
        top: 0;
        right: 0;
        background-color: #28a745;
        border-radius: 50%;
    }
</style>