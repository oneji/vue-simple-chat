<template>
    <div>
        <the-nav-bar></the-nav-bar>
        
        <b-container>
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