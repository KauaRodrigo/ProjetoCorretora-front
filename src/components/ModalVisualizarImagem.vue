<template>    
    <Overlay />
    <div class="modal-wrapper">
        <div class="modal-box">        
            <i @click="fechar()" id="fechar" class="fa fa-xmark"></i>
            <div class="imagem-container">
                <img :src="'data:image/png;base64,'+img" />
            </div>
            <div class="actions">
                <button @click="excluirImagem();" class="btn btn-danger">
                    <i class="bi bi-trash"></i>
                </button>            
            </div>
        </div>
    </div>    
</template>
<script setup lang="ts">
import Overlay from './baseComponents/Overlay.vue';

defineProps<{ img: string }>();
const emits = defineEmits(['fechar', 'excluirImagem']); 

/**
 * Fecha o modal de visualização de imagem
 */
function fechar() {
    emits('fechar');
}

/**
 * Exclui a imagem do sinistro ou retira ela do corpo da requisição de criação ou atualização de sinistro
 */
function excluirImagem() {
    emits('excluirImagem');
}

</script>
<style lang="scss" scoped>

#fechar {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;    
}

.modal-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; 
    display: flex;   
    justify-content: center;
    align-items: center;    
    z-index: 1000;    
}

.modal-box {
    position: relative;  
    max-width: 60%;  
    max-height: 60%;  
    display: flex;
    flex-direction: column;    
    justify-content: center;        
    padding: 2%;
    border-radius: 20px;
}

img {
    max-width: 60%;
    margin-bottom: 25px;
}

.imagem-container {
    width: 100%;
    height: 93%;
}


</style>