<template>
    <div>
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
    </div>
</template>
<script setup lang="ts">
defineProps<{ headers: string[], template: string }>()
</script>
<style scoped lang="scss">
    @import '../../assets/_variables';
    .table-list {
        background-color: transparent;
        display: grid;
    }
    thead {
        border-radius: 10px 10px 0 0;
        background-color: $primary;
        padding: 0.5%;
        th {
            color: #EEEEEE;             
            display: flex;
            align-items: center;
            padding: 2% 4%;
        }
    }
    tbody {
        border-radius: 0 0 10px 10px;
    }
      
    tr {
        display: grid;
        grid-template-columns: v-bind(template);
    }
</style>