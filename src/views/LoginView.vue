<template>
    <div id="container">
        <Form :actions="false" @submit="login" :formData="formData" name="login">
            <img src="/img/logo 2.png" alt="logo">
            <br><label for="email">E-mail</label>
            <br><input type="email" v-model="formData.email" placeholder="Digite seu e-mail" name="email">
            <div id="password-input">
                <br><label for="password">Senha</label>
                <br><input type="password" v-model="formData.password" placeholder="Digite sua senha" name="password" id="passwordInput">
                <i class="bi bi-eye" id="passwordEye" @click="showPassword"></i>
            </div>
            <p>{{ message }}</p>
            <div id="buttons">
                <button type="submit" id="login">
                    Entrar
                    <Loader v-if="loading" small />
                </button>
                <button id="forgot">Esqueci minha senha</button>
            </div>            
        </Form>
    </div>
</template>

<script setup lang="ts">
import Form from '@/components/baseComponents/Form.vue';
import { ref } from 'vue';
import useUserStore from '../stores/UserStore'
import { useRouter } from 'vue-router';
import Loader from '@/components/baseComponents/Loader.vue';
const formData = ref({ email: '', password: '' })
const store = useUserStore()
const router = useRouter()
const loading = ref(false)
const message = ref('')

async function login() {
    loading.value = true
    const result = await store.auth(formData.value)
    if(result.code != 400) {        
        router.push({ name: 'main' })
    }
    message.value = result.message
    loading.value = false
}

function showPassword(){
    var inputType: any = document.getElementById('passwordInput')
    var eyeBtn: any = document.getElementById('passwordEye')
    if(inputType.type === 'password'){
        inputType.setAttribute('type', 'text')
        eyeBtn.classList.replace('bi-eye', 'bi-eye-slash')
    }else{
        inputType.setAttribute('type', 'password')
        eyeBtn.classList.replace('bi-eye-slash','bi-eye')
    }
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
        margin: 0 auto;
        background-color: #EEEEEE;
        border-radius: 25px;
        width: 35vw;
        max-width: 550px;
        padding: 3% 4%;
        font-weight: bold;
        box-shadow: rgba(100, 100, 111, 0.1) 0px 0px 20px 0px;    
    }
    
    p {
        margin-top: 2%;
        color: $danger;
    }

    form img{
        width: 80%;
        display: flex;
        margin: 0 auto 30px auto;
    }
    
    form input{
        width: 100%;
        height: 45px;
        border: none;
        border-radius: 5px;
        box-sizing: border-box;
        padding: 0 2%;
        font-size: 24px;
    }

    form input::placeholder{
        font-size: 19px;
    }

    form input:focus-visible{
        outline: none;
    }

    form label{
        font-size: 21px;
    }

    #password-input{
        position: relative;
    }

    #password-input i{
        position: absolute;
        right: 3%;
        margin-top: 1.5%;
        font-size: 25px;
    }

    #password-input input{
        display: inline;
    }

    button{
        border: none;
        margin-top: 40px;
        font-size: 19px;
    }

    #login{
        background-color: $secondary;
        box-sizing: border-box;
        padding: 2% 2.5%;
        border-radius: 5px;
        height: 45px;
        transition: 0.1s;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    #forgot:hover {
        text-decoration: underline;
    }

    #buttons{
        display: flex;
        justify-content: space-between;
    }

    .bi bi-eye{
        color: black;
    }

    @media screen and (max-width: 780px) {
        form{
            width: 90vw;
            padding: 4%;
        }

    }

    @media screen and (min-width: 780px) and (max-width: 1050px) {
        form{
            width: 50vw;
        }
    }
</style>