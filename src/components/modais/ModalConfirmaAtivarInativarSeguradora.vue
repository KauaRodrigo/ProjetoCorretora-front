<template>
    <Modal v-if="oSeguradora" id="modalConfirmaAtivarInativarSeguradora" :customStyle="bAtivo ? 'max-width: 600px !important; color: red' : ''">
        <div>
            <h1>Deseja {{ bAtivo == 1 ? 'inativar' : 'ativar' }} a seguradora</h1>
            <h1>{{ oSeguradora.id }} - {{ oSeguradora.nome }}?</h1>
            <p style="text-align: left;" v-if="bAtivo">Os clientes vinculados a essa seguradora também serão inativados</p>
        </div>
        <div class="actions">
            <button class="btn w-25 btn-success" @click="confirmar">Sim</button>
            <button class="btn w-25 btn-danger" @click="close">Não</button>
        </div>
    </Modal>    
</template>

<script lang="ts" setup>
import useClienteStore from '@/stores/ClienteStore';
import Modal from '../baseComponents/Modal.vue';
import { inject } from 'vue';
import useSeguradoraStore from '@/stores/SeguradoraStore';
const props = defineProps<{ oSeguradora: any, bAtivo: any }>();
const emits = defineEmits(['close']);

const reload = inject('reload');
const seguradoraStore = useSeguradoraStore();

function close() {
    emits('close');
}

async function buscaClientesAtivosSeguradora() {
    const clientesAtivos = await seguradoraStore.buscaClientesAtivosSeguradora(props.oSeguradora.id);
    return clientesAtivos;
}

async function confirmar() {
    await seguradoraStore.ativarInativarSeguradora(props.oSeguradora.id);
    await reload();
    return close();
}
</script>

<style lang="scss" scoped>

#modalConfirmaAtivarInativarSeguradora {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;    

    div {
        display: flex;
        text-align: center; 
        align-items: center;
        justify-content: center;
        flex-direction: column;

        h1 {
            margin: 5px 0;
        }
    }

    .actions {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
        flex-direction: row;
    }
}

.custom-modal {    
    max-width: 1000px !important;
}

</style>