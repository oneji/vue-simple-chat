<template>
    <div id="app">
        <router-view />

        <!-- The loading overlay -->
        <the-overlay :show="contentLoading"></the-overlay>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import TheOverlay from './components/TheOverlay'

export default {
    computed: {
        ...mapState([ 'contentLoading' ]),
        ...mapGetters('chat', [ 'getUnreadMessagesCount' ])
    },
    components: {
        TheOverlay
    },
    beforeDestroy() {
        this.$store.dispatch('auth/changeStatus', 'offline');
    },
    watch: {
        getUnreadMessagesCount() {
            document.title =  `Чат (${this.getUnreadMessagesCount})`;
        }
    }
}
</script>

<style>
    body {
        background-color: #F7F8FA !important;
    }
</style>
