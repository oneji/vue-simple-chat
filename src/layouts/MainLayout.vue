<template>
    <div>
        <the-nav-bar></the-nav-bar>
        
        <b-container class="pt-4">
            <router-view />
        </b-container>
    </div>
</template>

<script>
import TheNavBar from '../components/TheNavBar'

export default {
    components: {
        TheNavBar
    }
}
</script>

<style>

</style>