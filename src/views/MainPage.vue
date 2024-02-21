<template>
        <div>
        <TheHeader></TheHeader> 
        <div class="container">
            <Summary></Summary>
            <Updates></Updates>
        </div>
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
        padding-top: 20px;
        overflow: visible;
    }

</style>