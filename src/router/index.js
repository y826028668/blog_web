import Vue from 'vue'
import VueRouter from 'vue-router'
import Default from '../views/index.vue'
import Home from '../components/home/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    component: Default,
    redirect: 'index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: Home
      },
      {
        path: 'skill',
        name: 'skill',
        component: () => import(/* webpackChunkName: "skill" */ '../components/skill/index.vue')
      },
      {
        path: 'skill/:id',
        name: 'skillType',
        component: () => import(/* webpackChunkName: "post" */ '../components/postPage/postPage.vue')
      },
      {
        path: 'share',
        name: 'share',
        component: () => import(/* webpackChunkName: "share" */ '../components/share/index.vue')
      },
      {
        path: 'share/:id',
        name: 'shareType',
        component: () => import(/* webpackChunkName: "post" */ '../components/postPage/postPage.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ '../components/about/index.vue')
      },
      {
        path: 'message',
        name: 'message',
        component: () => import(/* webpackChunkName: "message" */ '../components/message/index.vue')
      },
      {
        path: 'search',
        name: 'search',
        component: () => import(/* webpackChunkName: "search" */ '../components/common/search.vue')
      },
      {
        path: 'search/:text',
        name: 'searchresult',
        component: () => import(/* webpackChunkName: "search" */ '../components/searchResult/index.vue')
      },
    ]
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '../components/admin/index.vue'),
    children: [
      {
        path:'editor/:id',
        name: 'editor',
        component: () => import(/* webpackChunkName: "editor" */ '../components/admin/editor.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "admin" */ '../components/admin/login.vue')
  },
  {
    path: '*',
    name: 'notFind',
    component: () => import(/* webpackChunkName: "notFind" */ '../views/NotFind.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
