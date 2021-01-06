<template>
    <div style="position: relative;">
        <div class="date-wrapper">
            <b-badge class="date mb-3">{{ item.date | moment('LL') }}</b-badge>
        </div>

        <chat-box-item
            v-for="message in item.items"
            :key="message._id"
            :item="message"
            :observer="observer">
        </chat-box-item>
    </div>
</template>

<script>
import ChatBoxItem from './ChatBoxItem'

export default {
    props: {
        item: {
            type: Object
        },
        observer: IntersectionObserver
    },
    components: {
        ChatBoxItem
    }
}
</script>

<style scoped>
    .date-wrapper {
        position: sticky;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99;
    }

    .date {
        box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
        margin-top: 10px;
    }
</style>