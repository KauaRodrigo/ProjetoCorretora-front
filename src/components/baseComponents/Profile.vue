<template>
    <div class="profile">
        <h6> {{ username }}</h6>  
        <span class="p-4 border rounded rounded-circle"></span>         
    </div>
</template>
<script setup lang="ts">
defineProps<{ username: string }>()
</script>
<style scoped lang="scss">
    .profile {
        display: flex;
        align-items: center;
        color: white;
        justify-content: space-between;
        width: 10%;
    }
</style>