<template>
    <h1>Últimos registros</h1>
    <div class="card-list" :class="{'p-4': !lastRecordsRows }">
        <Table v-if="lastRecordsRows" template="0.5fr 0.8fr 0.6fr 0.7fr 0.8fr 0.5fr 0.7fr" :headers="['Código', 'Cliente', 'Seguradora', 'Evento', 'Tipo', 'Status', '']">
            <LastRecordsListItem v-for="(value, index) of lastRecordsRows.rows" :key="index" :row="value" />        
        </Table>
        <Loader class="align-self-center" v-else text="Carregando..." big/>
        <div class="empty" v-if="lastRecordsRows && !lastRecordsRows.length">
            <h3>Nenhum sinistro registrado <br> nos últimos 7 dias!</h3>
        </div>
    </div>
</template>
<script setup lang="ts">
import LastRecordsListItem from './LastRecordsListItem.vue'
import Table from '../baseComponents/Table.vue'
import useSinistroStore from '@/stores/SinistroStore';
import { onMounted, ref } from 'vue';
import Loader from '../baseComponents/Loader.vue';

const store = useSinistroStore()

const lastRecordsRows = ref()

onMounted(async () => {
    lastRecordsRows.value = await store.getLastRecords()    
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

    .empty {
        height: 20rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        h3 {
            font-weight: 700;
            //font-size: 22px;
            font-family: Arial, serif;
            color: $tertiary;
        }
    }

}

h1{
    color: $primary;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
}
</style>