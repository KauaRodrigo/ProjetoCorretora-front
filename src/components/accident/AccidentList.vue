<template>  
    <div>        
        <div class="list" :class="{'p-4': loading }">
            <Table v-if="rows?.length > 0 && !loading" template="0.5fr 0.8fr 0.6fr 0.7fr 0.5fr 0.7fr 0.7fr" :headers="['N° do    Sinistro', 'Cliente', 'Seguradora', 'Evento', 'Tipo', 'Status', '']">
                <AccidentListItem @atualizaSinistro="openModalAtualizaStatusSinistro(value)" @cancelarSinistro="openModalConfirmaExclusaoCancelamento(value, false)" @deleteSinistro="openModalConfirmaExclusaoCancelamento(value, true)" v-for="(value, index) of rows" :key="index" :row="value"/>
            </Table>
            <AccidentEmpty v-else-if="rows?.length == 0 && !loading" />
            <Loader class="align-self-center" v-if="loading" text="Carregando..." big />
        </div>
        <!--<ModalConfirmaExclusaoSinistro :sinistro="sinistro" />-->
        <!-- <ModalConfirmaExclusaoSinistro :sinistro="sinistro" :excluindo="excluindo" /> -->
        <ModalAtualizaStatus :sinistro="sinistro" />
    </div>
</template>
<script lang="ts" setup>

import { ref, type Ref } from 'vue';
import Loader from '../baseComponents/Loader.vue';
import Table from '../baseComponents/TableComponent.vue'
import AccidentListItem from './AccidentListItem.vue';
import AccidentEmpty from "../../emptyStates/AccidentEmpty.vue";
import useUserStore from '@/stores/UserStore';
import ModalConfirmaExclusaoSinistro from '../ModalConfirmaExclusaoSinistro.vue';
import ModalAtualizaStatus from '../ModalAtualizaStatus.vue';

const sinistro: Ref<{ id: number, status: string, type: ''}> = ref({
    id: 0,
    status: '',
    type: ''
})
const excluindo: Ref<boolean> = ref(false);

defineProps<{ rows?: any, loading?: boolean }>()

/**
 * Abre o modal para exclusão ou cancelamento do sinistro
 * 
 * @param {any} row 
 * @param {boolean} excluir
 */
function openModalConfirmaExclusaoCancelamento(row: any, excluir: boolean) {    
    excluindo.value = excluir;
    sinistro.value.id = row.id;
    sinistro.value.status = row.status;
    sinistro.value.type = row.type;
    const modal = document.getElementById('modalExclusaoSinistro');

    if(modal) {    
        modal.style.display = 'block';
    }
}

/**
 * 
 * Abre o modal para atualização do status do sinistro
 * 
 * @param {any} row 
 */
function openModalAtualizaStatusSinistro(row: any) {    
    sinistro.value.id = row.id;
    sinistro.value.status = row.status;
    const modal = document.getElementById('modalAtualizaStatus');    

    if(modal) {    
        modal.style.display = 'block';
    }
}
 
</script>
<style scoped lang="scss">
@import '../../assets/_variables.scss';

.actions {
    padding: 2% 0;    
    width: 10%;
    justify-content: end;
    margin-left: auto;
    gap: 10%;

    button {
        border: none;                        
        background: $primary;
        height: 50px;
        width: 50px;                
        font-size: 1.5rem;
        color: $secondary;
        font-weight: bold;
        border-radius: 10px;        
        transition: all 0.5s;
    }    

    button:hover {         
        transition: all 0.5s;
        transform: scale(1.1);
    }
}

.list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #EEEEEE;
    border-radius: 10px 10px 10px 10px;
    margin-top: 2.5rem;

    .empty {
        height: 20rem;
        display: flex;
        align-items: center;
        justify-content: center;

        h3 {
            font-weight: 700;
            font-family: Arial, serif;
            color: $tertiary;
        }
    }
}
</style>