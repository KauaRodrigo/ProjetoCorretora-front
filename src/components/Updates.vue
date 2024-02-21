<template>
    <div class="updates">
        <h1>Últimos registros</h1>
        <UpdateBox msg="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque tenetur libero sapiente earum. Dicta voluptatum, soluta corporis et sapiente laborum praesentium quos eos similique blanditiis eligendi iure alias magnam commodi!" />
        <UpdateBox msg="Lorem ipsum, dolor sit amet consectetur adipisicing elit."/>
        <UpdateBox msg="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque tenetur libero sapiente earum. Dicta voluptatum, soluta corporis et sapiente laboru"/>
        <UpdateBox msg="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque tenetur libero sapiente earum. Dicta voluptatum, soluta corporis et sapiente laboru"/>
        <UpdateBox msg="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque tenetur libero sapiente earum. Dicta voluptatum, soluta corporis et sapiente laboru"/>

    </div>
</template>

<script setup lang="ts">
    import UpdateBox from './baseComponents/UpdateBox.vue';
</script>

<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    .updates h1{
        color: $primary;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 20px;
    }

</style>