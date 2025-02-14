<template>
    <div> 
        <Page>
            <div class="container">                
                <Form @submit.prevent="submit" :formData="formData">
                    <div class="linha d-flex">   
                        <div style="width: 50%; margin-right: 25px;">
                            <label for="numeroSinistro">Número do sinistro</label>
                            <input :disabled="isVisualizar" type="text" name="numeroSinistro" @keyup="(event) => {formData.numeroSinistro = UtilsCampos.removeAlfaNumericos(event.target.value)}" v-model="formData.numeroSinistro" maxlength="15">
                        </div>
                        <div style="width: 48%">
                            <label>Número da apólice <strong>*</strong></label>
                            <input :disabled="isVisualizar" name="apolice" placeholder="" type="text" v-model="formData.numeroApolice" maxlength="15"/>
                        </div>
                    </div>
                    <div class="linha d-flex">
                        <div style="width: 50%; margin-right: 25px;">
                            <label>Data da ocorrência</label>
                            <input :disabled="isVisualizar" type="date" v-model="formData.dataOcorrencia">
                        </div>
                        <div style="width: 25%;  position: relative;">
                            <label>Seguradora</label>
                            <input @keyup="buscaSeguradoras()" :disabled="isVisualizar" placeholder="" type="text" v-model="formData.seguradora"/>
                            <div v-if="aSeguradoras && aSeguradoras.length > 0 && !oSeguradoraSelecionada" class="resultadosSeguradora">
                                <span @click="selecionarSeguradora(oSeguradora)" v-for="(oSeguradora, iIndex) of aSeguradoras" :cliente="oSeguradora.id">{{ oSeguradora.nome }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="linha d-flex">
                        <div style="width: 20%; margin-right: 25px;">
                            <label>Tipo <strong>*</strong></label>
                            <select :disabled="isVisualizar" name="tipo" v-model="formData.tipo">
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
                            <input :disabled="isVisualizar" @keyup="buscaClientes()" placeholder="" type="text" v-model="formData.nome"/>
                            <div v-if="aClientes && aClientes.length > 0 && !clienteSelecionado" class="resultadosClientes">
                                <span @click="selecionarCliente(oCliente)" v-for="(oCliente, iIndex) of aClientes" :cliente="oCliente.id">{{ oCliente.name }}</span>
                            </div>
                        </div>
                        <div v-if="formData.tipo == 'VEICULAR'" style="width: 25%">
                            <label>Placa <strong>*</strong></label>
                            <input :disabled="isVisualizar" placeholder="" type="text" v-model="formData.placa"/>
                        </div>
                    </div>     
                    <div class="linha d-flex">
                        <div id="observacoesContainer">
                            <label for="observacoes">Observações</label>
                            <textarea :disabled="isVisualizar" name="observacoes" v-model="formData.observacoes" placeHolder=""></textarea>
                        </div>
                        <div style="width: 25%">
                            <label for="evento">Evento</label>
                            <input :disabled="isVisualizar" type="text" name="evento" v-model="formData.evento">
                        </div>
                    </div>
                    <div v-if="formData.fotos || isCadastrar" id="fotos">                            
                        <img @click="selecionarImagem(value, index)" v-if="formData.fotos" v-for="(value, index) of formData.fotos" :key="index" :src="'data:image/png;base64,'+value" alt="">                                
                        <div v-if="isCadastrar" class="upload-wrapper">
                            <label for="input-file" class="label-file"><i class="fa-solid fa-plus"></i></label>
                            <input type="file" multiple @change="(event) => setFile(event)" id="input-file">    
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
                            <button type="submit" id="registerCustomer">
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
            <ModalVisualizarImagem @excluirImagem="excluirImagem()" @fechar="() => visualizarImagem = false" v-if="visualizarImagem" :img="imagemSelecionada"/>
        </Page>      
    </div>
</template>

<script setup>    
import { inject, onMounted, ref } from "vue";
import useSinistroStore from "@/stores/SinistroStore";
import Comment from "../components/accident/Comment.vue" 
import { useRoute } from "vue-router";
import Page from "@/components/baseComponents/Page.vue";
import { format } from "date-fns";
import { UtilsCampos } from "@/utils/UtilsCampos";
import ModalVisualizarImagem from "@/components/ModalVisualizarImagem.vue";
import Modal from "@/components/Modal.vue";

const emits = defineEmits(['openModalLogout'])

const route = useRoute();
const sinistroStore = useSinistroStore();

const openAlert = inject('openAlert');
const isCadastrar = ref(false)
const isVisualizar = ref(false)
const isEditar = ref(false)
const isDeletar = ref(false)
const reallyDeletar = ref(false)
const newComment = ref({
    content: ''
})
const comments = ref({
    rows: []    
})
const indiceImagem           = ref();
const visualizarImagem       = ref(false);
const imagemSelecionada      = ref('');
const aClientes              = ref();
const clienteSelecionado     = ref(false);

const aSeguradoras           = ref();
const oSeguradoraSelecionada = ref(false);

const formData = ref({
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
});

const payload = new FormData();

const showModal = ref(false);

async function buscaClientes() {
    clienteSelecionado.value = false;

    if(formData.value.nome.length >= 3) {
        aClientes.value = await sinistroStore.getClientesPorNome(formData.value.nome);
        console.log(aClientes.value);
        return;   
    }

    aClientes.value = [];    
}

function selecionarCliente(oCliente) {
    formData.value.nome = oCliente.name;
    formData.value.seguradora = oCliente.seguradora.nome

    clienteSelecionado.value = true;
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

function excluirImagem() {
    formData.value.fotos.splice(indiceImagem.value, 1);
}

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
    document.getElementById('registerCustomer')?.setAttribute('disabled', 'true');

    if(validaData(new Date(formData.value.dataOcorrencia), new Date(format(new Date(), 'yyyy-MM-dd'))) > 0) {
        openAlert('', 'Aviso', 'A data da ocorrência não pode ser maior que a data atual!')        
        document.getElementById('registerCustomer')?.removeAttribute('disabled');
        return
    }

    if(!formData.value.nome || !formData.value.tipo || !formData.value.numeroApolice || (formData.value.tipo == 'VEICULAR' && !formData.value.placa)){
        openAlert('', 'Informações pendentes', 'Você deve preencher todos os campos obrigatórios!');
        document.getElementById('registerCustomer')?.removeAttribute('disabled');
        return;
    }
    if(isCadastrar.value) {
        let aCampos = Object.entries(formData.value)        
        for(let oCampo of aCampos) {          
            if(oCampo[0] != 'fotos') {
                payload.append(oCampo[0], `${oCampo[1]}`)
            }              
        }        
        return await sinistroStore.registrarSinistro(payload).then(() => {
            openAlert('accidentSearch', 'Sinistro Cadastrado', 'Seu sinistro foi registrado com sucesso, você será redirecionado em 5 segundos!');            
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

function validaData(sDataInicial, sDataFinal) {
    const milisegundos = sDataInicial - sDataFinal;
    return (milisegundos / (1000 * 60 * 60 * 24))
}

function setFile(event) {    
    for(const oFoto of event.target.files) {
        previewImage(oFoto);        
        payload.append('files', oFoto)
    }
}

function previewImage(oFoto) {
    const reader = new FileReader();
        
        reader.onload = function(file) {
            if(file) {
                const base64String = file.target.result.split(',')[1]; // Remover o prefixo data:image/png;base64,
                
                if(base64String) {
                    formData.value.fotos.push(base64String)
                }
            }
        };
        
        reader.onerror = function(e) {
            console.error('Erro ao ler o arquivo:', e);
        };
        
        reader.readAsDataURL(oFoto);
}

function removeCaracteresAlfa(event) {
    const value = event.target.value.replace(/\D+/g, '');    

    formData.value.numeroSinistro = value;
}

async function atualizaComentarios() {
    comments.value = await sinistroStore.getComments(+route.params.id);
}

function selecionarImagem(base64, indice) {
    indiceImagem.value = indice;
    visualizarImagem.value = true;
    imagemSelecionada.value = base64;
}

onMounted(async () => {
    if(route.name == 'accidentRegister') {
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
    openAlert('accidentSearch', 'Sinistro deletado com sucesso!', 'Voltando à lista de vizualização...');
    return sinistroStore.excluirSinistro(+route.params.id)
}

</script>
<style scoped lang="scss">
    @import "../assets/__variables.scss";
    @import "../assets/inputbox";
    @import "../assets/textarea.scss";

    /*.eventoInformacoes {
    .linha div {
        display: flex;
        flex-direction: column;
    }
    

        #observacoesContainer {
            width: 66.5%;
        }
    }*/
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
        width: 2.5%;
        height: 3%;
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

    /*label[for='observacoes'] {
        display: block;
    }*/

    textarea[name='observacoes'] {
        resize: none;
        width: 100%;
        padding: 1%;
    }

    strong{
        color: $secondary;
    }

    .adress-inputs{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
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
        //width: 50%;
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

    /*input[name="cep"] {
        width: 50%;
    }*/

    /*input[name="numero"] {
        width: 25%;
    }*/

    /*input[name="apolice"] {
        width: 100%;
        display: block;
    }*/

    input[type="number"]::-webkit-inner-spin-button, 
    input[type="number"]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        margin: 0; 
    }
    
    input[type="number"] {
        appearance: textfield;
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

    #registerCustomer, #registerComment {
        background-color: $secondary;        
        padding: 0 1%;
        border-radius: 5px;
        height: 45px;
        transition: 0.1s;
        border: none;
        float: right;            
        border: none;        
        margin-top: 5px;
        font-weight: 600;
        font-size: 1rem;
    }
    
    #registerCustomer:disabled, #registerCustomer:disabled:hover {
        background-color: #EEE;
        color: black;
        opacity: 0.3;
    }

    #registerCustomer:hover, #registerComment:hover {
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

</style>