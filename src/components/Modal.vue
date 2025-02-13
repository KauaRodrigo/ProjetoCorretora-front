<template>
    <Overlay />
    <div class="modal-wrapper">
        <div class="modal-box">        
            <h1>{{ texto }}</h1>
            <div class="acoes">
                <button id="confirmar" @click="confirmar()" class="btn btn-success">Confirmar</button>
                <button id="cancelar" @click="cancelar()" class="btn btn-danger">Cancelar</button>
            </div>    
        </div>
    </div>
</template>
<script lang="ts" setup>
import Overlay from './baseComponents/Overlay.vue';

const props = defineProps<{
    texto: string,
}>();

const emits = defineEmits(['confirmar', 'cancelar'])

function confirmar() {
    emits('confirmar');
}

function cancelar(){
    emits('cancelar')
}
</script>

<style lang="scss" scoped>
@import '../assets/_variables';

    .modal-wrapper {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-box {
        width: 90%;
        max-width: 500px;
        border-radius: 10px;
        padding: 2%;
        background-color: white;
        box-shadow: 1px 1px 10px gray;        
    }

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

    .acoes {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        width: 60%;
        margin: auto;
    }
</style>