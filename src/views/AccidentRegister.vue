<template>
    <div>
        <TheHeader />
        <div class="container">
            <h1>Registrar sinistro</h1>
            <Form @submit="submit" :formData="formData">
                <div class="row">
                    <div class="col-md">
                        <div>
                            <label>Cliente <strong>*</strong></label>
                            <input placeholder="" type="text" v-model="formData.nome"/>
                        </div>
<!--                        <div class="address">-->
<!--                            <label>Endereço </label>-->
<!--                            <div class="address-div">-->
<!--                                <input name="cep" maxlength="9" @change="formatField('cep')" placeholder="Cep" type="text" v-model="formData.cep"/>-->
<!--                                <input name="cidade" placeholder="Cidade" readonly type="text" v-model="formData.cidade"/>-->
<!--                            </div>-->
<!--                            <div class="address-div">-->
<!--                                <input name="rua" placeholder="Logradouro (Rua, avenida)" type="text" v-model="formData.rua"/>-->
<!--                                <input name="bairro" placeholder="Bairro ou comunidade" type="text" v-model="formData.bairro"/>-->
<!--                            </div>-->
<!--                            <div class="address-div">-->
<!--                                <input name="numero" placeholder="Número" type="text" v-model="formData.numero"/>-->
<!--                                <input name="complemento" placeholder="Complemento" type="text" v-model="formData.complemento"/>-->
<!--                            </div>-->
<!--                        </div>-->
                        <div class="adtional-info">
                            <div>
                                <label>Tipo <strong>*</strong></label>
                                <select name="tipo" v-model="formData.tipo">
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
                                <input type="checkbox" v-model="formData.terceiro" name="terceiro" id="terceiro">
                            </div>
                        </div>
                        <div v-if="formData.tipo === 'VEICULAR'" class="vehicle">
                            <div>
                                <label>Placa <strong>*</strong></label>
                                <input placeholder="" type="text" v-model="formData.placa"/>
                            </div>
<!--                            <div>-->
<!--                                <label>Renavam <strong>*</strong></label>-->
<!--                                <input placeholder="" type="text" v-model="formData.renavam"/>-->
<!--                            </div>-->
                        </div>
                        <div class="adtional-info">
                            <div>
                                <label>Número da apólice <strong>*</strong></label>
                                <input name="apolice" placeholder="" type="text" v-model="formData.codigo"/>
                            </div>
                            <div>
                                <label>Seguradora</label>
                                <input placeholder="" type="text" v-model="formData.seguradora"/>
                            </div>
                        </div>
                        <div>
                            <label for="input-file" class="label-file">Anexar arquivo</label>
                            <input type="file" id="input-file">
                            <br><span class="span-file">PNG, JPG, MP4, MOV, PDF...</span>
                        </div>
                    </div>
                    <div class="col">
                        <div>
                            <label>Observações</label>
                            <textarea v-model="formData.evento" placeHolder=""></textarea>
                        </div>
                        <button type="submit" id="registerCustomer">Registrar Sinistro</button>
                    </div>
                </div>
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import TheHeader from '@/components/baseComponents/TheHeader.vue'
    import {ref} from "vue";
    import useSinistroStore from "@/stores/SinistroStore";

    const sinistroStore = useSinistroStore();

    const formData = ref({
        nome: '',
        tipo: '',
        terceiro: '',
        placa: '',
        // cidade: '',
        // estado: '',
        // cep: '',
        // rua: '',
        // bairro: '',
        codigo: '',
        // renavam: '',
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

    i{
        color: $primary;
        float: right;
        margin-left: auto;
        font-size: 16px;
    }

    #input-file{
        width: 100px;
	    height: 100px;
        display: none;
    }

    .label-file {
        text-align: center;
        cursor: pointer;
        background-color: $primary;
        color: white;
        font-weight: 100;
        box-sizing: border-box;
        padding: 10px 2.5%;
        border-radius: 5px;
        height: 45px;
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