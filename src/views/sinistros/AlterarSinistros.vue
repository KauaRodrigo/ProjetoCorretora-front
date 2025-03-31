<template>
    <div> 
        <Page>
            <div class="container">                
                <Form @submit.prevent="submit" :formData="formData">
                    <div class="linha d-flex">   
                        <div style="width: 50%; margin-right: 25px;">
                            <label for="numeroSinistro">Número do sinistro</label>
                            <input id="numeroSinistro" type="text" name="numeroSinistro" @keyup="(event) => {formData.numeroSinistro = UtilsCampos.removeAlfaNumericos(event.target.value)}" v-model="formData.numeroSinistro" maxlength="15">
                        </div>
                        <div style="width: 48%">
                            <label>Número da apólice <strong>*</strong></label>
                            <input id="numeroApolice" name="apolice" placeholder="" type="text" v-model="formData.numeroApolice" maxlength="15"/>
                        </div>
                    </div>
                    <div class="linha d-flex">
                        <div style="width: 50%; margin-right: 25px;">
                            <label>Data da ocorrência</label>
                            <input id="dataOcorrencia" type="date" v-model="formData.dataOcorrencia">
                        </div>
                        <div style="width: 25%;  position: relative;">
                            <label>Seguradora</label>                            
                            <select name="seguradora" id="seguradoras" @change="buscarClientes()" v-model="formData.seguradoraId">
                                <option selected value="">Selecione</option>
                                <option v-for="(oSeguradora, iIndex) of aSeguradoras?.rows" v-bind:key="iIndex" :value="oSeguradora.id">{{ oSeguradora.nome }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="linha d-flex">
                        <div style="width: 20%; margin-right: 25px;">
                            <label>Tipo <strong>*</strong></label>
                            <select id="tipoSinistro" name="tipo" v-model="formData.tipo">
                                <option value="">Selecione</option>
                                <option value="VEICULAR">Veicular</option>
                                <option value="VIAGEM">Viagem</option>
                                <option value="VIDA">Vida</option>
                                <option value="RESIDENCIAL">Residencial</option>
                                <option value="EMPRESARIAL">Empresarial</option>
                            </select>
                        </div>
                        <div style="width: 28%">                                    
                            <label for="terceiro" class="switch">
                                <h1>Terceiros Envolvidos</h1>
                                <input type="checkbox" v-model="formData.terceiro" name="terceiro" id="terceiro">
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div v-if="formData.terceiro" id="nomeTerceiroContainer">
                            <label>Nome do Terceiro <strong>*</strong></label>
                            <input type="text" v-model="formData.nomeTerceiro" name="nomeTerceiro" id="nomeTerceiro">
                        </div>
                    </div>
                    <div class="linha d-flex">
                        <div style="width: 50%; margin-right: 25px; position: relative;">
                            <label>Cliente <strong>*</strong></label>
                            <select name="cliente" id="cliente" v-model="formData.clienteId">
                                <option value="undefined">Selecione</option>
                                <option v-for="(oCliente, iIndex) of aClientes?.rows" v-bind:key="iIndex" :value="oCliente.id">{{ oCliente.name }}</option>
                            </select>                            
                        </div>
                        <div v-if="formData.tipo == 'VEICULAR'" style="width: 25%">
                            <label>Placa <strong>*</strong></label>
                            <input id="placa" placeholder="" type="text" v-model="formData.placa"/>
                        </div>
                    </div>     
                    <div class="linha d-flex">
                        <div id="observacoesContainer">
                            <label for="observacoes">Observações</label>
                            <textarea id="observacoes" name="observacoes" v-model="formData.observacoes" placeHolder=""></textarea>
                        </div>
                        <div style="width: 25%">
                            <label for="evento">Evento</label>
                            <input id="evento" type="text" name="evento" v-model="formData.evento">
                        </div>
                    </div>                    
                    <div class="actions">                                                    
                        <button type="submit" id="confirmar" class="btn btn-success">Confirmar edições</button>                                                    
                        <button type="button" class="btn btn-danger" @click="back()">Cancelar</button>
                    </div>
                </Form>
            </div>
        </Page>      
    </div>
</template>

<script setup>    
import { inject, onMounted, ref } from "vue";
import useSinistroStore from "@/stores/SinistroStore";
import { useRoute, useRouter } from "vue-router";
import Page from "@/components/baseComponents/Page.vue";
import { format } from "date-fns";
import { UtilsCampos } from "@/utils/UtilsCampos";
import { Sinistros } from "@/classe/sinistros";
import Modal from "@/components/Modal.vue";
import Comment from "@/components/sinistros/Comment.vue";
import useSeguradoraStore from "@/stores/SeguradoraStore";

const emits = defineEmits(['openModalLogout'])

const route = useRoute();
const router = useRouter();

const sinistroStore = useSinistroStore();
const seguradoraStore = useSeguradoraStore();   

const openAlert = inject('openAlert');

const aClientes              = ref();
const aSeguradoras           = ref();

const formData = ref({
    numeroSinistro: '',
    nome: '',
    tipo: '',
    terceiro: false,
    placa: '',        
    numeroApolice: '',        
    seguradoraId: '',
    evento: '',
    observacoes: '',
    dataOcorrencia: format(new Date(), 'yyyy-MM-dd'),    
    nomeTerceiro: ''
});

const showModal = ref(false);

async function addComment() {
    if(newComment.value.content == ""){        
        openAlert('', 'Comentário vazio', 'Adicione texto ao seu comentário!');
    }else{
        await sinistroStore.addComment(+route.params.id, newComment.value.content);
        comments.value = await sinistroStore.getComments(+route.params.id);
        newComment.value.content = '';
    }
}

async function submit() {
    console.log(formData.value);
    const sMensagem = Sinistros.getInstance().validaCamposConfirmar();    

    if(sMensagem) {
        openAlert('', 'Aviso', sMensagem);
        return;
    }
    
    return sinistroStore.editarDadosSinistro(+route.params.id, formData.value).then(() => {
        openAlert('', 'Sinistro alterado com sucesso!', 'Alterado para o modo de visualização.');
    })    
}


onMounted(async () => {
    Sinistros.getInstance().processaDadosOnLoad();    
    
    formData.value = await sinistroStore.getAccidentSingle(+route.params.id);        

    aSeguradoras.value = await sinistroStore.getSeguradoras();
    seguradoraStore.buscarClientesAtivosSeguradora(formData.value.seguradoraId).then((oClientes) => {
        aClientes.value = oClientes;
    });
})

function back() {
    router.back();
}

function buscarClientes() {
    if(!formData.value.seguradoraId) {
        return;
    }

    seguradoraStore.buscarClientesAtivosSeguradora(formData.value.seguradoraId).then((oClientes) => {
        aClientes.value = oClientes;
    });
}

</script>
<style scoped lang="scss">
    @import "/src/assets/__variables.scss";
    @import "/src/assets/inputbox";
    @import "/src/assets/textarea.scss";

    #observacoesContainer {
        margin-right: 25px;
        width: 50%;
    }    

    .switch {        
        display: inline-block;        
        height: 34px;
    }        

    .switch input {
        display: none !important;
    }

    .switch input:disabled {
        cursor: none;
    }        
    .switch .slider {        
        cursor: pointer;
        display: inline-block;
        position: absolute;
        background-color: rgb(234, 234, 234);
        width: 48px;
        height: 28px;
        border-radius: 20px;        
        margin-top: 10px;
    }

    .switch .slider:before {
        content: "";
        position: absolute;            
        height: 21px;
        width: 21px;  
        left: 3px;
        bottom: 4px;
        background-color: white;
        transition: .3s;
        border-radius: 50%;
    }

    input:checked + .slider {
        background-color: $secondary;
    }

    input:focus + .slider {
        box-shadow: 0 0 1px $secondary;
    }

    input:checked + .slider:before {
        transform: translateX(100%);
    }
 
    .container {        
        padding-bottom: 4rem;
    }    

    #addComment {
        width: 50%;
        height: auto;
        padding: 2%;
        background-color: #f0f0f0;
        border-radius: 10px;
        margin-top: 20px;

        #comment {
            padding: 2%;
            width: 100%;
            resize: none;            
        }
    }

    .comments {
        margin-top: 30px;
        color: $primary;
        h1 {
            font-size: 1.8rem;
        }
    }

    h1{
        color: $primary;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 0;
    }    

    textarea[name='observacoes'] {
        resize: none;
        width: 100%;
        padding: 1%;
    }

    strong{
        color: $secondary;
    }    

    .adtional-info {
        display: flex;
        width: 100%;
        gap: 2rem;

        select {
            width: 100%;
        }

        input[name="terceiro"] {
            display: block;
            width: 1rem;
        }
    }

    .secure-info {        
        gap: 2rem;

        input {
            width: 30ch;
        }

        select {
            width: 100%;
        }
    }

    .address-div {
        display: flex;
        gap: 1rem;
        margin: 20px 0;
    }
    

    input[type="number"]::-webkit-inner-spin-button, 
    input[type="number"]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        margin: 0; 
    }
    
    input[type="number"] {
        appearance: textfield;
    }    

    #nomeTerceiroContainer {
        width: 48%;
        margin-left: 25px;
    }

    .actions {
        margin-top: 9rem;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 1em;               
        
        #confirmar:disabled, #confirmar:disabled:hover {
            background-color: #EEE;
            color: black;
            opacity: 0.3;
        }

        button {
            border-radius: 5px;        
            transition: 0.1s;        
            font-weight: 600;
            font-size: 1rem;
        }

        button:hover {
            transition: all 0.2s;            
            color: white;
        }
    }

</style>