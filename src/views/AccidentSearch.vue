<template>
    <div>        
        <Page>
            <div class="container">                
                <form @change="changeFilters" @submit.prevent="submit">
                    <div class="row justify-content-between">
                        <div class="col-5">
                            <label>Nome ou placa</label>
                            <input type="text" v-model="formData.searchFilter">
                        </div>
                        <div class="col-4">
                            <label>Data</label>
                            <div class="date">
                                <div class="date-item">
                                    <input type="date" v-model="formData.dataFilter.init">
                                </div>
                                <h6>Até</h6>
                                <div class="date-item">
                                    <input type="date" v-model="formData.dataFilter.end">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-between">
                        <div class="vehicle col-6">
                            <div class="vehicle-item col-4">
                                <label>Número da apólice</label>
                                <input type="text" v-model="formData.policyNumberFilter">
                            </div>
                            <div class="vehicle-item">
                                <label>Seguradora</label>
                                <input type="text" v-model="formData.companyFilter"/>
                            </div>
                        </div>
                        <div class="col-3 selects">
                            <div>
                                <label>Tipo seguro</label>
                                <select name="status" v-model="formData.typeFilter">
                                    <option value="">Não Filtrar</option>
                                    <option value="VEICULAR">Veicular</option>
                                    <option value="VIDA">Vida</option>
                                    <option value="VIAGEM">Viagem</option>
                                    <option value="EMPRESARIAL">Empresarial</option>
                                    <option value="RESIDENCIAL">Residencial</option>
                                </select>
                            </div>
                            <div>
                                <label>Status</label>
                                <select name="status" v-model="formData.statusFilter">
                                    <option value="">Não Filtrar</option>
                                    <option value="ABERTO">Aberto</option>
                                    <option value="INDENIZADO/FECHADO">Indenizado/Fechado</option>                                    
                                    <option value="ARQUIVADO">Arquivado</option>
                                </select>
                            </div>
                        </div>
                    </div>                    
                </form>          
                <div id="orderBy">
                    <label for="orderBy">Ordenar por</label>
                    <select name="orderBy" @change="changeFilters" v-model="formData.orderBy">
                        <option value="codigo">Código</option>
                        <option value="cliente">Cliente</option>
                        <option value="seguradora">Seguradora</option>
                        <option value="tipo">Tipo</option>
                        <option value="status">Status</option>
                    </select>
                </div>      
                <AccidentList :rows="accidentList?.rows" :loading="loading"/>
                <div class="d-flex pagination justify-content-between">
                    <select class="perPage" name="perPage" id="perPage" @change="changePerPage()" v-model="formData.perPage">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <div class="page d-flex">
                        <button :disabled="formData.page === 0" @click="prevPage()"><i class="fa-solid fa-chevron-left"></i></button>
                        <button :disabled="formData.page === (maxPage - 1)" @click="nextPage()"><i class="fa-solid fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>                        
        </Page>        
    </div>
</template>

<script setup lang="ts">
import Page from '@/components/baseComponents/Page.vue';
import AccidentList from '@/components/accident/AccidentList.vue';
import { onMounted, provide, ref } from 'vue';
import useSinistroStore from '@/stores/SinistroStore';

const sinistroStore = useSinistroStore()  

const formData = ref({
    policyNumberFilter: '',
    companyFilter: '',        
    dataFilter: {
        init: '',
        end: ''
    },
    statusFilter: '',
    typeFilter: '',
    page: 0,
    perPage: 5,
    orderBy: 'codigo'
})    

const loading = ref(true)
const maxPage = ref(0)
const accidentList: any = ref({})

onMounted(async () => {        
    if(sinistroStore.filters) {        
        formData.value.typeFilter = sinistroStore.filters.type 
    }
    accidentList.value = await sinistroStore.getAccidentsByFilters(formData.value)       
    maxPage.value = Math.ceil(accidentList.value.count / formData.value.perPage)
    loading.value = false
})

provide('reload', reload)

async function reload() {
    accidentList.value = await sinistroStore.getAccidentsByFilters(formData.value)       
}

function nextPage() {
    loading.value = true
    ++formData.value.page; 
    submit();
}

function prevPage() {
    loading.value = true
    --formData.value.page; 
    submit();
}

function changePerPage() {
    loading.value = true
    formData.value.page = 0;
    submit()
}

function changeFilters() {
    loading.value = true
    formData.value.page = 0;
    submit();
}

async function submit() {    
    accidentList.value = await sinistroStore.getAccidentsByFilters(formData.value)        
    loading.value = false
    maxPage.value = Math.ceil(accidentList.value.count / formData.value.perPage)
}

</script>
<style scoped lang="scss">
    @import "../assets/__variables.scss";
    .selects {
        display: flex;
        gap: 5px;
        justify-content: end;
    }

    #orderBy {        
        text-align: right;
        display: block;
        margin-left: auto;           
        width: fit-content;
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
        margin-bottom: 2%;
    }

    input, select{
        width: 100%;
        height: 45px;
        background-color: #f9f9f9;
        border: none;
        border-radius: 5px;
        padding: 0 13px;
        box-shadow: rgba(0,0,0,0.2) 2px 2px 3px;
    }

    input:focus-visible, select:focus-visible{
        outline: none;
    }

    input:focus, select:focus{
        border: 1px solid $secondary;
        padding: 0 12px;
    }

    label{
        font-size: 18px;
        font-weight: bold;
        color: $primary;
        margin-top: 15px;
    }

    .date{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .date h6{
        color: $primary;
        font-size: 16px;
        margin-top:8px;
    }
    .date-item{
        width: 45%;
    }

    .vehicle{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .vehicle-item{
        width: 49.5%;
    }


    #registerCustomer{
        background-color: $primary;
        color: white;
        font-weight: 700;        
        padding: 0.5% 1.5%;
        border-radius: 5px;
        font-size: 16px;
        transition: 0.1s;
        margin: 2% 0;        
        border: none;        
    }
    form {
        margin-bottom: 4%;
    }

    .searchResult{
        margin-top: 15px;
    }

    .searchResult h1{
        margin-bottom: 5px;
    }

    .result{        
        padding: 0 10px;
        border: 1.5px solid #EEEEEE;
        border-radius: 10px;
    }

    .spacing{
        margin: 10px 0;
    }

</style>