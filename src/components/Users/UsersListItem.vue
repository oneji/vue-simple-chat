<template>
    <b-button
        size="sm"
        variant="success"
        class="mr-2"
        @click="startChat">
        {{ item.fullName }}
    </b-button>
</template>

<script>
export default {
    props: {
        item: {
            type: Object
        }
    },
    methods: {
        startChat() {
            this.$emit('start-chat', this.item);
        }
    }
}
</script>

<style>

</style>