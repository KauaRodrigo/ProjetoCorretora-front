<template>
    <div class="d-flex pagination justify-content-between">
        <select class="perPage" name="perPage" id="perPage" @change="emits('trocarNumerosItens')">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
        </select>
        <div class="page d-flex">
            <button :disabled="formData.page === 0" @click="emits('proximaPagina')"><i class="fa-solid fa-chevron-left"></i></button>
            <button :disabled="formData.page === (maxPage - 1)" @click="emits('paginaAnterior')"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
    </div>
</template>
<script lang="ts" setup>

defineProps<{ maxPage: number }>()
const emits = defineEmits(['trocarNumerosItens', 'proximaPagina', 'paginaAnterior']);

</script>
<style>

</style>