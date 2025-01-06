<template>  
    <div>
        <div v-if="false" class="d-flex actions">
            <button @click="changeViewType('LIST')">
                <i class="bi bi-list"></i>
            </button>    
            <button @click="changeViewType('CARD')">
                <i class="bi bi-card-heading"></i>
            </button>
        </div>
        <div class="list" :class="{'p-4': loading }">
            <Table v-if="rows?.length > 0 && !loading" template="0.5fr 0.8fr 0.6fr 0.8fr 0.5fr 0.5fr 0.7fr" :headers="['Apólice', 'Cliente', 'Seguradora', 'Evento', 'Tipo', 'Status', '']">
                <AccidentListItem @atualizaSinistro="openModalAtualizaSinistro(value)" @deleteSinistro="openModalConfirmaExclusao(value)" :type="viewType" v-for="(value, index) of rows" :key="index" :row="value"/>
            </Table>
            <AccidentEmpty v-else-if="rows?.length == 0 && !loading" />
            <Loader class="align-self-center" v-if="loading" text="Carregando..." big />
        </div>
        <!--<ModalConfirmaExclusaoSinistro :sinistro="sinistro" />-->
        <ModalAtualizaStatus :sinistro="sinistro" />
    </div>
</template>
<script lang="ts" setup>

import { ref, type Ref } from 'vue';
import Loader from '../baseComponents/Loader.vue';
import Table from '../baseComponents/TableComponent.vue'
import AccidentListItem from './AccidentListItem.vue';
import AccidentEmpty from "@/emptyStates/AccidentEmpty.vue";
import useUserStore from '@/stores/UserStore';
import ModalConfirmaExclusaoSinistro from '../ModalConfirmaExclusaoSinistroo.vue';
import ModalAtualizaStatus from '../ModalAtualizaStatus.vue';

const store = useUserStore();

const viewType: Ref<string> = ref(store.typeView);
const sinistro: Ref<{ id: number, status: string, type: ''}> = ref({
    id: 0,
    status: '',
    type: ''
})

defineProps<{ rows?: any, loading?: boolean }>()

function changeViewType(type: string) {
    viewType.value = store.changeViewType(type);    
}

function openModalConfirmaExclusao(row: any) {    
    sinistro.value.id = row.id;
    sinistro.value.status = row.status;
    sinistro.value.type = row.type;
    const modal = document.getElementById('modalExclusaoSinistro');

    if(modal) {    
        modal.style.display = 'block';
    }
}

function openModalAtualizaSinistro(row: any) {    
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