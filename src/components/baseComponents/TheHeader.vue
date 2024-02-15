<template>
    <header>
        <nav class="navbar container navbar-expand">
            <div class="container">
                <ul class="navbar-nav">
                    <li class="nav-item"><a class="nav-link" href="#">Início</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sinistros</a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Registrar</a>
                            <a class="dropdown-item" href="#">Buscar</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Clientes</a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item" href="#">Cadastrar</a>
                            <a class="dropdown-item" href="#">Buscar</a>
                        </div>
                    </li>
                    
                </ul>
                <button><i class="bi bi-box-arrow-in-right"></i></button>
            </div>
        </nav>
        
    </header>
</template>

<script setup lang="ts">
</script>
<style scoped lang="scss">
    @import "../src/assets/__variables.scss";

    header{
        width: 100%;
        height: 87px;
        background-color: $primary;
        box-shadow: rgba(0,0,0,0.25) 0 4px 4px 0;
        overflow: visible;
        display: flex;
        //align-items: center;

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
        //margin: 0 3%;
    }

    nav a:hover, div button:hover{
        color: $secondary;
        cursor: pointer;
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
        box-shadow: rgba($color: #64646F, $alpha: 0.1) 0 0 20px 0;
        border: none;
    }
</style>