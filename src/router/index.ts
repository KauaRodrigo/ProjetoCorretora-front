import LoginView from '@/views/LoginView.vue'
import MainPage from '@/views/MainPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const isAuth = () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')
  if(token && user) {
    return true
  }
  return false
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/main',
      name: 'main',
      component: MainPage
    },
  ]
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'login' && !isAuth()) next({ name: 'login' })
  else next()
})

export default router
