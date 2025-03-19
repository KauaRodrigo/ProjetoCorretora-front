<template>
    <Page>
        <div class="container">            
            <div v-if="oSeguradora" class="d-flex">
                <div class="d-flex p-2 w-50 flex-column">
                    <div>
                        <label>Nome Seguradora</label>
                        <input disabled v-model="oSeguradora.nome" class="w-100" type="text">
                    </div>
                </div>
            </div>
            <div class="actions" id="actions">                
                <button class="btn btn-primary" @click="back">Voltar</button>
            </div>            
        </div>
    </Page>
</template>
<script setup lang="ts">
import Page from '@/components/baseComponents/Page.vue';
import useSeguradoraStore from '@/stores/SeguradoraStore';
import { onBeforeMount, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route  = useRoute();
const router = useRouter();
const seguradoraStore = useSeguradoraStore();

const oSeguradora = ref();

onBeforeMount(async () => {
    oSeguradora.value = await getSeguradora(route.params.id);    
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

async function getSeguradora(iId: number) {
    return seguradoraStore.buscarSeguradoraById(iId);
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
