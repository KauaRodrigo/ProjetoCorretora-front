<template>
    <div> 
        <Page>
            <div class="container">
                <h1 v-if="isCadastrar">Registrar sinistro</h1>
                <Form @submit.prevent="submit" :formData="formData">
                    <div class="row">   
                        <div class="col-md">
                            <div>
                                <label for="numeroSinistro">Número do sinistro</label>
                                <input type="text" name="numeroSinistro" @keyup="(event: any) => {formData.numeroSinistro = UtilsCampos.removeAlfaNumericos(event.target.value)}" v-model="formData.numeroSinistro" maxlength="15">
                            </div>
                            <div>
                                <label>Data da ocorrência</label>
                                <input :disabled="!isCadastrar" type="date" v-model="formData.dataOcorrencia">
                            </div>
                            <div>
                                <label>Cliente <strong>*</strong></label>
                                <input :disabled="!isCadastrar" placeholder="" type="text" v-model="formData.nome"/>
                            </div>
                            <div class="adtional-info">
                                <div>
                                    <label>Tipo <strong>*</strong></label>
                                    <select :disabled="!isCadastrar" name="tipo" v-model="formData.tipo">
                                        <option value="">Selecione</option>
                                        <option value="VEICULAR">Veicular</option>
                                        <option value="VIAGEM">Viagem</option>
                                        <option value="VIDA">Vida</option>
                                        <option value="RESIDENCIAL">Residencial</option>
                                        <option value="EMPRESARIAL">Empresarial</option>
                                    </select>
                                </div>
                                <div>                                    
                                    <label for="terceiro" class="switch">
                                        <h1>Terceiros Envolvidos</h1>
                                        <input :disabled="!isCadastrar" type="checkbox" v-model="formData.terceiro" name="terceiro" id="terceiro">
                                        <span class="slider"></span>
                                    </label>
                                </div>
                            </div>
                            <div v-if="formData.tipo === 'VEICULAR'" class="vehicle">
                                <div>
                                    <label>Placa <strong>*</strong></label>
                                    <input :disabled="!isCadastrar" placeholder="" type="text" v-model="formData.placa"/>
                                </div>
                            </div>                        
                        </div>
                        <div class="col">
                            <div class="secure-info">
                                <div>
                                    <label>Número da apólice <strong>*</strong></label>
                                    <input :disabled="!isCadastrar" name="apolice" placeholder="" type="text" v-model="formData.numeroApolice" maxlength="15"/>
                                </div>
                                <div>
                                    <label>Seguradora</label>
                                    <input :disabled="!isCadastrar" placeholder="" type="text" v-model="formData.seguradora"/>
                                </div>
                            </div>                            
                        </div>
                        <div class="eventoInformacoes">
                            <div id="observacoesContainer">
                                <label for="observacoes">Observações</label>
                                <textarea :disabled="!isCadastrar" name="observacoes" v-model="formData.observacoes" placeHolder=""></textarea>
                            </div>
                            <div>
                                <label for="evento">Evento</label>
                                <input type="text" name="evento" v-model="formData.evento">
                            </div>
                        </div>
                        <div v-if="formData.fotos || isCadastrar" id="fotos">                            
                            <img v-if="formData.fotos" v-for="(value, index) of formData.fotos" :key="index" :src="'data:image/png;base64,'+value" alt="">                                
                            <div v-if="!isVisualizar" class="upload-wrapper">
                                <label for="input-file" class="label-file"><i class="fa-solid fa-plus"></i></label>
                                <input type="file" multiple @change="(event) => setFile(event)" id="input-file">    
                            </div>
                        </div>
                        <div v-if="isCadastrar">
                            <button type="submit" id="registerCustomer">
                                Registrar Sinistro
                            </button>
                        </div>
                    </div>
                </Form>            
                <div v-if="!isCadastrar" class="comments">
                    <h1>Atualizações</h1>
                    <Comment @refreshComments="atualizaComentarios()" v-for="(comment, index) of comments.rows" :key="index" :comment="comment"/>
                    <div id="addComment">
                        <h2>Adicionar Atualização</h2>
                        <textarea placeholder="Descreva a atualização..." name="comment" v-model="newComment.content" id="comment"></textarea>
                        <button class="btn" id="registerComment" @click="addComment()">Adicionar</button>
                    </div>
                </div>
                <div class="col">
                    <div>
                        <label>Observações</label>
                        <TextareaBox placeHolder=""></TextareaBox>
                    </div>
                    <button id="registerCustomer">Registrar Sinistro</button>
                </div>
            </div>
        </Page>      
    </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref, type Ref } from "vue";
