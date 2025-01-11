<template>
    <Modal>
        <h1>{{ text }}</h1>
        <div class="actions">
            <button id="confirmar" @click="confirmar()" class="btn btn-success">Confirmar</button>
            <button id="cancelar" @click="fecharModal()" class="btn btn-danger">Cancelar</button>
        </div>      
    </Modal>
</template>
<script lang="ts" setup>
import Modal from './Modal.vue';

const props = defineProps<{
    text: string,
}>();

const emits = defineEmits(['confirmar', 'fecharModal'])

function confirmar() {
    emits('confirmar');
}

function fecharModal(){
    emits('fecharModal')
}
</script>

<style lang="scss" scoped>
@import '../../assets/_variables';

    h1 {
        font-weight: 600;
        color: $primary;
    }

    h1 {
        margin-bottom: 1rem;
    }    
    
    #confirmar, #cancelar {
        color: white;
        font-weight: bold;
        border: none;
    }            

    .actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        width: 60%;
        margin: auto;
    }
</style>