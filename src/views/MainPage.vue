<template>
    <div>
        <TheHeader @openModalLogout="openModalLogout"></TheHeader> 
        <div class="container">
            <Summary></Summary>
            <LastRecordsList />
        </div>
        <ModalLogout @logout="logout" v-if="showModalLogout" />
    </div>
</template>

<script setup lang="ts">
import LastRecordsList from '@/components/lastRecords/LastRecordsList.vue'
import TheHeader from '@/components/baseComponents/TheHeader.vue'
import ModalLogout from '@/components/ModalLogout.vue';
import Summary from '@/components/Summary.vue'
import useSinistroStore from '@/stores/SinistroStore';
import useUserStore from '@/stores/UserStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useUserStore()
const sinistrosStore = useSinistroStore()
const router = useRouter()

const showModalLogout = ref(false)

async function logout() {
    const logedOut = await store.logout()
    if(logedOut) {
        router.push({ name: 'login' })
    }
}

function getLastRecords() {
    sinistrosStore.getLastRecords()
}

function openModalLogout() {
    showModalLogout.value = true
}

function closeModalLogout() {
    showModalLogout.value = false
}

</script>
<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    *{
        overflow-x: hidden;
    }
    
    .container{
        padding-top: 20px;
        overflow: visible;
    }

</style>