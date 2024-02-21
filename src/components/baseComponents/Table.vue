<template>
    <table class="table-list">
        <thead>
            <tr>
                <th v-for="(header, index) of headers" :key="index">{{ header }}</th>
            </tr>
        </thead>
        <tbody>            
            <slot></slot>            
        </tbody>
    </table>
</template>
<script setup lang="ts">
defineProps<{ headers: string[], template: string }>()
</script>
<style scoped lang="scss">
    .table-list {
        background-color: transparent;
        display: grid;
    }
    th{
        font-size: 14px;
    }
    tr {
        display: grid;
        grid-template-columns: v-bind(template);
    }
</style>