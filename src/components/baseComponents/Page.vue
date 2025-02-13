<template>
    <div class="page">
        <div class="content">
            <div class="container justify-content-between align-items-center">
                <h2>{{ titulo }}</h2>
                <slot name="actions">
                    
                </slot>
            </div>
            <slot>

            </slot>            
        </div>
    </div>
</template>
<script setup lang="ts">
defineProps<{ titulo?: string }>()

</script>
<style scoped lang="scss">   
@import '../../assets/__variables.scss';

    .page {
        padding: 1% 0;
    } 
    .content {
        padding: 0 2%;
    } 
    h2 {
        color: $tertiary;
    }   
</style>