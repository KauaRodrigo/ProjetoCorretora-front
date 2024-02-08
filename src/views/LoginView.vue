<template>
    <div id="container">
        <Form :actions="false" @submit="login" :formData="formData" name="login">
            <img src="/img/logo.png" alt="logo">
            <br><label for="e-mail">E-mail</label>
            <br><input type="email" v-model="formData.email" placeholder="Digite seu e-mail" name="e-mail">
            <br><label for="senha">Senha</label>
            <br><input type="password" v-model="formData.password" placeholder="Digite sua senha" name="senha">
            <div id="buttons">
                <button type="submit" id="entrar">Entrar</button>
                <button id="esqueci">Esqueci minha senha</button>
            </div>            
        </Form>
    </div>
</template>
<script setup lang="ts">
import Form from '@/components/baseComponents/Form.vue';
import { ref } from 'vue';
const formData = ref({ email: '', password: '' })

async function login() {
    console.log('submit')
}

</script>
<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    #container{
        height: 100vh;
        display: flex;
        align-items: center;
    }

    form{
        margin: 0 auto 0 auto;
        background-color: #EEEEEE;
        border-radius: 25px;
        width: 30vw;
        padding: 4%;
        font-family: 'Inter', sans-serif;
        font-size: 80%;
        font-weight: bold;
        box-shadow: rgba(100, 100, 111, 0.1) 0px 0px 20px 0px;    
    }

    form img{
        width: 90%;
        display: flex;
        margin: 0 auto;
    }
    
    form input{
        width: 100%;
        height: 30px;
        border: none;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0 2%;
    }

    form label{
        margin-top: 15px;
    }

    button{
        border: none;
        margin-top: 30px;
    }

    #entrar{
        background-color: $secondary;
        box-sizing: border-box;
        height: 30px;
        padding: 0 5%;
        border-radius: 5px;
    }

    #buttons{
        display: flex;
        justify-content: space-between;
    }

    @media screen and (max-width: 750px) {
        form{
            width: 90vw;
        }

    }

    @media screen and (min-width: 750px) and (max-width: 1025px) {
        form{
            width: 50vw;
        }
    }
</style>