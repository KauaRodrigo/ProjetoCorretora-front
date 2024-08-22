<<<<<<< HEAD
<template>
    <TheHeader />
    <Page>
=======
<template>    
>>>>>>> a7a9bc066dfb236fc75683487f9d2a93e3e47152
    <div class="container">
        <h1>Buscar cliente</h1>
        <form>
            <div class="row">
                <div class="filter">
                    <div class="spacing">
                        <label>Nome, CPF ou CNPJ</label>
                        <InputBox placeHolder="" inputType="text"></InputBox>
                    </div>
                    <div>
                        <label>Placa do veículo ou RENAVAM</label>
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
                    <button id="searchCustomer">Buscar</button>
                </div>
                <div class="col">
                    
                </div>
            </div>
        </form>
            <div class="col">
                <div class="row">
                    <div class="searchResult">
                        <h1>Resultado da busca</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="result">
                        <ClientCard class="spacing" src="" cpf="123.456.789-10" name="Anderson Celulari" phone="(47) 91234-5678" adress="Rua São Paulo, 1563, Bairro dos Estados, Apto. 1101 - Rio do Sul/SC"></ClientCard>
                        <ClientCard class="spacing" src="" cpf="123.456.789-10" name="Anderson Celulari" phone="(47) 91234-5678" adress="Rua São Paulo, 1563, Bairro dos Estados, Apto. 1101 - Rio do Sul/SC"></ClientCard>
                        <ClientCard class="spacing" src="" cpf="123.456.789-10" name="Anderson Celulari" phone="(47) 91234-5678" adress="Rua São Paulo, 1563, Bairro dos Estados, Apto. 1101 - Rio do Sul/SC"></ClientCard>
                        <ClientCard class="spacing" src="" cpf="123.456.789-10" name="Anderson Celulari" phone="(47) 91234-5678" adress="Rua São Paulo, 1563, Bairro dos Estados, Apto. 1101 - Rio do Sul/SC"></ClientCard>
                        <ClientCard class="spacing" src="" cpf="123.456.789-10" name="Anderson Celulari" phone="(47) 91234-5678" adress="Rua São Paulo, 1563, Bairro dos Estados, Apto. 1101 - Rio do Sul/SC"></ClientCard>
                        <ClientCard class="spacing" src="" cpf="123.456.789-10" name="Anderson Celulari" phone="(47) 91234-5678" adress="Rua São Paulo, 1563, Bairro dos Estados, Apto. 1101 - Rio do Sul/SC"></ClientCard>
                        <ClientCard class="spacing" src="" cpf="123.456.789-10" name="Anderson Celulari" phone="(47) 91234-5678" adress="Rua São Paulo, 1563, Bairro dos Estados, Apto. 1101 - Rio do Sul/SC"></ClientCard>
                    </div>
                </div>
            </div>
        </div>
    </Page>
</template>

<<<<<<< HEAD
<script setup lang="ts">
    import ClientCard from '@/components/baseComponents/ClientCard.vue';
    import TheHeader from '@/components/baseComponents/TheHeader.vue';
=======
<script setup lang="ts">    
>>>>>>> a7a9bc066dfb236fc75683487f9d2a93e3e47152
    import InputBox from '@/components/baseComponents/InputBox.vue';
    import UpdateBox from '@/components/baseComponents/UpdateBox.vue';
    import Page from '@/components/baseComponents/Page.vue';
    import Form from '@/components/baseComponents/Form.vue';
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

    .filter{
        width: 50vw;
        max-width: 800px;
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


    #searchCustomer{
        background-color: $secondary;
        box-sizing: border-box;
        padding: 0 2.5%;
        border-radius: 5px;
        height: 45px;
        transition: 0.1s;
        border: none;
        margin-top: 20px;
    }

    .searchResult{
        margin-top: 15px;
    }

    .searchResult h1{
        margin-bottom: 5px;
    }

    .result{
        //padding: 0;
        //background-color: red;
        display: grid;
        grid-template-columns: auto auto auto auto;
        box-sizing: border-box;
        //margin: 0 auto;
        column-gap: 20px;
        row-gap: 20px;
    }

    //.spacing{
    //    margin: 10px 0;
    //}

    @media screen and (max-width: 767px){
        .filter{
            width: 100%;
        }
        .result{
            grid-template-columns: auto auto auto;
        }
        @media screen and (max-width: 570px){
            .result{
                grid-template-columns: auto auto;
            }
        }
    }

</style>