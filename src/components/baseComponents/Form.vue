<template>
    <form :formData="formData" @submit.prevent="emits('submit')" method="post">
        <slot>

        </slot>
        <div v-if="actions" class="actions">
            <button type="submit" class="btn btn-success">Enviar</button>
            <button @click="router.back()" class="btn btn-danger">Cancelar</button>            
        </div>        
    </form>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps<{ formData: {}, actions: boolean }>()
const emits = defineEmits(['submit'])

const router = useRouter()
</script>
<style scoped lang="scss">

</style>