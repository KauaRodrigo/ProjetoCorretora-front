<template>
    <div>
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
</script>
<style scoped lang="css">
    div {
        height: 100%;
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: gray;
        opacity: 0.5;
    }
</style>