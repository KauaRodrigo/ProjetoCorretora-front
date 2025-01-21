<template>
    <div class="item" v-if="row">
        <span :title="row.numeroSinistro.toString()">{{ row.numeroSinistro || 'Não informado'}}</span>
        <span :title="row.client">{{ row.client || 'Não informado'}}</span>
        <span :title="row.company">{{ row.company.toLowerCase() || 'Não informado'}}</span>
        <span :title="row.event">{{ row.event || 'Não informado' }}</span>
        <span :title="row.type">{{ row.type.toLowerCase() || 'Não informado'}}</span>
        <span :title="row.status">
            <div class="tag">
                {{ row.status == 'RETORNO_REPARO' ? row.status.replace('_', ' ').toLowerCase() : row.status.toLowerCase() }}<i class="bi bi-circle-fill" :class="{'closed': row.status == 'FECHADO' || row.status == 'CANCELADO', 'opened': row.status == 'ABERTO'}"></i>
            </div>
        </span>
        <span class="d-flex justify-content-end actions">            
            <button class="btn btn-info" @click="visualizarSinistro(row.id)"><i class="fa-solid fa-search"></i></button>
            <button class="btn btn-primary" @click="editRegister(row.id)"><i class="fa-solid fa-pencil"></i></button>            
            <button class="btn bg-warning" :disabled="!validaPermiteAtualizar(row.status)" @click="atualizaSinistro()"><i class="fa-solid fa-arrows-rotate"></i></button>
            <!-- <button @click="deleteSinistro()" class="btn bg-danger"><i class="fa-solid fa-trash"></i></button> -->
        </span>       
    </div>
</template>
<script setup lang="ts">

import type { AccidentItem } from '../../dtos/AccidentItem.dto';
import { useRouter } from "vue-router";

defineProps<{ row: AccidentItem}>();
const emits = defineEmits(['deleteSinistro', 'atualizaSinistro', 'cancelarSinistro']);
const router = useRouter();

/**
 * 
 * Emite a função para excluir um sinistro
 * 
 * @return {void}
 */
function deleteSinistro() {    
    emits('deleteSinistro');
}

/**
 * 
 * Emite a função para cancelar um sinistro
 * 
 * @return {void}
 */
function cancelarSinistro() {
    emits('cancelarSinistro')
}

/**
 * 
 * Emite a função para atualizar um sinistro
 * 
 * @return {void}
 */
function atualizaSinistro() {
    emits('atualizaSinistro');
}

/**
 * 
 * Redireciona para a tela de visualização do sinistro
 * 
 * @return {void}
 */
function visualizarSinistro(id: number) {
    router.push({
        name: 'visualizarSinistro',
        params: {
            id
        }
    })
}

/**
 * 
 * Valida se é permitido alterar o sinistro
 * 
 * @return {void}
 */
function validaPermiteAtualizar(status: string) {
    return status != 'CANCELADO';
}

/**
 * 
 * Valida se é permitido cancelar o sinistro
 * 
 * @param {string} status
 */
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

/**
 * 
 * Redireciona para a tela de edição de sinistro
 * 
 * @param {number} id 
 */
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
    grid-template-columns: 0.5fr 0.8fr 0.6fr 0.7fr 0.5fr 0.7fr 0.7fr;
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
    text-transform: capitalize;
}

.actions {
    gap: 10px;    
    button {            
        display: flex;
        align-items: center;
        //width: 35%;
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
        background-color: #e5c122c3;
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