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
    background-color: #f0f0f0;
    border-radius: 10px;
    margin-top: 20px;
    //box-shadow: rgba(0,0,0,0.5) 0px 0px 3px;




    h1 {
        font-size: 1.5rem;
        font-weight: 600;
    }

    p {
        //background-color: white;
        padding: 1% 0;
        border-radius: 5px;
    }

    i {
        display: block;
        text-align: right;
        font-weight: lighter;
    }
}
</style>
