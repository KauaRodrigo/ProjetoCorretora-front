<template>
    <div id="container">
        <div id="reset-box">
            <div id="emailToReset" v-if="!route.params.token">
                <h1>Recuperar senha</h1>    
                <p>Informe seu email para enviar-mos um token de recuperação!</p>
                <label>E-mail</label>
                <input type="email" v-model="emailRecuperacao" >
                <p id="erroEmail" style="display: none;">O campo e-mail é obrigatório</p>
                <div class="actions">
                    <button class="btn btn-success" @click="createResetToken">Enviar</button>
                    <button class="btn btn-danger">Voltar</button>
                </div>
            </div>
            <div v-else-if="!tokenIsValid">
                <h1>O seu token expirou</h1>
                <p>Você pode solicitar um novo token de reset de senha, você terá 30 minutos para realizar a alteração.</p>
                <div>
                    <button class="btn btn-danger" @click="returnToLogin">
                        Voltar
                    </button>
                </div>
            </div>
            <div v-else id="reset-camps">
                <h1>Redefina sua senha!</h1>

                <label>Nova senha</label>
                <input type="password" name="newPassword" v-model="newPassword">
                <label>Confirmar nova senha</label>
                <input type="password" name="newPasswordConfirm" v-model="newPasswordConfirm">
                <p id="erroValidacao">As senhas devem ser iguais</p>
                <button class="btn btn-success" @click="validarAlteracao()">Confirmar</button>
            </div>            
        </div>
    </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import useUserStore from '@/stores/UserStore';
import { onMounted, ref, type Ref } from 'vue';
import { useRoute } from 'vue-router';

const store: any = useUserStore();
const route: any =  useRoute();

const newPassword        = ref('');
const newPasswordConfirm = ref('');
const emailRecuperacao   = ref('');

const tokenIsValid: Ref<boolean> = ref(false);

function returnToLogin() {
    router.push('/')
}

onMounted(async () => {
    tokenIsValid.value = await verifyResetToken(route.params.token);
})

async function createResetToken() {
    const p = document.getElementById('erroEmail');

    if(p && emailRecuperacao.value == '') {
        return p.style.display = 'block'
    }

    if(p) {
        p.style.display = 'none'
    }

    return store.createResetToken(emailRecuperacao.value);
}

/**
 * Valida o token passado via url para verificar se ainda está ativo e se existe
 * @param {string} token
 * @returns {boolean}
 * 
 */
async function verifyResetToken(token: string): Promise<boolean> {
    return store.verifyResetToken(token);    
}

async function validarAlteracao() {
    const p = document.getElementById('erroValidacao');

    if(p && newPassword.value == '') {
        p.innerText = 'O campo Nova senha é obrigatório';
        p.style.display = 'block';
        return;
    }

    if(p && newPasswordConfirm.value == '') {
        p.innerText = 'O campo Confirmar nova senha é obrigatório';
        p.style.display = 'block';
        return;
    }

    if(newPassword.value !== newPasswordConfirm.value) {

        if(p) {
            p.innerText = 'As senhas devem ser iguais';
            p.style.display = 'block';
            return 
        }
    }

    if(p) {
        p.style.display = 'none';
    }

    await store.updatePassword(newPassword.value);
}

</script>
<style lang="scss" scoped>
@import "../assets/_variables.scss";
@import "../assets/inputbox.scss";

#container{
    height: 100%;
    display: grid;
    place-items: center;
    background: linear-gradient(45deg, #003264, rgb(0,210,176, 0.5) 100%);
    
    #reset-box {
        width: 47%;
        min-height: 500px;
        border-radius: 20px;
        background: white;
        box-shadow: 4px 5px 10px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #emailToReset {
        input {
            margin-bottom: 15px;
        }

        .actions {
            display: flex;
            justify-content: space-between;
            width: 35%;            
        }
    }

    #reset-camps {
        display: flex;
        flex-direction: column;        

        input {
            margin-bottom: 20px;
            box-shadow: 4px 4px 10px rgba(0,0,0,0.2);
        }

        button {
            width: 30%;
        }

        #erroValidacao {
            font-size: 12px;
            color: red;
            display: none;
        }
    }

    #erroEmail {
        font-size: 12px;
        color: red;
        display: none;
    }
    

} 

</style>