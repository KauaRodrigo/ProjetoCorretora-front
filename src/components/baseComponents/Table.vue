<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="(header, index) of headers" :key="index">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>                
                <slot></slot>            
            </tr>
        </tbody>
    </table>
</template>
<script setup lang="ts">
defineProps<{ headers: string[] }>()
</script>
<style scoped lang="scss">
    thead tr {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
</style>