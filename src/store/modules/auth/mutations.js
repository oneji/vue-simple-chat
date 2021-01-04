import * as mutationTypes from './mutation-types'
import axios from '@/axios'
import router from '@/router/index'

export default {
    [mutationTypes.SET_AUTH_LOADING] (state, flag) {
        state.loading = flag;
    },

    [mutationTypes.AUTH_SUCCESS] (state, userData) {
        state.isAuthenticated = true;
        state.user = userData.user;
        // Delete all errors
        state.error = false;
        state.errorMessage = '';
        // Set token to a local storage
        localStorage.setItem('e2go_token', userData.token);
        // Set axios `Authorization` header
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;

        router.push({ name: 'Home' })
    },

    [mutationTypes.AUTH_FAILED] (state, message) {
        state.errorMessage = message;
        state.error = true;
    },

    [mutationTypes.SET_USER] (state, user) {
        state.user = user;
    },

    [mutationTypes.LOGOUT] (state) {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem('e2go_token');

        router.push({ name: 'Login' });
    }
}