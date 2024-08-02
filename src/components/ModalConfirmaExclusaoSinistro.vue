<template>
    <div id="modalExclusaoSinistro">
        <Modal height="250" width="500">
            <h1>Tem Certeza?</h1>
            <h5>Deseja marcar o sinistro {{ sinistro }} como <strong>'Indenizado/Fechado'</strong></h5>
            <div class="actions"> 
                <button id="confirmar" @click="deleteRegister()" class="btn">Confirmar</button>
                <button id="cancelar" @click="close()" class="btn">Cancelar</button>
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

const props = defineProps<{ sinistro: number}>()

async function deleteRegister() {
    await sinistroStore.deleteAccident(props.sinistro);    
    reload();
    close();
}

function close() {
    const modal = document.getElementById('modalExclusaoSinistro');
    
    if(modal) {
        modal.style.display = 'none';
    }

}

</script>
<style lang="scss" scoped>
@import "../assets/__variables.scss";
#modalExclusaoSinistro {
    text-align: center;
    display: none;

    h1 {
        font-weight: 600;
        color: $primary;
    }

    h1, h5 {
        margin-bottom: 1rem;
    }    

    #confirmar, #cancelar {
        color: white;                        
        transition: all 0.5s;
        font-weight: bold;
    }
    
    #confirmar:hover, #cancelar:hover {
        transition: all 0.5s;   
    }

    #confirmar {
        background: $tertiary;
    }    

    #confirmar:hover {
        background-color: $primary;
    }

    #cancelar {
        background-color: rgb(252, 64, 64);          
    }
    
    #cancelar:hover {
        background-color: darkred;
    }

    .actions {        
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        width: 60%;
        margin: auto;
    }

}
</style>