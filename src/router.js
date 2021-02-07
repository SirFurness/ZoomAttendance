import Vue from 'vue'
import VueRouter from 'vue-router'
import ClassesPage from './views/ClassesPage.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Classes',
        component: ClassesPage
    },
    {
        path: '/add',
        name: "Add",
        component: () => import('./views/AddPage.vue'),
        props: true
    },
    {
        path: '/class/:id',
        name: "Class",
        component: () => import('./views/ClassPage.vue'),
        props: true
    },
    /*{
        path: '*',
        component: ClassesPage
    }*/
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;