<template>
    <div class="updateBox">
        <p>{{ msg }}</p>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        msg:string
    }>()
</script>

<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    .updateBox{
        background-color: #EEEEEE;
        box-sizing: border-box;
        width: 100%;
        height: 63px;
        border-radius: 10px;
        padding: 0 15px;
        align-items: center;
        display: flex;
        margin-bottom: 20px;
    }

    .updateBox p{
        font-size: 16px;
        color: rgba(113, 113, 113, 0.93);
        max-width: 100%;
        height: 25px;
        overflow: hidden;
        margin: auto 0;
    }
</style>