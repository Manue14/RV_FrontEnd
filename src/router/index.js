import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  /*{
    path: '/login',
    name: 'Login',
    component: () => import('../components/LoginForm.vue'),
    meta: { requiresAuth: false }
  },*/
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    next('/login')
  } else if (!to.meta.requiresAuth && auth.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router 