<template>
    <div :class="{ item: type === 'LIST', 'card-item': type === 'CARD' }" v-if="row">
        <span>{{ row.numeroSinistro }}</span>
        <span>{{ row.client }}</span>
        <span>{{ row.company.toLowerCase() }}</span>
        <span :title="row.event">{{ row.event || 'Não informado' }}</span>
        <span>{{ row.type.toLowerCase() }}</span>
        <span>
            <div class="tag">
                {{ row.status == 'RETORNO_REPARO' ? row.status.replace('_', ' ').toLowerCase() : row.status.toLowerCase() }}<i class="bi bi-circle-fill" :class="{'closed': row.status == 'FECHADO' || row.status == 'CANCELADO', 'opened': row.status == 'ABERTO'}"></i>
            </div>
        </span>
        <span class="d-flex justify-content-end actions">            
            <RouterLink :to="{ name: 'accidentEdit', params: { id: row.id }}" class="btn edit" @click="editRegister(row.id)"><i class="fa-solid fa-search"></i></RouterLink>
            <button @click="atualizaSinistro" :disabled="!validaPermiteAtualizar(row.status)" class="btn bg-warning"><i class="fa-solid fa-arrows-rotate"></i></button>
            <button :disabled="!mostraBotaoCancelar(row.status)" @click="deleteSinistro()" class="btn bg-danger"><i class="fa-solid fa-xmark"></i></button>
        </span>       
    </div>
</template>
<script setup lang="ts">

import type { AccidentItem } from '../../dtos/AccidentItem.dto';
import { useRouter } from "vue-router";

defineProps<{ row: AccidentItem,type: string}>();
const emits = defineEmits(['deleteSinistro', 'atualizaSinistro']);

const router = useRouter();

function deleteSinistro() {    
    emits('deleteSinistro');
}

function atualizaSinistro() {
    emits('atualizaSinistro');
}

function visualizarSinistro(id: string) {
    router.push({
        name: 'visualizarSinistro',
        params: {
            id
        }
    })
}

function validaPermiteAtualizar(status: string) {
    return status != 'CANCELADO';
}

function mostraBotaoCancelar(status: string): boolean {
    let removeBotao = [
        'CANCELADO',
        'INDENIZADO',
        'FECHADO'
    ]

    if(removeBotao.includes(status)) {
        return false
    }
    return true;
}

function editRegister(id: number) {    
    router.push({
        name: 'accidentEdit',
        params: {
            id
        }
    })
}
</script>
<style scoped lang="scss">

.card-item {
    padding: 0.8%;
    display: flex;    
    border-radius: 10px;    
    min-width: 20%;    
    margin: 0 1% 3% 0;
    flex-direction: column;    
    background-color: #EEE;        
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px;
    color: black;    
}

.card-item:nth-child(4n) {
    margin-right: 0;
}

.item {
    z-index: 0 !important;
    padding: 0.8%;
    display: grid;    
    background-color: #e2e2e2;    
    grid-template-columns: 0.5fr 0.8fr 0.6fr 0.8fr 0.5fr 0.7fr 0.5fr;
    text-decoration: none;
    color: black;    
}
.item:nth-child(2n) {
    background-color: #EEEEEE;
}
.item:last-child {
    border-radius: 0 0 10px 10px;
}
span {
    font-size: 16px;
    padding: 2% 4%;
    text-transform: capitalize;     
    text-wrap: nowrap;    
    overflow: hidden;
    text-overflow: ellipsis;       
}

.actions {    
    gap: 10px;    
    a, button {        
        display: flex;
        align-items: center;        
        height: 30px;
        border: none;              
        color: white;
        justify-content: center;  
        border-radius: 5px;    
    }    
    .edit{
        background-color: #0094FF;
    }

    i{
        font-size: 15px;
    }

    .close{
        background-color: #C00000;
    }
}

.tag {
    text-transform: capitalize;
    display: flex;
    gap: 10px;
    align-items: center;
    i {
        font-size: 10px;
        color: #e5c122c3;
    }
    .closed {
        color: #C00000;
    }
    .opened {
        color: green;
    }
}
</style>