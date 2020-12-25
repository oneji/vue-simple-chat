<template>
    <div class="users-list">
        <users-list-item
            v-for="user in items"
            :key="user._id"
            :item="user"
            @start-chat="startChat">
        </users-list-item>
    </div>
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
    .users-list {
        padding: 10px;
    }
</style>