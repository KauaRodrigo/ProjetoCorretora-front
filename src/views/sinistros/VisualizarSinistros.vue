<template>
    <div> 
        <Page>
            <div class="container">                                
                <div class="linha d-flex">   
                    <div style="width: 50%; margin-right: 25px;">
                        <label for="numeroSinistro">Número do sinistro</label>
                        <input id="numeroSinistro" disabled type="text" name="numeroSinistro" @keyup="(event) => {oCliente.numeroSinistro = UtilsCampos.removeAlfaNumericos(event.target.value)}" v-model="oCliente.numeroSinistro" maxlength="15">
                    </div>
                    <div style="width: 48%">
                        <label>Número da apólice <strong>*</strong></label>
                        <input id="numeroApolice" disabled name="apolice" placeholder="" type="text" v-model="oCliente.numeroApolice" maxlength="15"/>
                    </div>
                </div>
                <div class="linha d-flex">
                    <div style="width: 50%; margin-right: 25px;">
                        <label>Data da ocorrência</label>
                        <input id="dataOcorrencia" disabled type="date" v-model="oCliente.dataOcorrencia">
                    </div>
                    <div style="width: 25%;  position: relative;">
                        <label>Seguradora</label>                            
                        <input type="text" disabled name="seguradora" id="seguradoras" v-model="oCliente.seguradora"></input>
                    </div>
                </div>
                <div class="linha d-flex">
                    <div style="width: 20%; margin-right: 25px;">
                        <label>Tipo <strong>*</strong></label>
                        <select id="tipoSinistro" disabled name="tipo" v-model="oCliente.tipo">
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
                            <input disabled type="checkbox" v-model="oCliente.terceiro" name="terceiro" id="terceiro">
                            <span class="slider"></span>
                        </label>
                    </div>
                    <div v-if="oCliente.terceiro" id="nomeTerceiroContainer">
                        <label>Nome do Terceiro <strong>*</strong></label>
                        <input disabled type="text" v-model="oCliente.nomeTerceiro" name="nomeTerceiro" id="nomeTerceiro">
                    </div>
                </div>
                <div class="linha d-flex">
                    <div style="width: 50%; margin-right: 25px; position: relative;">
                        <label>Cliente <strong>*</strong></label>
                        <input type="text" disabled name="cliente" id="cliente" v-model="oCliente.nome"></input>                            
                    </div>
                    <div v-if="oCliente.tipo == 'VEICULAR'" style="width: 25%">
                        <label>Placa <strong>*</strong></label>
                        <input id="placa" disabled placeholder="" type="text" v-model="oCliente.placa"/>
                    </div>
                </div>     
                <div class="linha d-flex">
                    <div id="observacoesContainer">
                        <label for="observacoes">Observações</label>
                        <textarea disabled id="observacoes" name="observacoes" v-model="oCliente.observacoes" placeHolder=""></textarea>
                    </div>
                    <div style="width: 25%">
                        <label for="evento">Evento</label>
                        <input id="evento" disabled type="text" name="evento" v-model="oCliente.evento">
                    </div>
                </div>
                <div class="d-flex align-items-end">
                    <div class="comments">
                        <h1>Atualizações</h1>
                        <Comment @refreshComments="atualizaComentarios()" v-for="(comment, index) of comments.rows" :key="index" :comment="comment"/>
                        <div id="addComment">
                            <h2>Adicionar atualização</h2>
                            <textarea placeholder="Descreva a atualização..." name="comment" v-model="newComment.content" id="comment"></textarea>
                            <button class="btn" id="registerComment" @click="addComment()">Adicionar</button>                        
                        </div>
                    </div>
                    <div class="actions">
                        <button class="btn btn-info" @click="back">Voltar</button>
                    </div>
                </div>                                
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
import Comment from "@/components/sinistros/Comment.vue";

const router        = useRouter();
const route         = useRoute();
const sinistroStore = useSinistroStore();

const oCliente = ref({
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

const openAlert  = inject('openAlert');
const newComment = ref({
    content: ''
})
const comments = ref({
    rows: []    
})

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

async function atualizaComentarios() {
    comments.value = await sinistroStore.getComments(+route.params.id);
}
onMounted(async () => {                    
    oCliente.value = await sinistroStore.getAccidentSingle(+route.params.id);     
    comments.value = await sinistroStore.getComments(+route.params.id);
})

function back() {
    return router.back();
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
        width: 100%;
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

    #registerComment {
        background-color: $secondary;
        border-radius: 5px;
        transition: 0.1s;
        border: none;
        font-weight: 600;        
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

</style>