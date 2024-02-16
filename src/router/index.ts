import LoginView from '@/views/LoginView.vue'
import MainPage from '@/views/MainPage.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

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

export default router
