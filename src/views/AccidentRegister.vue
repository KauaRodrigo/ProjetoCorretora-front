<template>
    <div> 
        <Page>
            <div class="container">                
                <Form @submit.prevent="submit" :formData="formData">
                    <div class="linha d-flex">   
                        <div style="width: 50%; margin-right: 25px;">
                            <label for="numeroSinistro">Número do sinistro</label>
                            <input id="numeroSinistro" :disabled="isVisualizar" type="text" name="numeroSinistro" @keyup="(event) => {formData.numeroSinistro = UtilsCampos.removeAlfaNumericos(event.target.value)}" v-model="formData.numeroSinistro" maxlength="15">
                        </div>
                        <div style="width: 48%">
                            <label>Número da apólice <strong>*</strong></label>
                            <input id="numeroApolice" :disabled="isVisualizar" name="apolice" placeholder="" type="text" v-model="formData.numeroApolice" maxlength="15"/>
                        </div>
                    </div>
                    <div class="linha d-flex">
                        <div style="width: 50%; margin-right: 25px;">
                            <label>Data da ocorrência</label>
                            <input id="dataOcorrencia" :disabled="isVisualizar" type="date" v-model="formData.dataOcorrencia">
                        </div>
                        <div style="width: 25%;  position: relative;">
                            <label>Seguradora</label>                            
                            <select name="seguradora" id="seguradoras" v-model="formData.seguradoraId">
                                <option selected value="">Selecione</option>
                                <option v-for="(oSeguradora, iIndex) of aSeguradoras" :value="oSeguradora.id">{{ oSeguradora.nome }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="linha d-flex">
                        <div style="width: 20%; margin-right: 25px;">
                            <label>Tipo <strong>*</strong></label>
                            <select id="tipoSinistro" :disabled="isVisualizar" name="tipo" v-model="formData.tipo">
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
                                <input :disabled="isVisualizar" type="checkbox" v-model="formData.terceiro" name="terceiro" id="terceiro">
                                <span class="slider"></span>
                            </label>
                        </div>
                        <div v-if="formData.terceiro" id="nomeTerceiroContainer">
                            <label>Nome do Terceiro <strong>*</strong></label>
                            <input :disabled="isVisualizar" type="text" v-model="formData.nomeTerceiro" name="nomeTerceiro" id="nomeTerceiro">
                        </div>
                    </div>
                    <div class="linha d-flex">
                        <div style="width: 50%; margin-right: 25px; position: relative;">
                            <label>Cliente <strong>*</strong></label>
                            <select name="cliente" id="cliente" v-model="formData.clienteId">
                                <option value="undefined">Selecione</option>
                                <option v-for="(oCliente, iIndex) of aClientes" :value="oCliente.id">{{ oCliente.name }}</option>
                            </select>                            
                        </div>
                        <div v-if="formData.tipo == 'VEICULAR'" style="width: 25%">
                            <label>Placa <strong>*</strong></label>
                            <input id="placa" :disabled="isVisualizar" placeholder="" type="text" v-model="formData.placa"/>
                        </div>
                    </div>     
                    <div class="linha d-flex">
                        <div id="observacoesContainer">
                            <label for="observacoes">Observações</label>
                            <textarea :disabled="isVisualizar" id="observacoes" name="observacoes" v-model="formData.observacoes" placeHolder=""></textarea>
                        </div>
                        <div style="width: 25%">
                            <label for="evento">Evento</label>
                            <input id="evento" :disabled="isVisualizar" type="text" name="evento" v-model="formData.evento">
                        </div>
                    </div>                    
                    <div class="row">
                        <div class="col-md">
                            <div v-if="isVisualizar">
                                <button type="submit" id="btnEditarSinistro" class="btn-tst" @click="isEditar=true; isVisualizar=false;">Editar Sinistro</button>
                            </div>
                            <div v-if="isEditar || isDeletar">
                                <button type="submit" id="btnEditarSinistro" class="btn-tst" @click="isEditar=true; isVisualizar=false; isDeletar=false">Confirmar edições</button>
                            </div>
                        </div>
                        <div v-if="isEditar || isDeletar" class="col-md">
                            <button type="submit" id="" class="btn-delete" @click="isEditar=false; isVisualizar=false; isDeletar=true; openModal"><i class="bi bi-trash-fill"></i></button>
                            <Modal v-if="showModal" texto="Você tem certeza que deseja EXCLUIR PERMANENTEMENTE o sinistro atual?" @confirmar="excluirSinistro" @cancelar="closeModal"/>
                        </div>
                        <div v-if="isCadastrar">
                            <button type="submit" id="confirmar">
                                Registrar Sinistro
                            </button>
                        </div>
                    </div>                      
                </Form>            
                <div v-if="isVisualizar" class="comments">
                    <h1>Atualizações</h1>
                    <Comment @refreshComments="atualizaComentarios()" v-for="(comment, index) of comments.rows" :key="index" :comment="comment"/>
                    <div id="addComment">
                        <h2>Adicionar atualização</h2>
                        <textarea placeholder="Descreva a atualização..." name="comment" v-model="newComment.content" id="comment"></textarea>
                        <!--<button class="btn" id="registerComment" @click="addComment()">Adicionar</button>-->
                        <button class="btn-tst" @click="addComment()">Adicionar</button>
                    </div>
                </div>                
            </div>            
        </Page>      
    </div>
</template>

<script setup>    
import { inject, onMounted, ref } from "vue";
import useSinistroStore from "@/stores/SinistroStore";
import Comment from "../components/sinistros/Comment.vue" 
import { useRoute } from "vue-router";
import Page from "@/components/baseComponents/Page.vue";
import { format } from "date-fns";
import { UtilsCampos } from "@/utils/UtilsCampos";
import { Sinistros } from "@/classe/sinistros";
import Modal from "@/components/Modal.vue";

const emits = defineEmits(['openModalLogout'])

const route = useRoute();
const sinistroStore = useSinistroStore();

const openAlert = inject('openAlert');

const isCadastrar = ref(false)
const isVisualizar = ref(false)
const isEditar = ref(false)
const isDeletar = ref(false)
const newComment = ref({
    content: ''
})
const comments = ref({
    rows: []    
})

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
    const sMensagem = Sinistros.getInstance().validaCamposConfirmar();    

    if(sMensagem) {
        openAlert('', 'Aviso', sMensagem);
        return;
    }
    
    if(isCadastrar.value) {        
        return await sinistroStore.registrarSinistro(formData.value).then(() => {
            openAlert('buscarSinistros', 'Sinistro Cadastrado', 'Seu sinistro foi registrado com sucesso, você será redirecionado em 5 segundos!');            
        })
    }

    if(isEditar.value) {
        return sinistroStore.editarDadosSinistro(+route.params.id, formData.value).then(() => {
            openAlert('', 'Sinistro alterado com sucesso!', 'Alterado para o modo de visualização.');
            isEditar.value = false;
            isVisualizar.value = true;
        })
    }

    if(isDeletar.value){
        showModal.value = true
    }
}

