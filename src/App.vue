<template>  
    <div class="app" id="app" v-if="route">
        <TheHeader v-if="isLogin" @openModalLogout="openModalLogout"></TheHeader>         
        <RouterView />
        <Modal v-if="showModalLogout && showElement()" texto="Tem certeza que deseja sair?" @confirmar="logout" @cancelar="closeModalLogout" />
          
        <Alert v-if="showAlert" :title="title" :content="content" :route="backRoute"/>
    </div>
</template> 

<script setup lang="ts">
import { computed, onMounted, provide, ref, type Ref } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router'
import TheHeader from '@/components/baseComponents/TheHeader.vue'
import useUserStore from './stores/UserStore';
import Alert from './components/Alert.vue';
import Modal from './components/Modal.vue';

const store = useUserStore()
const router = useRouter()
const route = useRoute()
const backRoute: Ref<string> = ref('');
const title = ref('');
const content = ref('');
const isLogin = computed(() => showElement())

const showModalLogout = ref(false)

async function logout() {
    const logedOut = store.logout()
    showModalLogout.value = false;
    if(logedOut) {
        await router.push({ name: 'login' })
    }
}

const showAlert = ref();
const openAlert = (route:string, inTitle:string, inContent:string) => {    
    setTimeout(() => {
        showAlert.value = true;
    }, 0)
    backRoute.value = route;
    title.value = inTitle;
    content.value = inContent
    showAlert.value = false;
}

provide('openAlert', openAlert)

function openModalLogout() {
    showModalLogout.value = true
}

function closeModalLogout() {
    showModalLogout.value = false
}

function showElement() {    
    return route.name != 'login' && route.name != 'passwordReset' ? true : false;      
}

onMounted(async () => {
    const isAuth = store.getUserAndToken();    
    // if(!isAuth) {
    //     router.push({ name: 'login' })
    // }
})
</script>


<style scoped>
</style>
