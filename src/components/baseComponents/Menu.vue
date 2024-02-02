<template>
    <div class="menu">
        <div class="menu-options">
            
        </div>
        <Profile username="KauaAdmin"/>
    </div>
</template>
<script setup lang="ts">
import Profile from './Profile.vue';
</script>
<style scoped lang="scss">
    @import "../assets/_variables.scss";
    .menu {
        .menu-options {
            color: white;
            justify-content: space-between;
            h4:hover {
                color: $secondary;
            }
        }
        height: 15%;
        max-width: 100%;
        padding: 2%;
        justify-content: space-between;
        display: flex;                
        align-items: flex-end;
        background-color: $primary;
    }
</style>