<template>
    <b-media>
        <template #aside>
            <b-img
                :src="getUsersPhoto"
                width="40"
                height="40"
                :alt="item.fullName"
                rounded="circle">
            </b-img>
        </template>

        <h6 class="mt-0 mb-0">{{ item.fullName }}</h6>
        <p class="mb-0" style="font-size: 12px">Онлайн</p>
    </b-media>
</template>

<script>
import config from '@/config'

export default {
    props: {
        item: {
            type: Object
        }
    },
    computed: {
        storageURL() {
            return config.storageURL;
        },
        getUsersPhoto() {
            return this.item.photo ? `${this.storageURL}/${this.item.photo}` : require('@/assets/images/no-photo.png'); 
        }
    }
}
</script>

<style>

</style>