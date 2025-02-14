<template>
    <div id="modalAtualizaStatus">
        <Modal>
            <h1>Atualizar status</h1>
            <h5>Selecione o novo status do sinistro:</h5>
            <select name="status" id="new_status" v-model="sinistro.status">
                <option value="ABERTO">Aberto</option>
                <option value="REPARO">Reparo</option>
                <option value="RETORNO_REPARO">Retorno reparo</option>  
                <option value="INDENIZADO">Indenizado</option>
                <option value="FECHADO">Fechado</option>
                <option v-if="sinistro.status != 'FECHADO' && sinistro.status != 'INDENIZADO'" value="CANCELADO">Cancelado</option>
            </select>
            <div class="comment_box">
                <h5>Observações<strong>*</strong></h5>
                <textarea name="comment" id="comment" placeholder="Digite a atualização" v-model="sinistro.descricao"></textarea>
                <p id="mensagem_erro"></p>
            </div>
            <div class="actions"> 
                <button id="confirmar" @click="atualizaSinistro()" class="btn btn-success">Confirmar</button>
                <button id="cancelar" @click="fechar()" class="btn btn-danger">Cancelar</button>
            </div>            
        </Modal>
    </div>
</template>
<script lang="ts" setup>
import useSinistroStore from '@/stores/SinistroStore';
import { inject } from 'vue';
//import Modal from './baseComponents/Modal.vue';

const reload: any = inject('reload');
const sinistroStore = useSinistroStore();

const props = defineProps<{ sinistro: any}>()
const store  = useSinistroStore();

/**
 * Realiza a requisição para atualizar o status do sinistro
 */
async function atualizaSinistro() {    
    if(!props.sinistro.descricao) {
        return document.getElementById('mensagem_erro').innerText = 'O campo observações é obrigatório!';
    }

    await sinistroStore.updateStatus(props.sinistro);        
    await store.getSquareData('VEICULAR');
    await store.getSquareData('RESIDENCIAL');
    await store.getSquareData('VIDA');
    await store.getSquareData('EMPRESARIAL');
    await store.getSquareData('VIAGEM');
    reload();
    fechar();    
}

/**
 * Fecha modal de atualização de status do sinsitro e reseta o valor da mensagem de erro
 */
function fechar() {
    const modal = document.getElementById('modalAtualizaStatus');
    
    if(modal) {
        document.getElementById('mensagem_erro').innerText = '';
        modal.style.display = 'none';
    }
}
 
</script>
<style lang="scss" scoped>
@import '../assets/_variables';
@import '../assets/inputbox';
@import '../assets/textarea';

#modalAtualizaStatus {           
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

    #mensagem_erro {
        color: red;
        font-style: italic;
    }

}
</style>