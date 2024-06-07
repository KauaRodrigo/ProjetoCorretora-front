<template>
    <div class="lastRecContainer">
        <h1>Últimos registros</h1>
        <div class="card-list" :class="{'p-4': !lastRecordsRows }">
            <Table v-if="lastRecordsRows?.rows?.length > 0 && !loading" template="0.5fr 0.8fr 0.6fr 0.7fr 0.8fr 0.5fr 0.7fr" :headers="['Código', 'Cliente', 'Seguradora', 'Evento', 'Tipo', 'Status', '']">
                <LastRecordsListItem v-for="(value, index) of lastRecordsRows.rows" :key="index" :row="value" />        
            </Table>
            <Loader class="align-self-center" v-if="loading" text="Carregando..." big/>
            <AccidentEmpty v-if="!lastRecordsRows?.rows?.length && !loading" />
        </div>
        <div class="d-flex pagination justify-content-between">
            <select class="perPage" name="perPage" id="perPage" @change="changePerPage()" v-model="formData.perPage">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
            <div class="page d-flex">
                <button :disabled="formData.page === 0" @click="prevPage()">&lt;</button>
                <button :disabled="formData.page === (maxPage - 1)" @click="nextPage()">&gt;</button>
            </div>
        </div>
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

const formData = ref({
    page: 0,
    perPage: 5
})
const maxPage = ref();
const lastRecordsRows = ref()
const loading = ref(false)

onMounted(async () => {
    loading.value = true;
    lastRecordsRows.value = await store.getLastRecords(formData.value);
    maxPage.value = Math.ceil(lastRecordsRows.value.count / formData.value.perPage)
    loading.value = false;
})

function nextPage() {
    ++formData.value.page; 
    submit();
}

function prevPage() {
    --formData.value.page; 
    submit();
}

function changePerPage() {
    formData.value.page = 0;
    submit()
}

async function submit() {
    loading.value = true
    lastRecordsRows.value = await store.getLastRecords(formData.value)        
    loading.value = false
    maxPage.value = Math.ceil(lastRecordsRows.value.count / formData.value.perPage)
}
</script>
<style scoped lang="scss">
@import '../../assets/_variables';
.card-list {            
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80%;    
    border-radius: 10px 10px 10px 10px;
    background: #EEE;
}

input, select{
    width: 100%;
    height: 45px;
    background-color: #f9f9f9;
    border: none;
    border-radius: 5px;
    padding: 0 13px;
}

.pagination {
    width: 100%;
    margin-top: 20px;
    .perPage {
        width: fit-content;
        cursor: pointer;
    }
    .page {            
        gap: 10%;
        button {
            padding: 5%;                
            border: none;
            width: 3rem;
            box-shadow: rgba(0,0,0,0.2) 0px 0px 10px;                
            border-radius: 5px;
            font-weight: bold;
            color: $primary;
            transition: background-color .5s;
            background-color: #FFF;
        }

        button[disabled], button[disabled]:hover {
            background-color: #EEE; 
            color: $primary;                
        }

        button:hover {
            transition: background-color .5s;
            background-color: $secondary;
            color: white;
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