import LoginView from '@/views/LoginView.vue'
import MainPage from '@/views/MainPage.vue'
import AccidentRegister from '@/views/AccidentRegister.vue'
import AccidentSearch from '@/views/AccidentSearch.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PasswordReset from '@/views/PasswordReset.vue'
import CadastrarClientes from '@/views/clientes/CadastrarClientes.vue'
import CadastrarSeguradora from '../views/seguradoras/CadastrarSeguradora.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/recuperarsenha/:token?',
      name: 'passwordReset',
      component: PasswordReset
    },
    {
      path: '/inicio',
      name: 'main',
      component: MainPage
    },
    {
      path: '/sinistros/registrar',
      name: 'accidentRegister',
      component: AccidentRegister
    },
    {
      path: '/sinsitros/editar/:id',
      name: 'accidentEdit',
      component: AccidentRegister
    },
    {
      path: '/sinistros/visualizar/:id',
      name: 'visualizarSinistro',
      component: AccidentRegister
    },
    {
      path: '/sinistros',
      name: 'accidentSearch',
      component: AccidentSearch
    },
    {
      path: '/excluirSinistro/:id',
      name: 'deleteAccident',
      component: AccidentRegister
    },    
    {
      path: '/clientes',
      name: 'buscarClientes',
      component: AccidentSearch
    },
    {
      path: '/clientes/adicionar',
      name: 'adicionarCliente',
      component: CadastrarClientes
    },
    {
      path: '/seguradoras',
      name: 'buscarSeguradoras',
      component: AccidentSearch
    },
    {
      path: '/seguradoras/adicionar',
      name: 'adicionarSeguradora',
      component: CadastrarSeguradora
    },
  ]
})

export default router
