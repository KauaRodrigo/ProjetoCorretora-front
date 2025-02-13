<template>
    <div>
        <label>
            {{ titulo }}
            <input :type=tipoCampo :placeholder=placeHolder>
        </label>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        placeHolder: string,
        tipoCampo:   string,
        titulo:      string
    }>()
</script>
<style scoped lang="scss">
    @import "../../assets/__variables.scss";

    input{
        width: 100%;
        height: 45px;
        background-color: #f9f9f9;
        border: none;
        border-radius: 5px;
        box-shadow: 5px 5px 10px 1px lightgray;
        padding: 0 13px;
    }

    input:focus-visible{
        outline: none;
    }

    input:focus{
        border: 1px solid $secondary;
        padding: 0 12px;
    }
</style>