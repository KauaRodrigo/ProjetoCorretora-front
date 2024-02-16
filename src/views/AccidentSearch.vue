<template>
    <TheHeader></TheHeader> 
    <div class="container">
        <h1>Buscar sinistro</h1>
        <Form>
            <div class="row">
                <div class="col-md">
                    <label>Data</label>
                    <div class="date">
                        <div class="date-item">
                            <InputBox placeHolder="Data de início" inputType="text"></InputBox>
                        </div>
                        <h6>Até</h6>
                        <div class="date-item">
                            <InputBox placeHolder="Data final" inputType="text"></InputBox>
                        </div>
                    </div>
                    <div>
                        <label>Nome, CPF, CNPJ ou placa</label>
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
                    <button id="registerCustomer">Buscar</button>
                </div>
                <div class="col">
                    
                </div>
            </div>
        </Form>
            <div class="col">
                <div class="row">
                    <div class="searchResult">
                        <h1>Resultado da busca</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="result">
                        <UpdateBox class="spacing" msg="Lorem ipsun"></UpdateBox>
                        <UpdateBox class="spacing" msg="Lorem ipsun"></UpdateBox>
                        <UpdateBox class="spacing" msg="Lorem ipsun"></UpdateBox>
                        <UpdateBox class="spacing" msg="Lorem ipsun"></UpdateBox>
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
    import TheHeader from '@/components/baseComponents/TheHeader.vue'
    import InputBox from '@/components/baseComponents/InputBox.vue';
    import UpdateBox from '@/components/baseComponents/UpdateBox.vue';
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

    .date{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .date h6{
        color: $primary;
        font-size: 16px;
        margin-top:8px;
    }
    .date-item{
        width: 45%;
    }

    .vehicle{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .vehicle-item{
        width: 49.5%;
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

    .searchResult{
        margin-top: 15px;
    }

    .searchResult h1{
        margin-bottom: 5px;
    }

    .result{
        padding: 0 10px;
        border: 1.5px solid #EEEEEE;
        border-radius: 10px;
    }

    .spacing{
        margin: 10px 0;
    }

</style>