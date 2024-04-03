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
                        <div>
                            <label>Endereço</label>
                            <input placeholder="" type="text" />
                        </div>
                        <div>
                            <label>Placa</label>
                            <input placeholder="" type="text" v-model="formData.placa"/>
                        </div>
                        <div class="vehicle">
                            <div class="vehicle-item">
                                <label>Número da apólice</label>
                                <input placeholder="" type="text" v-model="formData.codigo"/>
                            </div>
                            <div class="vehicle-item">
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
            {{formData}}
        </div>
    </div>
</template>

<script setup lang="ts">
    import TheHeader from '@/components/baseComponents/TheHeader.vue'
    import InputBox from '@/components/baseComponents/InputBox.vue';
    import TextareaBox from '@/components/baseComponents/TextareaBox.vue';
    import { ref } from "vue";
    import useSinistroStore from "@/stores/SinistroStore";

    const sinistroStore = useSinistroStore();

    const formData = ref({
        nome: '',
        endereco: '',
        placa: '',
        codigo: '',
        seguradora: '',
        evento: ''
    });

    async function submit() {
        await sinistroStore.registrarSinistro(formData.value);
    }

</script>
<style scoped lang="scss">
    @import "../assets/__variables.scss";
    .container{
        margin-top: 20px;
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

    strong{
        color: $secondary;
    }

    .adress-inputs{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
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
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .vehicle-item{
        width: 49.5%;
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
        //display: flex;
        //align-items: end;
        //bottom: 0;
        //position: absolute;
    }


</style>