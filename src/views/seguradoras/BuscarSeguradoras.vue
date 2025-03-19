<template>
    <Page>
        <div class="container">
            <form @submit.prevent="buscarSeguradoras">
                <div class="d-flex" style="gap: 2%;">
                    <div style="width: 35%">
                        <label>Nome da Seguradora</label>
                        <input @blur="changeFilters()" type="text" name="sNomeSeguradora" v-model="formData.sNome">
                    </div>                       
                </div>
            </form>            
            <div id="ordenacao">
                <div id="orderBy">
                    <label for="orderBy">Ordenar por</label>
                    <select name="orderBy" @change="changeFilters" v-model="formData.orderBy">
                        <option value="seguradora.id">Código da Seguradora</option>
                        <option value="nome">Nome da Seguradora</option>                        
                    </select>
                </div>
                <div id="order">
                    <label for="order">Ordenar por</label>
                    <select name="order" @change="changeFilters" v-model="formData.order">
                        <option value="asc">Crescente</option>
                        <option value="desc">Descrescente</option>                        
                    </select>
                </div>
            </div>
            <SeguradorasList v-if="!loading" :aSeguradoras="aSeguradoras.rows"></SeguradorasList>
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
            <Loader id="loaderSeguradoras" style="display: none; position: absolute; top: 9%; left: 0; width: 100%; height: 91%;" text="Carregando..." big></Loader>
        </div>
    </Page>
</template>
<script lang="ts" setup>
import Page from '@/components/baseComponents/Page.vue';
import Loader from '@/components/baseComponents/Loader.vue';
import useSeguradoraStore from '@/stores/SeguradoraStore';
import { UtilsCampos } from '@/utils/UtilsCampos';
import { onMounted, provide, ref } from 'vue';
import SeguradorasList from '@/components/seguradoras/SeguradorasList.vue';

let maxPage = ref(0);
let loading: boolean = ref(true);
let aSeguradoras: any[] = ref([]);
let formData = {
    sNome   : '',    
    page    : 0,
    perPage : 5,
    order   : 'asc',
    orderBy : 'seguradora.id'
};

const seguradoraStore = useSeguradoraStore();
provide('reload', buscarSeguradoras);

onMounted(() => {
    buscarSeguradoras();
})

function changeFilters() {
    formData.page = 0;
    buscarSeguradoras();
}

async function buscarSeguradoras() {
    let payload = {
        ...formData
    }
    $('#loaderSeguradoras').show();    

    aSeguradoras.value = await seguradoraStore.buscarSeguradoras(payload);    
    maxPage.value = Math.ceil(aSeguradoras.value.count / formData.perPage);

    loading.value = false;
    $('#loaderSeguradoras').hide();
}

function changePerPage() {    
    formData.page = 0;
    formData.perPage = $('#perPage').val() ?? '';
    return buscarSeguradoras();
}

function prevPage() {
    formData.page--;
    return buscarSeguradoras();
}

function nextPage() {
    formData.page++;
    return buscarSeguradoras();
}

</script>
<style lang="scss" scoped>
@import url('/src/assets/inputbox.scss');
@import '/src/assets/_variables';

.selects {
    display: flex;
    gap: 1rem;
    justify-content: end;           
}

#ordenacao {        
    margin-top: 2rem;
    text-align: right;
    display: flex;
    justify-content: right;
    gap: 1rem;
    margin-left: auto; 
    width: 40%;

    #orderBy {
        width: 50%;
    }          

    #order {
        width: 25%;
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

</style>