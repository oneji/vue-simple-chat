<template>
    <b-media>
        <template #aside>
            <b-img
                v-if="filteredRoomUser.photo"
                :src="`${storageURL}/${filteredRoomUser.photo}`"
                width="40"
                height="40"
                :alt="filteredRoomUser.fullName"
                rounded="circle">
            </b-img>
            
            <b-img
                v-else
                blank
                blank-color="#ccc"
                width="40"
                alt="placeholder"
                rounded="circle">
            </b-img>
        </template>

        <h6 class="mt-0 mb-0">{{ filteredRoomUser.fullName }}</h6>
        <p class="mb-0" style="font-size: 12px">{{ lastMessage }}</p>
    </b-media>
</template>

<script>
import { mapState } from 'vuex'
import config from '@/config'
import _ from 'lodash'

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
        lastMessage() {
            const last = _.last(this.item.messages);

            return last ? last.body : null;
        },
        storageURL() {
            return config.storageURL;
        },
        filteredRoomUser() {
            return this.item.users.filter(user => user.uid !== this.currentUser.id)[0];
        }
    }
}
</script>

<style>

</style>