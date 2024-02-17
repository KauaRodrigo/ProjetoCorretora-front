<template>
    <TheHeader></TheHeader> 
    <div id="container">
        <Summary></Summary>
        <Updates></Updates>
    </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/baseComponents/TheHeader.vue'
import Summary from '@/components/Summary.vue'
import Updates from '@/components/Updates.vue'
import useUserStore from '@/stores/UserStore';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const store = useUserStore()
const router = useRouter()

onMounted(async () => {
    const isAuth = store.getUserAndToken()
    // if(!isAuth) {
    //     router.push({ name: 'login' })
    // }
})

</script>
<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    *{
        overflow-x: hidden;
    }
    
    #container{
        width: 85vw;
        margin: 0 auto;
        margin-top: 20px;
    }

</style>