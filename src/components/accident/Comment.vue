<template>
    <div>
        <h1>{{ comment.usuario }}</h1>
        <p>{{ comment.conteudo }}</p>
        <i>{{ comment.dataComentario }}</i>
    </div>
</template>
<script setup lang="ts">

defineProps<{ comment: any }>()

</script>
<style lang="scss" scoped>
div {
    width: 50%;
    padding: 2%;
    background-color: #EEE;
    border-radius: 10px;
    margin-top: 20px;

    h1 {
        font-size: 1.5rem;
    }

    p {
        background-color: white;
        padding: 2%;
        border-radius: 5px;
    }

    i {
        display: block;
        text-align: right;
    }
}
</style>