import useSinistroStore from "@/stores/SinistroStore";
import Comment from "../components/accident/Comment.vue" 
import { useRoute } from "vue-router";
import Page from "@/components/baseComponents/Page.vue";
import { format } from "date-fns";
import { UtilsCampos } from "@/utils/UtilsCampos";
import SinistroCreateDto from "@/dtos/SinistroCreateDto";

const route = useRoute();
const sinistroStore = useSinistroStore();

const openAlert: any = inject('openAlert');
const isCadastrar = ref(false)
const isVisualizar = ref(false)
const newComment = ref({
    content: ''
})
const comments = ref({
    rows: []    
})

const formData: Ref<SinistroCreateDto> = ref(new SinistroCreateDto());

const payload = new FormData();

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

    // if(!formData.value.nome || !formData.value.tipo || !formData.value.numeroApolice || (formData.value.tipo == 'VEICULAR' && !formData.value.placa)){
    //     openAlert('', 'Informações pendentes', 'Você deve preencher todos os campos obrigatórios!');
    //     document.getElementById('registerCustomer')?.removeAttribute('disabled');
    //     return;
    // }
    if(isCadastrar.value) {
        let aCampos = Object.entries(formData.value)
        for(let oCampo of aCampos) {          
            if(oCampo[0] == 'fotos') {
                break;
            }  
            payload.append(oCampo[0], `${oCampo[1]}`)
        }
        return await sinistroStore.registrarSinistro(payload).then(() => {
            openAlert('accidentSearch', 'Sinistro Cadastrado', 'Seu sinistro foi registrado com sucesso, você será redirecionado em 5 segundos!');            
        })
    }
    return await sinistroStore.updateRegister(+route.params.id, formData.value)
}

function validaData(sDataInicial: any, sDataFinal: any) {
    const milisegundos = sDataInicial - sDataFinal;
    return (milisegundos / (1000 * 60 * 60 * 24))
}

function setFile(event: any) {    
    for(const oFoto of event.target.files) {
        previewImage(oFoto);        
        payload.append('files', oFoto)
    }
}

function previewImage(oFoto: any) {
    const reader = new FileReader();
        
        reader.onload = function(file: any) {
            if(file) {
                const base64String: any = file.target.result.split(',')[1]; // Remover o prefixo data:image/png;base64,
                
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

function removeCaracteresAlfa(event: any) {
    const value = event.target.value.replace(/\D+/g, '');    

    formData.value.numeroSinistro = value;
}

async function atualizaComentarios() {
    comments.value = await sinistroStore.getComments(+route.params.id);
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
            fotos: []
        }
        isCadastrar.value = true                        
        return
    }

    if(route.name == 'visualizarSinistro') {        
        isVisualizar.value = true                
    }

    formData.value = await sinistroStore.getAccidentSingle(+route.params.id);     
    comments.value = await sinistroStore.getComments(+route.params.id);
})

</script>
<style scoped lang="scss">
    @import "../assets/__variables.scss";
    @import "../assets/inputbox";
    @import "../assets/textarea.scss";

    .eventoInformacoes {
        display: flex;
        justify-content: space-between;
        width: 74%;

        #observacoesContainer {
            width: 66.5%;
        }
    }

    input, select, textarea {
        box-shadow: rgba(0,0,0,0.2) 2px 2px 3px;
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
        bottom: 3px;
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
        margin-top: 20px;        
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
        max-height: 400px;
        overflow-y: scroll;
        flex-wrap: wrap;        
        img {
            display: block;        
            //width: 17%;        
            height: 215px;               
            box-shadow: rgba(0,0,0,0.2) 0px 0px 10px;  
            border-radius: 5px;            
        }
    }

    #addComment {
        width: 50%;
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

    label{
        font-size: 18px;
        font-weight: bold;
        color: $primary;
        margin-top: 15px;
    }

    label[for='observacoes'] {
        display: block;
    }

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
        width: 50%;
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

    input[name="cep"] {
        width: 50%;
    }

    input[name="numero"] {
        width: 25%;
    }

    input[name="apolice"] {
        width: 100%;
        display: block;
    }

    input[type="number"]::-webkit-inner-spin-button, 
    input[type="number"]::-webkit-outer-spin-button { 
        -webkit-appearance: none;
        margin: 0; 
    }
    
    input[type="number"] {
        appearance: textfield;
    }

    .street {
        width: 64%;
        margin-bottom: 1%;
    }

    .adress-inputs div:nth-child(3){
        width: 64%;
    }

    .adress-inputs div:nth-child(2), .adress-inputs div:nth-child(4){
        width: 35%;
    }

    .vehicle{
        display: flex;
        width: 100%;
        justify-content: space-between;
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
            //text-shadow: $secondary 0px 0px 5px;
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
        //display: flex;
        //align-items: end;
        //bottom: 0;
        //position: absolute;    
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

</style>