<template>
    <Modal v-if="oCliente" id="modalConfirmaAtivarInativarCliente">
        <div>
            <h1>Deseja {{ bAtivo == 1 ? 'inativar' : 'ativar' }} o cliente</h1>
            <h1>{{ oCliente.id }} - {{ oCliente.name }}?</h1>
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
const props = defineProps<{ oCliente: any, bAtivo: any }>();
const emits = defineEmits(['close']);

const reload = inject('reload');
const clienteStore = useClienteStore();

function close() {
    emits('close');
}

async function confirmar() {
    await clienteStore.ativarInativarCliente(props.oCliente.id);
    await reload();
    return close();
}
</script>

<style lang="scss" scoped>

#modalConfirmaAtivarInativarCliente {
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

</style>