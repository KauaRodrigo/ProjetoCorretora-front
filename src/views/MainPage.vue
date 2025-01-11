<template>
    <div> 
        <Page>
            <div class="container">
                <Summary />
                <button class="btn-tst" @click="ativarModal()">Ativar Modal</button>
                <NovoModal text="Olá mundo!" v-if="showModal" @closeModal="closeModal"
                @confirmar="confirmar"/>
                <LastRecordsList />            
            </div>
        </Page>
    </div>
</template>

<script setup lang="ts">
import Page from '@/components/baseComponents/Page.vue';
import LastRecordsList from '@/components/lastRecords/LastRecordsList.vue'
import Summary from '@/components/Summary.vue'
import useUserStore from '@/stores/UserStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useUserStore()
const router = useRouter()

const showModalLogout = ref(false)

async function logout() {
    const logedOut = store.logout()
    if(logedOut) {
        await router.push({ name: 'login' })
    }
}

function openModalLogout() {
    showModalLogout.value = true
}

function closeModalLogout() {
    showModalLogout.value = false
}
import NovoModal from '@/components/baseComponents/NovoModal.vue';
const showModal = ref(false);
function ativarModal(){
    showModal.value = true
}
function closeModal() {
    showModal.value = false
}
function confirmar(){
    closeModal()
    console.log("KAUÃ FODINHA")
}

</script>
<style scoped lang="scss">
    @import "../assets/__variables.scss";    

</style>