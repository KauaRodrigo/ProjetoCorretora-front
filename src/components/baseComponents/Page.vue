<template>
    <div class="page">
        <Menu />
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
import Menu from './Menu.vue'
defineProps<{ title?: string }>()
</script>
<style scoped lang="scss">
    .page {
        height: 100%;
        .content {
            padding: 4%;
        }
    }
</style>