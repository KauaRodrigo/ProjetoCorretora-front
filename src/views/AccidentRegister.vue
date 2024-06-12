<template>
    <div>        
        <div class="container">
            <h1 v-if="isCadastrar">Registrar sinistro</h1>
            <Form @submit.prevent="submit" :formData="formData">
                <div class="row">
                    <div class="col-md">
                        <div>
                            <label>Cliente <strong>*</strong></label>
                            <input placeholder="" type="text" v-model="formData.nome" :disabled="isDisabled()"/>
                        </div>
                        <div class="adtional-info">
                            <div>
                                <label>Tipo <strong>*</strong></label>
                                <select name="tipo" v-model="formData.tipo" :disabled="isDisabled()">
                                    <option value="">Selecione</option>
                                    <option value="VEICULAR">Veicular</option>
                                    <option value="VIAGEM">Viagem</option>
                                    <option value="VIDA">Vida</option>
                                    <option value="RESIDENCIAL">Residencial</option>
                                    <option value="EMPRESARIAL">Empresarial</option>
                                </select>
                            </div>
                            <div>
                                <label>Terceiros Envolvidos <strong>*</strong></label>
                                <input type="checkbox" v-model="formData.terceiro" name="terceiro" id="terceiro" :disabled="isDisabled()">
                            </div>
                        </div>
                        <div v-if="formData.tipo === 'VEICULAR'" class="vehicle">
                            <div>
                                <label>Placa <strong>*</strong></label>
                                <input placeholder="" type="text" v-model="formData.placa" :disabled="isDisabled()"/>
                            </div>
                        </div>
                        <div class="adtional-info">
                            <div>
                                <label>Número da apólice <strong>*</strong></label>
                                <input name="apolice" placeholder="" type="text" v-model="formData.codigo" :disabled="isDisabled()"/>
                            </div>
                            <div>
                                <label>Seguradora</label>
                                <input placeholder="" type="text" v-model="formData.seguradora" :disabled="isDisabled()"/>
                            </div>
                        </div>                        
                    </div>
                    <div class="col">
                        <div>
                            <label>Observações</label>
                            <textarea v-model="formData.evento" placeHolder="" :disabled="isDisabled()"></textarea>
                        </div>
                        <button type="submit" id="registerCustomer">Registrar Sinistro</button>
                    </div>
                    <div class="fotos">
                        <img src="../assets/uploads/testes.jpeg" alt="" />
                        <img src="../assets/uploads/testes2.jpeg" alt="" />
                        <img src="../assets/uploads/testes 3.jpeg" alt="" />
                        <img src="../assets/uploads/testes.jpeg" alt="" />                        
                        <img src="../assets/uploads/testes2.jpeg" alt="" />
                        <img src="../assets/uploads/testes 3.jpeg" alt="" />
                        <img src="../assets/uploads/testes.jpeg" alt="" />                        
                        <img src="../assets/uploads/testes2.jpeg" alt="" />
                        <img src="../assets/uploads/testes 3.jpeg" alt="" />
                        <div class="upload-wrapper">
                            <label for="input-file" class="label-file"><i class="fa-solid fa-plus"></i></label>
                            <input type="file" id="input-file">                            
                        </div>
                    </div>
                </div>
            </Form>            
            <div v-if="!isCadastrar" class="comments">
                <h1>Atualizações</h1>
                <Comment v-for="(comment, index) of comments.rows" :key="index" :comment="comment"/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">    
import {onMounted, ref} from "vue";
import useSinistroStore from "@/stores/SinistroStore";
import Comment from "../components/accident/Comment.vue" 
import { useRoute } from "vue-router";

const route = useRoute();
const sinistroStore = useSinistroStore();

const isCadastrar = ref(false)
const comments = ref({
    rows: [{ usuario: 'Marcos Antônio', conteudo: 'Comentário de teste', dataComentario: '07/06/2024' }, { usuario: 'Sara Ansini', conteudo: 'Comentário de teste', dataComentario: '07/05/2024' }],
    count: 0
})

const formData = ref({
    nome: '',
    tipo: '',
    terceiro: false,
    placa: '',        
    codigo: '',        
    seguradora: '',
    evento: ''
});

async function submit() {
    await sinistroStore.registrarSinistro(formData.value);
}

function formatField(type: string) {

    switch (type) {
        case 'cep':
            if(formData.value.cep.length >= 5) {
                formData.value.cep = formData.value.cep.replace(/(\d{5})(\d{0,3})/gm, '$1-$2')
            }
            return formData.value
    }
}

onMounted(async () => {
    if(route.name == 'accidentEdit') {        
        formData.value = await sinistroStore.getAccidentSingle(+route.params.id);                
        isDisabled();
    } else if (route.name == 'accidentRegister') {
        isCadastrar.value = true
    }    
})

function isDisabled() {
    return true;
}

</script>
<style scoped lang="scss">
    @import "../assets/__variables.scss";
    @import "../assets/inputbox";
    @import "../assets/textarea";

    .container {
        margin-top: 20px;
        padding-top: 2rem;
        padding-bottom: 4rem;
    }

    .fotos {
        display: flex;
        margin: 2% 0;        
        padding: 2%;
        gap: 2rem 2.9rem;
        background-color: $primary; 
        justify-content: center;        
        border-radius: 10px;
        max-width: 100%;   
        flex-wrap: wrap;        
        img {                        
            display: block;        
            width: 17%;                       
            box-shadow: rgba(0,0,0,0.5) 0px 2px 8px;
            border-radius: 5px;
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

    select {
        width: 50%;
        display: block;
    }

    label{
        font-size: 18px;
        font-weight: bold;
        color: $primary;
        margin-top: 15px;
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
        display: flex;
    }

    .upload-wrapper:hover {
        i {
            transition: all .3s;
            text-shadow: $secondary 2px 2px 1px;
            transition: all .5s;
            transform: scale(2);
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

    #registerCustomer{
        background-color: $secondary;
        box-sizing: border-box;
        padding: 0 2.5%;
        border-radius: 5px;
        height: 45px;
        transition: 0.1s;
        border: none;
        float: right;
    }


</style>