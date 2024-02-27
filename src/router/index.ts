import LoginView from '@/views/LoginView.vue'
import MainPage from '@/views/MainPage.vue'
import CustomerRegister from '@/views/CustomerRegister.vue'
import CustomerSearch from '@/views/CustomerSearch.vue'
import AccidentRegister from '@/views/AccidentRegister.vue'
import AccidentSearch from '@/views/AccidentSearch.vue'
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
    {
      path: '/registrarSinistro',
      name: 'accidentRegister',
      component: AccidentRegister
    },
    {
      path: '/buscarSinistro',
      name: 'accidentSearch',
      component: AccidentSearch
    },
    {
      path: '/cadastrarCliente',
      name: 'customerRegister',
      component: CustomerRegister
    },    
    {
      path: '/buscarCliente',
      name: 'customerSearch',
      component: CustomerSearch
    },
    

  ]
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'login' && !isAuth()) next({ name: 'login' })
  else next()
})

export default router
