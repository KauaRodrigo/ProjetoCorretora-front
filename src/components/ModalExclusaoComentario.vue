<template>
    <Modal>
        <h1>Tem certeza que deseja excluir está atualização?</h1>
        <div class="actions"> 
            <button id="confirmar" @click="excluirComentario()" class="btn btn-success">Confirmar</button>
            <button id="cancelar" @click="close()" class="btn btn-danger">Cancelar</button>
        </div>      
    </Modal>
</template>
<script lang="ts" setup>
import Modal from './baseComponents/Modal.vue';

const emits = defineEmits(['excluirComentario', 'closeModal'])

/**
 * Faz a requisição para excluir um comentário
 */
function excluirComentario() {
    emits('excluirComentario');   
}

/**
 * Fecha o modal de exclusão de comentário
 */
function close() {
    emits('closeModal')   
}

</script>
<style lang="scss" scoped>
@import "../assets/_variables.scss";
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