<template>
    <div class="page">
        <div class="content">
            <div class="d-flex justify-content-between align-items-center">
                <h1>{{ title }}</h1>
                <slot name="actions">
                    
                </slot>
            </div>
            <slot>

            </slot>            
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps<{ title?: string }>()

</script>
<style scoped lang="scss">   
    .page {
        padding: 1% 0;
    } 
    .content {
        padding: 0 2%;
    }    
</style>