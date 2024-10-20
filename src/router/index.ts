import LoginView from '@/views/LoginView.vue'
import MainPage from '@/views/MainPage.vue'
import AccidentRegister from '@/views/AccidentRegister.vue'
import AccidentSearch from '@/views/AccidentSearch.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
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
      path: '/editarSinistro/:id',
      name: 'accidentEdit',
      component: AccidentRegister
    },
    {
      path: '/visualizarSinistro/:id',
      name: 'visualizarSinistro',
      component: AccidentRegister
    },
    {
      path: '/buscarSinistro',
      name: 'accidentSearch',
      component: AccidentSearch
    }    
    

  ]
})

export default router
