import axios from 'axios'
import config from './config'
import router from './router'
import store from './store'

const instance = axios.create({
    baseURL: config.chatURL
});

const token = localStorage.getItem('e2go_token');

if (token !== undefined) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Response interceptor
instance.interceptors.response.use(function(response) {
    return response;
}, function(error) {
    if(error.response.status === 401) {
        const tokenErrorsArray = [ 'Token is expired', 'Token is invalid', 'Token not found' ];
        const errorMessage = error.response.data.message;

        if(tokenErrorsArray.includes(errorMessage)) {
            localStorage.removeItem('e2go_token');
            router.push({ name: 'Login' });
        }
    }

    return Promise.reject(error);
});

export default instance