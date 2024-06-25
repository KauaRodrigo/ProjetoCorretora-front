<template>
    <div> 
        <Page>
            <div class="container">
                <Summary />
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

</script>
<style scoped lang="scss">
    @import "../assets/__variables.scss";    

</style>