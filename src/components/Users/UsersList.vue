<template>
    <b-list-group>
        <b-list-group-item
            href="#"
            v-for="user in items"
            :key="user._id"
            @click="startChat(user._id)"
        >
            <users-list-item
                :item="user">
            </users-list-item>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
import UsersListItem from './UsersListItem';

export default {
    props: {
        items: {
            type: Array,
            default: () => []
        }
    },
    components: {
        UsersListItem
    },
    methods: {
        startChat(userId) {
            this.$emit('start-chat', userId);
        }
    }
}
</script>

<style scoped>

</style>