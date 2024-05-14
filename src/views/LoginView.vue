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
                <button type="button" id="forgot">Esqueci minha senha</button>
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
    @import "../assets/__variables.scss";
    #container{
        height: 100%;
        display: grid;
        place-items: center;
        background: linear-gradient(45deg, #003264, rgb(0,210,176, 0.5) 100%);                
    }        

    form{
        margin: 0 auto;
        background-color: #EEEEEE;
        border-radius: 10px;
        width: 25vw;              
        padding: 3% 2%;
        font-weight: bold;        
    }           
    
    p {
        margin-top: 2%;
        color: $danger;
    }

    form img {
        width: 80%;
        display: grid;
        margin: 0 auto 2% auto;
    }
    
    form input {
        width: 100%;        
        border: none;
        border-radius: 5px;        
        padding: 2% 2%;
        font-size: 16px;
    }

    form input::placeholder{
        font-size: 19px;
    }

    form input:focus-visible{
        outline: none;
    }

    form label{
        font-size: 18px;
    }

    #password-input{
        position: relative;
    }

    #password-input i{
        position: absolute;
        right: 3%;
        margin-top: 1%;
        font-size: 25px;
    }

    #password-input input{
        display: inline;
    }

    button{
        border: none;
        margin-top: 2%;
        font-size: 19px;
    }

    #login{
        background: rgb(11,199,175);                
        padding: 2% 2.5%;
        font-size: 1rem;
        border-radius: 5px;        
        height: 12%;        
        display: flex;
        align-items: center;
        font-weight: 600;        
        color: black;
        transition: all 1.5s;
        gap: 10px;
    }    

    #login:hover {
        transition: all 0.5s;
        color: white;
        background-color: $secondary;        
    }

    #forgot:hover {
        text-decoration: underline;
    }

    #buttons{
        display: flex;
        justify-content: space-between;
    }

    .bi .bi-eye{
        color: black;
    }        

    @media screen and (max-width: 620px) {
        form {                                    
            width: 80%;                
            padding: 6% 5%;                          
        }       

        form input {            
            height: auto;
        }

        form label{
            font-size: 18px;
        }

        #password-input i{            
            margin-top: 0;                        
        }

        #buttons {
            display: block;
        }

        #login {
            transition: all 0.5s;
            color: white;
            width: auto;
            background-color: $secondary;   
        }
    }

    @media screen and (min-width: 620px) and (max-width: 1024px) {
        form {                                                  
            width: 45%;                
            padding: 4% 3%;                          
            position: absolute;
            top: 30%;
        }       

        form input {            
            height: auto;
        }        

        #password-input i{            
            margin-top: 0;                        
        }

        #login {
            transition: all 0.5s;
            color: white;
            width: auto;
            background-color: $secondary;   
        }
    }

    @media screen and (min-width: 1024px) and (max-width: 1440px) {
        form {                                    
            width: 35%;                
            padding: 4% 3%;                        
        }       

        form input {            
            height: auto;
        }        

        #password-input i{            
            margin-top: 0;                        
        }

        #login {
            transition: all 0.5s;
            color: white;
            width: auto;
            background-color: $secondary;   
        }
    }
</style>