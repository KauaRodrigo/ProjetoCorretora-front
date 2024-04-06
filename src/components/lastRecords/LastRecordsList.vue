<template>
    <h1>Últimos registros</h1>
    <div class="card-list" :class="{'p-4': !lastRecordsRows }">
        <Table v-if="lastRecordsRows?.rows?.length > 0 && !loading" template="0.5fr 0.8fr 0.6fr 0.7fr 0.8fr 0.5fr 0.7fr" :headers="['Código', 'Cliente', 'Seguradora', 'Evento', 'Tipo', 'Status', '']">
            <LastRecordsListItem v-for="(value, index) of lastRecordsRows.rows" :key="index" :row="value" />        
        </Table>
        <Loader class="align-self-center" v-if="loading" text="Carregando..." big/>
        <AccidentEmpty v-if="!lastRecordsRows?.rows?.length && !loading" />
    </div>
</template>
<script setup lang="ts">
import LastRecordsListItem from './LastRecordsListItem.vue'
import Table from '../baseComponents/TableComponent.vue'
import useSinistroStore from '@/stores/SinistroStore';
import { onMounted, ref } from 'vue';
import Loader from '../baseComponents/Loader.vue';
import AccidentEmpty from "@/emptyStates/AccidentEmpty.vue";

const store = useSinistroStore()

const lastRecordsRows = ref()
const loading = ref(false)

onMounted(async () => {
    loading.value = true;
    lastRecordsRows.value = await store.getLastRecords();
    loading.value = false;
})
</script>
<style scoped lang="scss">
@import '../../assets/_variables';
.card-list {            
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80%;
    background-color: #EEEEEE;
    border-radius: 10px 10px 10px 10px;

}

h1{
    color: $primary;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
}
</style>