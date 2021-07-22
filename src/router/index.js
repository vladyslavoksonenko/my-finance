import { createRouter, createWebHistory } from 'vue-router'
import firebase from "firebase";
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
    meta: {layout: 'main', auth: true},
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
    meta: {layout: 'main', auth: true},
    component: About
  },
  {
    path: '/404',
    name: '404',
    meta: {layout: "main", auth: true},
    component: NotFound,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'main', auth: true},
    component: Categories
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'main', auth: true},
    component: History
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout: 'main', auth: true},
    component: Planning
  },
  {
    path: '/new-entry',
    name: 'NewEntry',
    meta: {layout: 'main', auth: true},
    component: NewEntry
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main', auth: true},
    component: Profile
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})


// router.beforeEach(async (to, from, next) => {
//   const isAuth = await getUserState()
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
// })

export default router
