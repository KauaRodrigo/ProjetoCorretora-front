<template>
    <div>        
        <Page>
            <div class="container">                
                <form @submit.prevent="submit">
                    <div class="row justify-content-between">
                        <div class="col-5">
                            <label>Nome ou placa</label>
                            <input type="text" v-model="formData.searchFilter.valor" @blur="definirFiltroPesquisa()">
                        </div>
                        <div class="col-4">
                            <label>Data</label>
                            <div class="date">
                                <div class="date-item">
                                    <input @blur="changeFilters()" type="date" v-model="formData.data.inicial">
                                </div>
                                <h6>Até</h6>
                                <div class="date-item">
                                    <input @blur="changeFilters()" type="date" v-model="formData.data.final">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-between">
                        <div class="vehicle col-6">
                            <div class="vehicle-item col-4">
                                <label>Número da apólice</label>
                                <input @blur="changeFilters()" type="text" v-model="formData.apolice">
                            </div>
                            <div class="vehicle-item">
                                <label>Seguradora</label>
                                <input @blur="changeFilters()" type="text" v-model="formData.seguradora"/>
                            </div>
                        </div>
                        <div class="col-3 selects">
                            <div>
                                <label>Tipo seguro</label>
                                <select name="status" @change="changeFilters()" v-model="formData.tipo">
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
                                <select name="status" @change="changeFilters()" v-model="formData.status">
                                    <option value="">Não Filtrar</option>
                                    <option value="ABERTO">Aberto</option>
                                    <option value="INDENIZADO">Indenizado</option>                                    
                                    <option value="FECHADO">Fechado</option>
                                    <option value="REPARO">Reparo</option>
                                    <option value="RETORNO_REPARO">Retorno reparo</option>
                                    <option value="CANCELADO">Cancelado</option>                                    
                                </select>
                            </div>
                        </div>
                    </div>                    
                </form>          
                <div id="ordenacao">
                    <div id="exportar">
                        <button class="btn btn-outline-info" @click="exportarConsulta">
                            Exportar
                            <i class="fa-solid fa-file-download"></i>
                        </button>
                    </div>
                    <div id="orderBy">
                        <label for="orderBy">Ordenar por</label>
                        <select name="orderBy" @change="changeFilters" v-model="formData.orderBy">
                            <option value="numeroSinistro">Número do Sinistro</option>
                            <option value="cliente">Cliente</option>
                            <option value="seguradora">Seguradora</option>
                            <option value="tipo">Tipo</option>
                            <option value="status">Status</option>
                        </select>
                    </div>
                    <div id="order">
                        <label for="order">Ordem</label>
                        <select name="order" @change="changeFilters" v-model="formData.order">
                            <option value="asc">Crescente</option>
                            <option value="desc">Descrescente</option>                        
                        </select>
                    </div>
                </div>                      
                <SinistrosList :rows="sinistros?.rows" :loading="loading"/>
                <div class="d-flex pagination justify-content-between">
                    <select class="perPage" name="perPage" id="perPage" @change="changePerPage()" v-model="formData.perPage">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                    <div class="page justify-content-end d-flex align-items-center">
                        <p class="m-0">{{ formData.page * formData.perPage + 1}} - {{ formData.perPage * (formData.page + 1) }} de {{ sinistros?.count }}</p>
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
import SinistrosList from '@/components/sinistros/SinistrosList.vue';
import { onBeforeUnmount, onMounted, provide, ref } from 'vue';
import useSinistroStore from '@/stores/SinistroStore';

const sinistroStore = useSinistroStore()  

const formData = ref({
    apolice: '',
    seguradora: '',        
    data: {
        inicial: '',
        final: ''
    },    
    status: '',
    tipo: '',
    page: 0,
    perPage: 5,
    orderBy: 'numeroSinistro',
    order: 'asc',
    searchFilter:{
        coluna: '',
        valor:''
    }
})    

const loading = ref(true)
const maxPage = ref(0)
const sinistros: any = ref({})

onMounted(async () => {        
    if(sinistroStore.filtros) {        
        formData.value.tipo = sinistroStore.filtros.tipo 
    }
    sinistros.value = await sinistroStore.buscaSinistros(formData.value);
    maxPage.value = Math.ceil(sinistros.value.count / formData.value.perPage);
    loading.value = false;
})

provide('reload', reload)

async function reload() {
    sinistros.value = await sinistroStore.buscaSinistros(formData.value)       
}

function definirFiltroPesquisa(){
    if(formData.value.searchFilter.valor.length > 1){
        const regex: RegExp = /\d/

        if(regex.test(formData.value.searchFilter.valor)) {
            formData.value.searchFilter.coluna = 'placa'
            submit();
            return
        }
        formData.value.searchFilter.coluna = 'cliente'
        submit();
        return
    }    
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

    if(formData.value.data.inicial && formData.value.data.final == null) {
        return
    }
    submit();
}

async function submit() {    
    sinistros.value = await sinistroStore.buscaSinistros(formData.value)        
    loading.value = false
    maxPage.value = Math.ceil(sinistros.value.count / formData.value.perPage)
}

async function exportarConsulta() {
    await sinistroStore.exportarConsulta(formData.value)
}

onBeforeUnmount(() => {
    sinistroStore.filtros.tipo = '';
})

</script>
<style scoped lang="scss">
    @import "/src/assets/__variables.scss";
    .selects {
        display: flex;
        gap: 1rem;
        justify-content: end;           
    }

    #ordenacao {        
        text-align: right;
        display: flex;
        justify-content: right;
        gap: 1rem;
        margin-left: auto;         

        #orderBy {
            width: 25%;
        }          

        #order {
            width: 20%;
        }       
        
        #exportar {            
            display: flex;
            align-items: end;
            margin-right: auto;                                    

            i {
                margin-left: 5px;
            }

            button {                                
                height: max-content;
            }
        }
    }

    .pagination {
        width: 100%;
        margin: 20px 0px;
        .perPage {
            width: fit-content;
            cursor: pointer;
        }
        .page {
            width: 20%;
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
        gap: 1rem;        
    }

    .vehicle-item{
        width: 45%;
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

    @media screen and (max-width: 767px){
        .col-4, .col-5, .col-6, #ordenacao{
            width: 100%;
        }

        .selects{
            width: 100%;
            gap: 1rem;
            justify-content: initial;
        }
    }

</style>