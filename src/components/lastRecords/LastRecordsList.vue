<template>
    <h1>Últimos registros</h1>
    <div class="card-list" :class="{'p-4': !lastRecordsRows }">
        <Table v-if="lastRecordsRows" template="0.3fr 0.8fr 0.4fr 1fr 0.8fr 0.5fr 0.4fr" :headers="['CÓDIGO', 'CLIENTE', 'SEGURADORA', 'EVENTO', 'TIPO', 'STATUS', '']">
            <LastRecordsListItem class="list-item" v-for="(value, index) of lastRecordsRows.rows" :key="index" :row="value" />        
        </Table>
        <Loader class="align-self-center" v-else text="Carregando..." big/>
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
    padding: 2% 4%;
    border-radius: 20px;
    background-color: #EEEEEE;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80%;
}

.list-item {
    background-color: transparent !important;
}

h1{
    color: $primary;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 20px;
}
</style>