async function atualizaComentarios() {
    comments.value = await sinistroStore.getComments(+route.params.id);
}

onMounted(async () => {
    Sinistros.getInstance().processaDadosOnLoad();    

    if(route.name == 'cadastrarSinistro') {
        aSeguradoras.value = await sinistroStore.getSeguradoras();
        aClientes.value = await sinistroStore.getClientes();
        formData.value = {
            numeroSinistro: '',
            nome: '',
            tipo: '',
            terceiro: false,
            placa: '',        
            numeroApolice: '',        
            seguradora: '',
            evento: '',
            observacoes: '',
            dataOcorrencia: format(new Date(), 'yyyy-MM-dd'),
            fotos: [],
            nomeTerceiro: ''
        }
        isCadastrar.value = true                        
        return
    }

    if(route.name == 'visualizarSinistro') {        
        isVisualizar.value = true                
    }    

    if(route.name == 'accidentEdit') {        
        isEditar.value = true                
    }
            
    formData.value = await sinistroStore.getAccidentSingle(+route.params.id);     
    comments.value = await sinistroStore.getComments(+route.params.id);
})

function openModal() {
    showModal.value = true
}

function closeModal() {
    showModal.value = false
}

function excluirSinistro() {
    closeModal()
    openAlert('buscarSinistros', 'Sinistro deletado com sucesso!', 'Voltando à lista de vizualização...');
    return sinistroStore.excluirSinistro(+route.params.id)
}

</script>
<style scoped lang="scss">
    @import "../assets/__variables.scss";
    @import "../assets/inputbox";
    @import "../assets/textarea.scss";

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

    #confirmar, #registerComment {
        background-color: $secondary;        
        padding: 0 1%;
        border-radius: 5px;
        height: 45px;
        transition: 0.1s;
        border: none;        
        border: none;        
        margin-top: 9rem;
        font-weight: 600;
        font-size: 1rem;
    }
    
    #confirmar:disabled, #confirmar:disabled:hover {
        background-color: #EEE;
        color: black;
        opacity: 0.3;
    }

    #confirmar:hover, #registerComment:hover {
        transition: all 0.2s;
        background-color: $secondaryDark;
        color: white;
    }

    #registerComment {
        padding: 2%;            
    }    

    @media screen and (max-width: 620px){

        #addComment{
            width: 100%;
        }
    }
    #nomeTerceiroContainer {
        width: 48%;
        margin-left: 25px;
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

    .resultadosClientes {
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

    #fotos {
        display: flex;
        margin: 2% 0;
        padding: 2%;
        gap: 2rem 2.9rem;
        background-color: $primary;
        justify-content: left;
        border-radius: 10px;
        max-width: 100%;
        flex-wrap: wrap;

        img {
            display: block;            
            width: 17%;
            object-fit: cover;
            background-color: #EEE;
            height: 215px;
            box-shadow: rgba(0,0,0,0.2) 0px 0px 10px;
            border-radius: 5px;            
        }        
    }

    #input-file{
        width: 100px;
	    height: 100px;
        display: none;
        margin: 0;
        padding: 0;
    }

    .upload-wrapper {        
        width: 17%;
        min-width: 150px;
        height: 214.42px;
        display: flex;
        
    }

    .upload-wrapper:hover {
        i {
            transition: all .3s;            
            transition: all .5s;
            transform: scale(1.5);
        }        
    }

    .label-file { 
        margin: 0;               
        width: 100%;
        background-color: rgba(100,100,100,0.7);
        border-radius: 5px;
        display: flex;              
        align-items: center;
        justify-content: center;        
        box-shadow: rgba(0,0,0,0.5) 0px 2px 8px;
        color: white;
        font-weight: 100;                
        transition: all .3s;   
        cursor: pointer;    
        i {
            font-size: 3rem;
            color: white;            
            transition: all .3s;
        }        
    }

    .span-file{
        color: #717171;
        font-size: 14px;
    }

</style>