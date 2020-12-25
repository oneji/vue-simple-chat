<template>
    <div id="app">
        <router-view />

        <!-- The loading overlay -->
        <the-overlay :show="contentLoading"></the-overlay>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import TheOverlay from './components/TheOverlay'

export default {
    computed: {
        ...mapState([ 'contentLoading' ])
    },
    components: {
        TheOverlay
    }    
}
</script>

<style>

</style>
