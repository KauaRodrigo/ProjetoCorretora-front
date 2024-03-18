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
                            <RouterLink class="dropdown-item" :to="{ name: 'accidentRegister' }">Registrar</RouterLink>
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
                <button @click="emits('openModalLogout')"><i class="bi bi-box-arrow-in-right"></i></button>
            </div>
        </nav>
        
    </header>
</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    const emits = defineEmits(['openModalLogout'])
    
    const ipAdress = 'localhost'
    const port = '5173'
    
    const mainAdress = 'http://'+ipAdress+':'+port+'/main'
    const accidentRegister = 'http://'+ipAdress+':'+port+'/registrarSinistro'
    const accidentSearch = 'http://'+ipAdress+':'+port+'/buscarSinistro'
    const customerRegister = 'http://'+ipAdress+':'+port+'/cadastrarCliente'
    const customerSearch = 'http://'+ipAdress+':'+port+'/buscarCliente'
</script>
<style scoped lang="scss">
    @import "../src/assets/__variables.scss";

    header{
        width: 100%;
        height: 87px;
        background-color: $primary;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        overflow: visible;
        display: flex;

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
        padding: 6%;
        //margin: 0 3%;
    }

    .dropdown-item:first-child:hover {
        border-radius: 10px 10px 0 0;
    }

    .dropdown-item:last-child {
        border-radius: 0 0 10px 10px;
    }

    .show {
        color: $secondary !important;
    }

    nav a:hover, div button:hover{
        color: $secondary;
        cursor: pointer;
    }

    .dropdown-item:active {
        background-color: #f8f9fa;
    }

    nav button{
        //position: absolute;   
        //right: 8vw;
        font-size: 25px;
        border: none;
        background-color: $primary;
        color: #EEEEEE;
    }

    .dropdown-item{
        color: $primary;
    }

    .dropdown-menu{
        margin-top: -8px;
        padding: 0;
        box-shadow: rgba($color: #64646F, $alpha: 0.1) 0 0 20px 0;
        border: none;
    }
</style>