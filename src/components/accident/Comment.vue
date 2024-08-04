<template>
    <div>
        <h1>{{ comment.usuario }}</h1>
        <p>{{ comment.conteudo }}</p>
        <i>Adicionado em {{ oDataHora.data }} às {{ oDataHora.hora }}</i>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';

const oDataHora: Ref<{ data: string, hora: string }> = ref({
    data: '',
    hora: ''
})

const props = defineProps<{ comment: any }>()

onMounted(() => {
    const oDataHoraComment = props.comment.dataComentario.split(' ');
    oDataHora.value.data = oDataHoraComment[0];
    oDataHora.value.hora = oDataHoraComment[1]
})

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
