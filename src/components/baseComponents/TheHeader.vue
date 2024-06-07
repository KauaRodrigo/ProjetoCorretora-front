<template>
    <header>
        <nav class="navbar container navbar-expand">
            <div class="container">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <RouterLink class="nav-link" :to="{ name: 'main' }">Início</RouterLink>
                    </li>
                    <li class="nav-item dropdown"> 
                        <a class="nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sinistros</a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <RouterLink v-if="hasAccess(['ATENDIMENTO'])" class="dropdown-item" :to="{ name: 'accidentRegister' }">Registrar</RouterLink>
                            <RouterLink class="dropdown-item" :to="{ name: 'accidentSearch' }">Buscar</RouterLink>
                        </div>
                    </li>
                    <li v-if="false" class="nav-item dropdown">
                        <a class="nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Clientes</a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <RouterLink class="dropdown-item" :to="{ name: 'customerRegister' }">Cadastrar</RouterLink>
                            <RouterLink class="dropdown-item" :to="{ name: 'customerSearch' }">Buscar</RouterLink>
                        </div>
                    </li>
                    
                </ul>
                <div class="d-flex login">                                            
                    <p>Olá, <b>{{ user.username }}</b></p>                                                                        
                    <button @click="emits('openModalLogout')"><i class="bi bi-box-arrow-in-right"></i></button>
                </div>
            </div>
        </nav>
        
    </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
const emits = defineEmits(['openModalLogout'])
const user = ref<{ id?: number, username?: string, roles?: string[] }>({});

onMounted(() => {
    user.value = JSON.parse(localStorage.getItem('user') ?? '')    
})

function hasAccess(roles: string[]) {
    return user.value.roles?.some(role => {
        if(roles.includes(role)) {            
            return true
        }
    });
}

</script>
<style scoped lang="scss">
    @import "../../assets/__variables.scss";    
    
    .login {
        width: auto;
        align-items: center;
        gap: 10%;

        p {
            font-family: 'Inter', sans-serif;
            text-wrap: nowrap;            
            margin: 0;       
            width: 100%;     
            color: white;
        }
    }                    

    header{        
        height: 87px;
        background-color: $primary;
        box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;        
        display: flex;        
        overflow: visible;
    }

    nav li{
        margin-right: 10px;
    }

    nav a{
        color: #EEEEEE;
        font-family: 'Inter', sans-serif;
        font-weight: bold;
        font-size: 20px;
        text-decoration: none;
        transition: all .5s;
    }    

    div button {
        transition: all .5s;
        color: white;
    }

    nav a:hover, div button:hover{
        transition: all .5s;
        color: $secondary !important;
        cursor: pointer;
    }    

    nav a {
        color: white !important;
    }

    .dropdown-item:active {
        background-color: #f8f9fa;
    }

    nav button{        
        font-size: 25px;
        border: none;
        background-color: $primary;
        color: #EEEEEE;
    }

    .dropdown-item{
        color: $primary !important;
        border-radius: 10px 10px 10px 10px;
    }    

    .dropdown-menu{                
        box-shadow: 0 0 20px 0 #64646F;
        border: none;
        z-index: 1000;     
        padding: 0;   
    }
</style>