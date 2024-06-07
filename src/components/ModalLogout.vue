<template>
    <Modal height="400" width="500">
        <i class="fas fa-car-side"></i>
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
h1 {
    font-size: 28px;
    font-weight: 600;
    color: $primary;
    margin-bottom: 10%;
    max-width: 70%;
    margin: 0 auto;
    text-align: center;
}
.actions {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    transform: translate(0%, 12rem);
    gap: 20px;
    
    button {
        height: 3rem;
        padding: 0 20px;
        font-weight: bold;
        box-shadow: rgba(0,0,0,0.5) 0px 2px 8px;
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