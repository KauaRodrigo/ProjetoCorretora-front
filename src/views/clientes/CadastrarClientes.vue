<template>
    <Page   >
        <div class="container">
            <form @submit.prevent="submit" :formData="formData">
                <div class="d-flex">
                    <div class="d-flex p-2 w-50 flex-column">
                        <div>
                            <label>Nome Cliente</label>
                            <input v-model="formData.name" class="w-100" type="text">
                        </div>
                        <div>
                            <label>Data de Nascimento</label>
                            <input v-model="formData.dataNascimento" type="date">
                        </div>
                        <div style="width: 50%;  position: relative;">
                            <label>Seguradora</label>
                            <input class="w-100" @keyup="buscaSeguradoras()" placeholder="" type="text" v-model="formData.seguradora"/>
                            <div v-if="aSeguradoras && aSeguradoras.length > 0 && !oSeguradoraSelecionada" class="resultadosSeguradora">
                                <span @click="selecionarSeguradora(oSeguradora)" v-for="(oSeguradora, iIndex) of aSeguradoras" :cliente="oSeguradora.id">{{ oSeguradora.nome }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex p-2 w-50 flex-column">
                        <div>
                            <label>CPF</label>
                            <input v-model="formData.cpf" type="text">
                        </div>
                        <div>
                            <label>Telefone/Celular</label>
                            <input v-model="formData.telefone" type="text">
                        </div>
                    </div>
                </div>
                <div class="actions" id="actions">
                    <button type="submit" class="btn btn-success">Confirmar</button>
                    <button class="btn btn-danger">Cancelar</button>
                </div>
            </form>
        </div>
    </Page>
</template>
<script setup>
import Page from '@/components/baseComponents/Page.vue';
import useClienteStore from '@/stores/ClienteStore';
import useSinistroStore from '@/stores/SinistroStore';
import { onMounted, ref } from 'vue';

const aSeguradoras = ref();
const oSeguradoraSelecionada = ref();
const formData = ref({
    name: '',
    telefone: '',
    dataNascimento: '',
    cpf: ''
});

const sinistroStore = useSinistroStore();
const clienteStore = useClienteStore();

onMounted(() => {    
    $(window).on('resize', setActionsPosition());
})

function setActionsPosition() {    
    let oActions = $('#actions');
    let oPage    = $('.page');
    
    oPage.css('height', $('#app').height() - 87);
    oActions.css('margin-top', oPage.height() - 400);
}

async function submit() {
    return clienteStore.cadastrarClientes(formData.value);
}

async function buscaSeguradoras() {
    oSeguradoraSelecionada.value = false;

    if(formData.value.seguradora.length >= 3) {
        aSeguradoras.value = await sinistroStore.getSeguradorasPorNome(formData.value.seguradora);        
        return;  
    }

    aSeguradoras.value = [];
}

function selecionarSeguradora(oSeguradora) {    
    formData.value.seguradora = oSeguradora.nome

    oSeguradoraSelecionada.value = true;
}

</script>
<style scoped lang="scss">
@import url('../../assets/inputbox.scss');

input {
    width: 50%;
    max-width: 100%;
    display: block;
    margin-bottom: 15px;
}

.actions {          
    height: 40px;
    text-align: right;
    button:nth-child(1) {
        margin-right: 15px;
    }
}

.resultadosSeguradora {
    position: absolute;
    top: 100%;
    max-height: 150px;
    overflow: auto;        
    margin-top: 5px;        
    width: 100%;
    background-color: rgb(240, 240, 240);
    border-radius: 10px;
    padding: 1%;    
    span {
        padding: 0 2%;
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        font-weight: bold;            
        height: 40px;    
        border-radius: 5px;        
        color: black;
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
            background-color: white;
            transition: background-color 0.5s;
        }
    }      
}
</style>
