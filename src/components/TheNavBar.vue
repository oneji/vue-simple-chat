<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#" :to="{ name: 'Home' }">Чат</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>{{ user.first_name + ' ' + user.last_name }}</template>
                <b-dropdown-item href="#" @click="logout">Выйти</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import { mapState } from 'vuex'

export default {
    computed: {
        ...mapState('auth', [ 'user' ])
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout');
        }
    }
}
</script>

<style>

</style>