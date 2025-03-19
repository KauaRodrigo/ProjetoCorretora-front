<template>
    <div class="item">
        <span style="text-align: center;">{{ oCliente.id }}</span>
        <span>{{ oCliente.name }}</span>
        <span :style="{ 'font-style': !oCliente.cpf ? 'italic' : 'normal' }">{{ UtilsCampos.mascaraCpf(oCliente.cpf) ?? 'Sem informação' }}</span>
        <span :style="{ 'font-style': !oCliente.telefone ? 'italic' : 'normal' }">{{ UtilsCampos.mascaraTelefone(oCliente.telefone) ?? 'Sem informação' }}</span>
        <span :style="{ 'font-style': !oCliente.nome ? 'italic' : 'normal' }">{{ oCliente.nome ?? 'Sem informação' }}</span>
        <span class="d-flex justify-content-end acoes">
            <button class="btn btn-info" @click="visualizar(oCliente.id)" title="Visualizar">
                <i class="fa fa-search"></i>
            </button>
            <button :disabled="!oCliente.status" class="btn btn-warning" title="Alterar" @click="alterar(oCliente.id)">
                <i class="fa fa-pencil"></i>
            </button>
            <button class="btn" :class="{'btn-success': oCliente.status === 0,'btn-danger': oCliente.status === 1}" @click="show" title="Ativar/Inativar">
                <i class="fa" :class="{'fa-check': oCliente.status === 0,'fa-times': oCliente.status === 1}"></i>
            </button>
        </span>
    </div>
    <ModalConfirmaAtivarInativarCliente v-if="showModal" @close="show()" :oCliente="oCliente" :bAtivo="oCliente.status" />
</template>
<script lang="ts" setup>
import { UtilsCampos } from '@/utils/UtilsCampos';
import { useRouter } from 'vue-router';
import ModalConfirmaAtivarInativarCliente from '../modais/ModalConfirmaAtivarInativarCliente.vue';
import { inject, ref } from 'vue';

defineProps<{ oCliente: any }>()

const router = useRouter();
const showModal = ref(false);

function visualizar(iId: number) {
    router.push({
        name: 'visualizarCliente',
        params: {
            id: iId
        }
    })
}

function show() {
    showModal.value = !showModal.value;    
}

function alterar(iId: number) {
    router.push({
        name: 'alterarCliente',
        params: {
            id: iId
        }
    })
}

</script>
<style lang="scss" scoped>
.item {
    padding: 0.5%;
    display: grid;    
    background-color: #e2e2e2;    
    text-decoration: none;
    align-items: center;
    color: black;    
    grid-template-columns: 0.3fr 0.8fr 0.6fr 0.7fr 0.5fr 0.7fr;
}

.item:nth-child(even) {
    background-color: #f1f1f1;
}

#modalConfirmaAtivarInativarCliente {
    display: none;
}

span {
    font-size: 16px;
    padding: 2%;
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
