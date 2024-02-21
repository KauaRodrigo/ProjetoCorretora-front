<template>
    <div>
        <div class="container link-wrapper">
            <RouterLink :to="{ name: 'main'} ">Início</RouterLink>
            <RouterLink :to="{ name: 'login'} ">Sinistro</RouterLink>
            <RouterLink :to="{ name: 'login'} ">Clientes</RouterLink>
            <button @click="emits('openModalLogout')"><i class="bi bi-box-arrow-in-right"></i></button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const emits = defineEmits(['openModalLogout'])

</script>
<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    div{
        width: 100%;
        height: 87px;
        background-color: $primary;
        box-shadow: rgba(0,0,0,0.25) 0 4px 4px 0;
    }
    .link-wrapper {
        display: flex;
        align-items: center;
        gap: 3%;
        box-shadow: none;
    }
    
    div a{
        color: #EEEEEE;
        font-family: 'Inter', sans-serif;
        font-weight: bold;
        font-size: 20px;
        text-decoration: none; 
    }

    div a:hover, div button:hover{
        color: $secondary;
        cursor: pointer;
    }

    div button{
        position: absolute;   
        right: 8vw;
        font-size: 25px;
        border: none;
        background-color: $primary;
        color: #EEEEEE;
    }
</style>