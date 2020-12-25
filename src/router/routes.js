import MainLayout from '@/layouts/MainLayout'
import Login from '@/views/Login'
import Home from '@/views/Home'

const routes = [
    { path: '/login', name: 'Login', component: Login },
    { 
        path: '/', component: MainLayout, meta: { requiresAuth: true },
        children: [
            { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } }
        ]
    },
]

export default routes;