<template>
    <b-media class="w-100">
        <template #aside>
            <b-img
                :src="getUsersPhoto"
                width="40"
                height="40"
                :alt="filteredRoomUser.fullName"
                rounded="circle">
            </b-img>
        </template>

        <h6 class="mt-0 mb-0">
            {{ filteredRoomUser.fullName }}
            <span class="last-message__time">{{ item.lastMessage.createdAt | moment('H:mm') }}</span>
        </h6>
        <p class="mb-0" style="font-size: 12px">
            {{ item.lastMessage.body }}
            <b-badge variant="success" pill v-if="item.unreadMessages > 0" class="unread-messages-counter">
                {{ item.unreadMessages }}
            </b-badge>
        </p>
    </b-media>
</template>

<script>
import { mapState } from 'vuex'
import config from '@/config'

export default {
    props: {
        item: {
            type: Object
        }
    },
    computed: {
        ...mapState('auth', {
            currentUser: 'user'
        }),
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
</style>