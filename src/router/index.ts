import LoginView from '@/views/LoginView.vue'
import MainPage from '@/views/MainPage.vue'
import CustomerRegister from '@/views/CustomerRegister.vue'
import AccidentRegister from '@/views/AccidentRegister.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    {
      path: '/cadastrarCliente',
      name: 'customerRegister',
      component: CustomerRegister
    },
    {
      path: '/registrarSinistro',
      name: 'accidentRegister',
      component: AccidentRegister
    }
  ]
})

export default router
