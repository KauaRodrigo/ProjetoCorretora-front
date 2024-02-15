<template>
    <TheHeader></TheHeader> 
    <div class="container">
        <Summary></Summary>
        <Updates></Updates>
    </div>
</template>

<script setup lang="ts">
    import TheHeader from '@/components/baseComponents/TheHeader.vue'
    import Summary from '@/components/Summary.vue'
    import Updates from '@/components/Updates.vue'
</script>
<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    *{
        overflow-x: hidden;
    }
    
    .container{
        margin-top: 20px;
    }

</style>