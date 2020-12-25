import { login, fetchUser } from '@/services/auth'
import * as mutationTypes from './mutation-types'

export default {
    async fetchUser({ commit }) {
        try {
            commit('setContentLoading', true, { root: true });
            let { data } = await fetchUser();

            commit(mutationTypes.SET_USER, data.data);
        } catch (error) {
            console.log('err', error);
        } finally {
            commit('setContentLoading', false, { root: true });
        }
    },

    async login({ commit }, credentials) {
        try {
            commit(mutationTypes.SET_AUTH_LOADING, true);
            let { data } = await login(credentials);

            commit(mutationTypes.AUTH_SUCCESS, data);
        } catch (err) {
            let { data } = err.response;
            commit(mutationTypes.AUTH_FAILED, data.message);
        } finally {
            commit(mutationTypes.SET_AUTH_LOADING, false);
        }
    },

    logout({ commit }) {
        commit(mutationTypes.LOGOUT);
    }
}