<template>
    <Page>
        <div class="container">
            <form @submit.prevent="submit" :formData="formData">
                <div v-if="formData" class="d-flex">
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
                            <input disabled class="w-100" placeholder="" type="text" v-model="formData.seguradora"/>
                        </div>
                    </div>
                    <div class="d-flex p-2 w-50 flex-column">
                        <div>
                            <label>CPF</label>
                            <input @blur="trataCampoCpf()" v-model="formData.cpf" type="text">
                        </div>
                        <div>
                            <label>Telefone/Celular</label>
                            <input @blur="trataCampoTelefone()" v-model="formData.telefone" type="text">
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
<script setup lang="ts">
import Page from '@/components/baseComponents/Page.vue';
import useClienteStore from '@/stores/ClienteStore';
import { UtilsCampos } from '@/utils/UtilsCampos';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const formData = ref({
    name: '',
    telefone: '',
    dataNascimento: '',
    cpf: '',
    seguradora: ''
});

const clienteStore = useClienteStore();

onBeforeMount(() => {
    formData.value = getCliente(route.params.id);
})

onMounted(() => {    
    setActionsPosition();
    $(window).on('resize', () => setActionsPosition());    
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

async function getCliente(iId: number) {
    formData.value = await clienteStore.buscarClienteById(iId);
    formData.value.cpf = UtilsCampos.mascaraCpf(formData.value.cpf);
    formData.value.telefone = UtilsCampos.mascaraTelefone(formData.value.telefone);
}

async function submit() {
    let payload = {
        ...formData.value
    }

    payload.cpf      = UtilsCampos.removeAlfaNumericos(payload.cpf);
    payload.telefone = UtilsCampos.removeAlfaNumericos(payload.telefone);

    return clienteStore.atualizarCliente(route.params.id, payload);
}

function trataCampoCpf() {
    formData.value.cpf = UtilsCampos.mascaraCpf(formData.value.sCpf);
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
</style>
