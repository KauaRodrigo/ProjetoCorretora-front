<template>
    <div>
        <textarea :placeholder=placeHolder rows="2"></textarea>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        placeHolder:string,
    }>()
</script>
<style scoped lang="scss">
    @import "../../assets/__variables.scss";

    textarea{
        width: 100%;
        height: 150px;
        background-color: #f9f9f9;
        border: none;
        border-radius: 5px;
        padding: 0 13px;
    }

    textarea:focus-visible{
        outline: none;
    }

    textarea:focus{
        border: 1px solid $secondary;
        padding: 0 12px;
    }
</style>