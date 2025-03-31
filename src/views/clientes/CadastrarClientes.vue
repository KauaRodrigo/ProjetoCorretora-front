<template>
    <Page>
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
                            <select v-if="aSeguradoras" name="seguradora" id="seguradoras" v-model="formData.seguradoraId">
                                <option selected value="">Selecione</option>
                                <option v-for="(oSeguradora, iIndex) of aSeguradoras.rows" v-bind:key="iIndex" :value="oSeguradora.id">{{ oSeguradora.nome }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="d-flex p-2 w-50 flex-column">
                        <div>
                            <label>CPF</label>
                            <input v-model="formData.cpf" @blur="trataCampoCpf()" type="text">
                        </div>
                        <div>
                            <label>Telefone/Celular</label>
                            <input v-model="formData.telefone" @blur="trataCampoTelefone()" type="text">
                        </div>
                    </div>
                </div>
                <div class="actions" id="actions">
                    <button type="submit" class="btn btn-success">Confirmar</button>
                    <button class="btn btn-danger" @click="back">Cancelar</button>
                </div>
            </form>
        </div>
    </Page>
</template>
<script setup>
import Page from '@/components/baseComponents/Page.vue';
import useClienteStore from '@/stores/ClienteStore';
import useSinistroStore from '@/stores/SinistroStore';
import { inject, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UtilsCampos } from '@/utils/UtilsCampos';

const openAlert = inject('openAlert');

const router = useRouter();
const aSeguradoras = ref();
const oSeguradoraSelecionada = ref();
const formData = ref({
    name: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    seguradoraId: ''
});

const sinistroStore = useSinistroStore();
const clienteStore = useClienteStore();

onMounted(async () => {    
    setActionsPosition();
    $(window).on('resize', () => setActionsPosition());

    aSeguradoras.value = await sinistroStore.getSeguradoras();
})

function setActionsPosition() {    
    let oActions = $('#actions');
    let oPage    = $('.page');
    
    oPage.css('height', $('#app').height() - 87);
    oActions.css('margin-top', oPage.height() - 400);
}

function back() {
    router.back();
}

async function submit() {
    formData.value.cpf      = UtilsCampos.removeAlfaNumericos(formData.value.cpf);
    formData.value.telefone = UtilsCampos.removeAlfaNumericos(formData.value.telefone);
    try {
        await clienteStore.cadastrarClientes(formData.value);
        openAlert('buscarClientes', 'Cliente cadastrado com sucesso', 'O registro do cliente foi salvo com sucesso.');
    } catch (error) {
        console.error(error);
        return openAlert('', 'Erro ao cadastrar cliente', 'Ocorreu um erro ao cadastrar o cliente. Tente novamente.');
    }    
}

function trataCampoCpf() {
    formData.value.cpf = UtilsCampos.mascaraCpf(formData.value.cpf);
}

function trataCampoTelefone() {
    formData.value.telefone = UtilsCampos.mascaraTelefone(formData.value.telefone)
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
