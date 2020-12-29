<template>
    <div
        :data-id="item._id"
        :data-type="item.user.uid !== user.id ? 'in' : 'out'"
        :data-seen="item.seenAt ? true : false"
        :class="{
            'message-in': item.user.uid !== user.id,
            'message-out': item.user.uid === user.id 
        }">
        <span class="message-body">
            {{ item.body }}
        </span>
        <span class="message-time">{{ item.createdAt | moment('H:mm') }}</span>
    </div>
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
        font-size: 13px;
    }

    .message-out .message-time {
        color: #9e9e9e;
        font-size: 10px;
    }

    .message-in .message-body {
        padding: 5px 10px;
        background-color: rgba(85,110,230,.1);
        color: #000;
        border-radius: 5px;
        font-size: 13px;
    }

    .message-in .message-time {
        color: #9e9e9e;
        font-size: 10px;
    }
</style>