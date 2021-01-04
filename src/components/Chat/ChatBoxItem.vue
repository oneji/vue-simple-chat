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

            <hr class="order-separator" v-if="item.orderId">
            <div class="order-wrapper">
                <div class="order__loading">
                    <b-spinner small v-if="orderLoading"></b-spinner>
                </div>

                <div class="order-details" v-if="order">
                    <div class="from">
                        <p class="mb-0">{{ order.date }}</p>
                        <p class="mb-0">{{ order.country_from.name.ru + ', ' + order.from_address }}</p>
                    </div>
                    <div class="order-details__separator">----------------</div>
                    <div class="to">
                        <p class="mb-0">{{ order.date }}</p>
                        <p class="mb-0">{{ order.country_to.name.ru + ', ' + order.to_address }}</p>
                    </div>
                </div>
            </div>
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
    data() {
        return {
            orderLoading: false,
            order: null
        }
    },
    mounted() {
        this.observer.observe(this.$el);

        if(this.item.orderId) {
            this.orderLoading = true;
            this.$store.dispatch('chat/getOrderById', this.item.orderId)
                .then(response => {
                    this.order = response.data;
                    this.orderLoading = false;
                });
        }
    },
}
</script>

<style scoped>
    .message-out {
        margin: 5px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    
    .message-in {
        margin: 5px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    
    .message-out .message-body {
        padding: 10px 15px;
        background-color: #48b0f7;
        color: #fff;
        border-radius: 5px;
        font-size: 13px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    }

    .message-out .message-time {
        color: #9e9e9e;
        font-size: 10px;
    }

    .message-in .message-body {
        padding: 10px 15px;
        background-color: #F3F6F8;
        color: #000;
        border-radius: 5px;
        font-size: 13px;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
        position: relative;
    }

    .message-in .message-time {
        color: #9e9e9e;
        font-size: 10px;
    }

    .order-separator {
        margin: 10px 0;
    }

    .order-details {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .order-details .from, .order-details .to {
        margin: 10px;
    }

    .order__loading {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>