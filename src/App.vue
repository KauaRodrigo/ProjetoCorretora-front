<script setup lang="ts">
import { onMounted, provide, ref } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router'
import ModalLogout from '@/components/ModalLogout.vue';
import TheHeader from '@/components/baseComponents/TheHeader.vue'
import useUserStore from './stores/UserStore';
import Alert from './components/Alert.vue';

const store = useUserStore()
const router = useRouter()
const route = useRoute()

const showModalLogout = ref(false)

async function logout() {
    const logedOut = store.logout()
    if(logedOut) {
        await router.push({ name: 'login' })
    }
}

const showAlert = ref();
const openAlert = () => {
    console.log('hello')
    showAlert.value = true;
}

provide('openAlert', openAlert)

function openModalLogout() {
    showModalLogout.value = true
}

function closeModalLogout() {
    showModalLogout.value = false
}

function showElement() {
  return route.name != 'login';      
}

onMounted(async () => {
    const isAuth = store.getUserAndToken()
    if(!isAuth) {
        router.push({ name: 'login' })
    }
})
</script>

<template>  
  <TheHeader v-if="showElement()" @openModalLogout="openModalLogout"></TheHeader> 
  <RouterView />
  <ModalLogout @logout="logout" @closeModal="closeModalLogout" v-if="showModalLogout && showElement()" />  
  <Alert v-if="showAlert" title="Sinistro Registrado!" content="Seu sinistro foi registrado com sucesso, você será redirecionado em 5 segundos!"/>
</template> 

<style scoped>
</style>
