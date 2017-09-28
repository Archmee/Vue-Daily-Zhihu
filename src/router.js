import Vue from 'vue'
import VueRouter from 'vue-router'

import home from './components/page/home.vue'
import todo from './components/page/todo.vue'
import favo from './components/page/favo.vue'
import theme from './components/page/theme.vue'
import article from './components/page/article.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: home,
        },
        {
            path: '/todo',
            component: todo,
        },
        {
            path: '/myfavo',
            component: favo,
        },
        {
            path: '/theme/:id',
            component: theme
        },
        {
            path: '/article/:id',
            component: article,
        },
        { //任何其他除了上面以外的路由都跳转到根路由
            path: '/*',
            redirect: '/',
        },
    ],
    'linkActiveClass': 'active',
});

export default router;