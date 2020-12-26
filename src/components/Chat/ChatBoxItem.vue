<template>
    <li
        :data-id="item._id"
        :data-type="item.user.uid !== user.id ? 'in' : 'out'"
        :class="{
            'message-in': item.user.uid !== user.id,
            'message-out': item.user.uid === user.id 
        }">
        <span class="message-body">{{ item.body }}</span>
        <br>
        <span class="message-time">20:00</span>    
    </li>
</template>

<script>
import { mapState } from 'vuex'
export default {
    props: {
        item: {
            type: Object
        },
        observer: IntersectionObserver
    },
    computed: {
        ...mapState('auth', [ 'user' ]),
    },
    mounted() {
        this.observer.observe(this.$el);
    }
}
</script>

<style scoped>
    .message-out .message-body {
        padding: 5px 10px;
        background-color: #48b0f7;
        color: #fff;
        border-radius: 5px;
    }

    .message-out .message-time {
        margin-bottom: 10px;
        color: #b7b3b3;
        font-size: 12px;
    }

    .message-in .message-body {
        padding: 5px 10px;
        background-color: rgba(85,110,230,.1);
        color: #000;
        border-radius: 5px;
    }

    .message-in .message-time {
        margin-bottom: 10px;
        color: #b7b3b3;
        font-size: 12px;
    }
</style>