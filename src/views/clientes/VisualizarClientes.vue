<template>
    <Page>
        <div class="container">            
            <div v-if="oCliente" class="d-flex">
                <div class="d-flex p-2 w-50 flex-column">
                    <div>
                        <label>Nome Cliente</label>
                        <input disabled v-model="oCliente.name" class="w-100" type="text">
                    </div>
                    <div>
                        <label>Data de Nascimento</label>
                        <input disabled v-model="oCliente.dataNascimento" type="date">
                    </div>
                    <div style="width: 50%;  position: relative;">
                        <label>Seguradora</label>
                        <input disabled class="w-100" type="text" v-model="oCliente.seguradora"/>                        
                    </div>
                </div>
                <div class="d-flex p-2 w-50 flex-column">
                    <div>
                        <label>CPF</label>
                        <input disabled v-model="oCliente.cpf" type="text">
                    </div>
                    <div>
                        <label>Telefone/Celular</label>
                        <input disabled v-model="oCliente.telefone" type="text">
                    </div>
                </div>
            </div>
            <div class="actions" id="actions">                    
                <button class="btn btn-danger" @click="back">Voltar</button>
            </div>            
        </div>
    </Page>
</template>
<script lang="ts" setup>
import Page from '@/components/baseComponents/Page.vue';
import useClienteStore from '@/stores/ClienteStore';
import { UtilsCampos } from '@/utils/UtilsCampos';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const clienteStore = useClienteStore();
const route        = useRoute();
const router       = useRouter();

const oCliente = ref();

onBeforeMount(() => {
    getCliente(route.params.id);
})

onMounted(() => {        
    setActionsPosition();
    $(window).on('resize', () => setActionsPosition());    
})

async function getCliente(iId: number) {
    oCliente.value = await clienteStore.buscarClienteById(route.params.id);
    oCliente.value.cpf = UtilsCampos.mascaraCpf(oCliente.value.cpf);
    oCliente.value.telefone = UtilsCampos.mascaraTelefone(oCliente.value.telefone);
}

function setActionsPosition() {     
    let oActions = $('#actions');
    let oPage    = $('.page');
    
    oPage.css('height', $('#app').height() - 87);
    oActions.css('margin-top', oPage.height() - 400);
}

function back() {
    return router.back();
}

</script>
<style lang="scss" scoped>
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