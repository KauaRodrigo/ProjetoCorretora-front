<template>
    <div class="empty">
        <i class="bi bi-car-front"></i>
        <h3>Nenhum sinistro cadastrado <br/> nos últimos 7 dias!</h3>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
@import "../assets/_variables.scss";

.empty {
    height: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 12rem;

    h3 {
        font-weight: 700;
        font-family: Arial, serif;
        color: $tertiary;
        z-index: 1;
    }

    i {
        position: absolute;
        font-size: 20rem;
        z-index: 0;
        color: rgba(0, 50, 99, 0.1);
    }
}
</style>