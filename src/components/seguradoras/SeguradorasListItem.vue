<template>
    <div class="item">
        <span style="text-align: center;">{{ oSeguradora.id }}</span>
        <span>{{ oSeguradora.nome }}</span>        
        <span class="d-flex justify-content-end acoes">
            <button class="btn btn-info" @click="visualizar(oSeguradora.id)" title="Visualizar">
                <i class="fa fa-search"></i>
            </button>
            <button :disabled="!oSeguradora.status" class="btn btn-warning" title="Alterar" @click="alterar(oSeguradora.id)">
                <i class="fa fa-pencil"></i>
            </button>
            <button class="btn" @click="show()" :class="{'btn-success': oSeguradora.status === 0,'btn-danger': oSeguradora.status === 1}" title="Ativar/Inativar">
                <i class="fa" :class="{'fa-check': oSeguradora.status === 0,'fa-times': oSeguradora.status === 1}"></i>
            </button>
        </span>
    </div> 
    <ModalConfirmaAtivarInativarSeguradora v-if="showModal" @close="show()" :bAtivo="oSeguradora.status" :oSeguradora="oSeguradora"></ModalConfirmaAtivarInativarSeguradora>
</template>
<script lang="ts" setup>
import { UtilsCampos } from '@/utils/UtilsCampos';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import ModalConfirmaAtivarInativarSeguradora from '../modais/ModalConfirmaAtivarInativarSeguradora.vue';

defineProps<{ oSeguradora: any }>()

const router = useRouter();
const showModal = ref(false);

function show() {
    showModal.value = !showModal.value;    
}

function visualizar(iId: number) {
    router.push({
        name: 'visualizarSeguradora',
        params: {
            id: iId
        }
    })
}

function alterar(iId: number) {
    router.push({
        name: 'atualizarSeguradora',
        params: {
            id: iId
        }
    })
}

</script>
<style lang="scss" scoped>
.item {    
    display: grid;
    align-items: center;
    background-color: #e2e2e2;    
    text-decoration: none;
    color: black;    
    grid-template-columns: 0.2fr 1fr 1fr;
}

.item:nth-child(even) {
    background-color: #f1f1f1;
}

#modalConfirmaAtivarInativarCliente {
    display: none;
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

.acoes {
    gap: 10px;    
    button {            
        display: flex;
        align-items: center;        
        height: 30px;
        border: none;              
        color: white;
        justify-content: center;  
        border-radius: 5px;    
    }    

    i{
        font-size: 15px;
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
}
</style>
