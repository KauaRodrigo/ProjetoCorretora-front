<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView, useRouter } from 'vue-router'
import useUserStore from './stores/UserStore';

const store = useUserStore()
const router = useRouter()

onMounted(async () => {
    const isAuth = store.getUserAndToken()
    if(!isAuth) {
        router.push({ name: 'login' })
    }
})
</script>

<template>
  <RouterView />
</template> 

<style scoped>
</style>
