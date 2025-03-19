<template>
    <Page>
        <div class="container">
            <form @submit.prevent="submit" :formData="formData">
                <div class="d-flex">
                    <div class="d-flex p-2 w-50 flex-column">
                        <div>
                            <label>Nome Seguradora</label>
                            <input v-model="formData.nome" class="w-100" type="text">
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
import useSeguradoraStore from '@/stores/SeguradoraStore';
import { inject, onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const openAlert = inject('openAlert');
const router = useRouter();
const route  = useRoute(); 
const formData = ref({
    nome: '',    
});

const seguradoraStore = useSeguradoraStore();

onBeforeMount(async () => {
    formData.value = await getSeguradora(route.params.id);
})

onMounted(() => {    
    setActionsPosition();
    $(window).on('resize', () => setActionsPosition());
})

function setActionsPosition() {    
    let oActions = $('#actions');
    let oPage    = $('.page');
    
    oPage.css('height', $('#app').height() - 87);
    oActions.css('margin-top', oPage.height() - 200);
}

function back() {
    router.back();
}

function getSeguradora(iId: number) {
    return seguradoraStore.buscarSeguradoraById(iId);

}

async function submit() {
    if(await seguradoraStore.atualizarSeguradora(route.params.id, formData.value)) {
        return openAlert('buscarSeguradoras', 'Registro alterado', 'Seguradora alterada com sucesso!');        
    };
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
