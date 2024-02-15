<template>
    <TheHeader></TheHeader> 
    <div class="container">
        <h1>Registrar sinistro</h1>
        <Form>
            <div class="row">
                <div class="col-md">
                    <div>
                        <label>Cliente <strong>*</strong></label>
                        <InputBox placeHolder="" inputType="text"></InputBox>
                    </div>
                    <div>
                        <label>Endereço</label>
                        <InputBox placeHolder="" inputType="text"></InputBox>
                    </div>
                    <div>
                        <label>Veículo</label>
                        <InputBox placeHolder="" inputType="text"></InputBox>
                    </div>
                    <div class="vehicle">
                        <div class="vehicle-item">
                            <label>Número da apólice</label>
                            <InputBox placeHolder="" inputType="text"></InputBox>
                        </div>
                        <div class="vehicle-item">
                            <label>Seguradora</label>
                            <InputBox placeHolder="" inputType="text"></InputBox>
                        </div>
                    </div>
                    <div>
                        <input type="file">
                    </div>
                </div>
                <div class="col">
                    <div>
                        <label>Observações</label>
                        <TextareaBox placeHolder=""></TextareaBox>
                    </div>
                    <button id="registerCustomer">Cadastrar Cliente</button>
                </div>
            </div>
        </Form>
    </div>
</template>

<script setup lang="ts">
    import TheHeader from '@/components/baseComponents/TheHeader.vue'
    import InputBox from '@/components/baseComponents/InputBox.vue';
    import TextareaBox from '@/components/baseComponents/TextareaBox.vue';
</script>
<style scoped lang="scss">
    @import "./src/assets/__variables.scss";
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

    .col:nth-child(2){
        //background-color: red;
        //display: flex; 
        //align-items: end;
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