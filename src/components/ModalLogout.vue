<template>
    <!--<Modal height="200" width="500"> -->
    <Modal>
        <div v-if="!loading">
            <h1>Tem certeza de que deseja sair?</h1>
            <div class="actions">
                <button @click="logout" class="btn btn-success">Sim, sair</button>
                <button @click="emits('closeModal')" class="btn btn-danger">Não, cancelar</button>
            </div>
        </div>
        <Loader v-else big />
    </Modal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Modal from './baseComponents/Modal.vue';
import Loader from './baseComponents/Loader.vue';

const emits = defineEmits(['logout', 'closeModal'])

const loading = ref(false)

function logout() {
    loading.value = true
    emits('logout')
    emits('closeModal')
    loading.value = false
}
</script>
<style scoped lang="scss">
@import "../assets/__variables.scss";

.actions {
    display: flex;
    //align-items: center;
    justify-content: center;
    //position: relative;
    //transform: translate(0%, 1.5rem);
    gap: 20px;
    
    button {
        height: 3rem;
        padding: 0 20px;
        font-weight: bold;
        box-shadow: rgba(0,0,0,0.4) 0px 2px 5px;
    }
}
i {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 10rem;
    z-index: -1;
    opacity: 0.5; /* Ajuste a opacidade conform */  
}
</style>