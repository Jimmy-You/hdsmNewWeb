import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/catalog',
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: () => import('../views/Catalog.vue')
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/List.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('../views/Detail.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
