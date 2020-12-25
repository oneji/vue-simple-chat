import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('e2go_token');
    const currentUser = store.state.auth.user;

    if (isAuthenticated) {
        if(!currentUser) {
            store.dispatch('auth/fetchUser').then(() => {
                next();
            });
        } else {
            next();
        }

        if(to.name === 'Login') {
            next(from.path)
        }
    } else { // If the user is not authenticated push him to the Login screen
        if(to.meta.requiresAuth) {
            next({ name: 'Login' })
        } 
        
        next();
    }
})

export default router
