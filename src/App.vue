<template>  
    <div class="app" id="app" v-if="route">
        <TheHeader v-if="isLogin" @openModalLogout="openModalLogout"></TheHeader>         
        <RouterView />
        <ModalLogout @logout="logout" @closeModal="closeModalLogout" v-if="showModalLogout && showElement()" />  
        <Alert v-if="showAlert" title="Sinistro Registrado!" content="Seu sinistro foi registrado com sucesso, você será redirecionado em 5 segundos!" :route="backRoute"/>
    </div>
</template> 

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, provide, ref, type Ref } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router'
import ModalLogout from '@/components/ModalLogout.vue';
import TheHeader from '@/components/baseComponents/TheHeader.vue'
import useUserStore from './stores/UserStore';
import Alert from './components/Alert.vue';

const store = useUserStore()
const router = useRouter()
const route = useRoute()
const backRoute: Ref<string> = ref('');
const isLogin = computed(() => showElement())

const showModalLogout = ref(false)

async function logout() {
    const logedOut = store.logout()
    if(logedOut) {
        await router.push({ name: 'login' })
    }
}

const showAlert = ref();
const openAlert = (route: string) => {    
    showAlert.value = true;    
    backRoute.value = route;
}

provide('openAlert', openAlert)

function openModalLogout() {
    showModalLogout.value = true
}

function closeModalLogout() {
    showModalLogout.value = false
}

function showElement() {    
    return route.name != 'login' ? true : false;      
}

onMounted(async () => {
    const isAuth = store.getUserAndToken()
    if(!isAuth) {
        router.push({ name: 'login' })
    }
})
</script>


<style scoped>
</style>
