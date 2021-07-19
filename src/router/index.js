import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import About from '../views/About.vue'
import NotFound from '../views/NotFound.vue'
import History from "../views/History";
import Planning from "../views/Planning";
import NewEntry from "../views/NewEntry";
import Categories from "../views/Categories";
import Profile from "../views/Profile";

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main'},
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty'},
    component: Login
  },
  {
    path: '/registration',
    name: 'Register',
    meta: {layout: 'empty'},
    component: Register
  },
  {
    path: '/about',
    name: 'About',
    meta: {layout: 'main'},
    component: About
  },
  {
    path: '/404',
    name: '404',
    component: NotFound,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'main'},
    component: Categories
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'main'},
    component: History
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout: 'main'},
    component: Planning
  },
  {
    path: '/new-entry',
    name: 'NewEntry',
    meta: {layout: 'main'},
    component: NewEntry
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main'},
    component: Profile
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
