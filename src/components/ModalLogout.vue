<template>
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
    loading.value = false
}
</script>
<style scoped lang="scss">
@import "../assets/__variables.scss";
h1 {
    font-size: 28px;
    font-weight: 600;
    color: $danger;
    margin-bottom: 10%;
}
.actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
</style>