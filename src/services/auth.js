import axios from '@/axios'
import config from '@/config'

export function login(data) {
    return axios({
        method: 'POST',
        url: 'auth/login',
        baseURL: config.apiURL,
        data
    });
}

export function fetchUser() {
    return axios({
        url: 'auth/me',
        baseURL: config.apiURL
    });
}