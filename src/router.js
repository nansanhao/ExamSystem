import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from './views/Home.vue'
import User from './views/User.vue'
import Paper from './views/Paper.vue'


export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/user',
            name: 'user',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: User
        },
        {
            path: '/paper',
            name: 'paper',
            component: Paper
        },
    ]
})
