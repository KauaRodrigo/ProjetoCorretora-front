import LoginView from '@/views/LoginView.vue'
import MainPage from '@/views/MainPage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PasswordReset from '@/views/PasswordReset.vue'
import CadastrarClientes from '@/views/clientes/CadastrarClientes.vue'
import BuscarClientes from '@/views/clientes/BuscarClientes.vue'
import VisualizarClientes from '@/views/clientes/VisualizarClientes.vue'
import AlterarClientes from '@/views/clientes/AlterarClientes.vue'
import BuscarSeguradoras from '@/views/seguradoras/BuscarSeguradoras.vue'
import CadastrarSeguradoras from '@/views/seguradoras/CadastrarSeguradoras.vue'
import VisualizarSeguradoras from '@/views/seguradoras/VisualizarSeguradoras.vue'
import AlterarSeguradoras from '@/views/seguradoras/AlterarSeguradoras.vue'
import BuscarSinistros from '@/views/sinistros/BuscarSinistros.vue'
import CadastrarSinistros from '@/views/sinistros/CadastrarSinistros.vue'
import AlterarSinistros from '@/views/sinistros/AlterarSinistros.vue'
import VisualizarSinistros from '@/views/sinistros/VisualizarSinistros.vue'

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
      name: 'cadastrarSinistro',
      component: CadastrarSinistros
    },
    {
      path: '/sinsitros/editar/:id',
      name: 'editarSinistro',
      component: AlterarSinistros
    },
    {
      path: '/sinistros/visualizar/:id',
      name: 'visualizarSinistro',
      component: VisualizarSinistros
    },
    {
      path: '/sinistros',
      name: 'buscarSinistros',
      component: BuscarSinistros
    },    
    {
      path: '/clientes',
      name: 'buscarClientes',
      component: BuscarClientes
    },
    {
      path: '/clientes/adicionar',
      name: 'adicionarCliente',
      component: CadastrarClientes
    },
    {
      path: '/clientes/:id',
      name: 'visualizarCliente',
      component: VisualizarClientes
    },
    {
      path: '/clientes/:id/alterar',
      name: 'alterarCliente',
      component: AlterarClientes
    },
    {
      path: '/seguradoras',
      name: 'buscarSeguradoras',
      component: BuscarSeguradoras
    },
    {
      path: '/seguradoras/adicionar',
      name: 'adicionarSeguradora',
      component: CadastrarSeguradoras
    },
    {
      path: '/seguradoras/:id',
      name: 'visualizarSeguradora',
      component: VisualizarSeguradoras
    },
    {
      path: '/seguradoras/:id/alterar',
      name: 'atualizarSeguradora',
      component: AlterarSeguradoras
    },
  ]
})

export default router
