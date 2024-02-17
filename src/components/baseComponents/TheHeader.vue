<template>
    <div>
        <a href="#">Início</a>
        <a href="#">Sinistros</a>
        <a href="#">Clientes</a>
        <button @click="logout"><i class="bi bi-box-arrow-in-right"></i></button>
    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/UserStore';
import { useRouter } from 'vue-router';

const store = useUserStore()
const router = useRouter()

function logout() {
    store.logout()
    router.push({ name: 'login' })
}

</script>
<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    div{
        width: 100%;
        height: 87px;
        background-color: $primary;
        box-shadow: rgba(0,0,0,0.25) 0 4px 4px 0;
        display: flex;
        align-items: center;

    }
    div a{
        color: #EEEEEE;
        font-family: 'Inter', sans-serif;
        font-weight: bold;
        font-size: 20px;
        text-decoration: none;
        margin: 0 3%;
    }

    div a:first-child{
        margin-left: 7.5vw;
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