<template>
    <div class="updateBox">
        <img v-if="src" :src="src" alt="Fotos do cliente">
        <img v-else="" src="/img/no-image.png" alt="Sem fotos do cliente">
        <h1>{{ name }}</h1>
        <h2>{{ cpf }}</h2>
        <span>Telefone: {{ phone }}</span><br>
        <span>Endereço: {{ adress }}</span><br>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        src:string,
        cpf:string,
        name:string,
        phone:string,
        adress:string,
    }>()
</script>

<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    .updateBox{
        background-color: #EEEEEE;
        box-sizing: border-box;
        width: 100%;
        //max-width: 291px;
        //height: 285px;
        border-radius: 10px;
        padding: 10px;
        //align-items: center;
        display: inline-block;
    }

    .updateBox img{
        width: 100%;
        height: 145px;
        object-fit: cover;
        border-radius: 10px;
    }

    .updateBox h1{
        color: #717171;
        font-weight: 500;
        font-size: 18px;
        margin-top: 10px;
    }

    .updateBox h2{
        color: #717171;
        font-weight: bold;
        font-size: 16px;
        margin: 0;
    }

    .updateBox span{
        color: #717171;
        font-size: 14px;
        display: inline-block;
        //line-height: 1px;
        //color: rgba(113, 113, 113, 0.93);
        //max-width: 100%;
        height: 0px;
        //overflow: hidden;
        margin: 0;
    }

    .updateBox i{
        font-size: 8px;
        margin-left: 3px;
        //display: inline-block;
    }
</style>