<template>
    <div id="modalExclusaoSinistro">
        <Modal>
            <h1>Tem certeza que deseja {{ excluindo == true ? 'excluir' : 'cancelar' }} o sinistro {{ sinistro.numeroSinistro }}?</h1>            
            <div class="actions"> 
                <button id="confirmar" @click="deleteRegister()" class="btn btn-success">Confirmar</button>
                <button id="cancelar" @click="close()" class="btn btn-danger">Cancelar</button>
            </div>            
        </Modal>
    </div>
</template>
<script lang="ts" setup>
import useSinistroStore from '@/stores/SinistroStore';
import Modal from './baseComponents/Modal.vue';
import { inject } from 'vue';

const reload: any = inject('reload');
const sinistroStore = useSinistroStore();

const props = defineProps<{ sinistro: any, excluindo: boolean}>()

/**
 * Faz a requisição para excluir o sinistro
 */
async function deleteRegister() {
    if(props.excluindo == false) {
        await sinistroStore.cancelarSinistro(props.sinistro);    
        reload();
        close();
        return;
    }
    await sinistroStore.deleteAccident(props.sinistro);
    reload();
    close();
}

/**
 * Fecha o modal de exclusão de sinistro
 */
function close() {
    const modal = document.getElementById('modalExclusaoSinistro');
    
    if(modal) {
        modal.style.display = 'none';
    }

}

</script>
<style lang="scss" scoped>
@import "../assets/__variables.scss";
@import "../assets/textarea.scss";
@import "../assets/select.scss";

#modalExclusaoSinistro {           
    display: none;              

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
    
    select {        
        margin-bottom: 2rem;
    }

    .comment_box {
        h5 { text-align: left }        
        margin: auto;        
        margin-bottom: 2rem;
        strong{
            color: $secondary;
            margin-left: 1%;
        }
        #comment {
            padding: 2%;
            width: 100%;
        }
    }

    .actions {        
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        width: 60%;
        margin: auto;
    }

    strong {
        color: $secondary;
    }

}
</style>