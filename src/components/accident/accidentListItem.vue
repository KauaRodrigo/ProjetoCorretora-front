<template>
    <div class="item" v-if="row">
        <span>{{ row.code }}</span>
        <span>{{ row.clientName }}</span>
        <span>{{ row.company }}</span>
        <span>{{ row.event }}</span>
        <span>{{ row.type }}</span> 
        <span>
            <div class="tag">
                {{ row.status == 'ABERTO' ? 'Em aberto' : row.status }}<i class="bi bi-circle-fill" :class="{'closed': row.status == 'FECHADO', 'opened': row.status == 'ABERTO'}"></i>
            </div>
        </span>
        <span class="d-flex justify-content-start actions">            
            <div class="btn edit">Editar</div>
            <div class="btn close">Fechar</div>
        </span>       
    </div>
</template>
<script setup lang="ts">
import AccidentItem from '../../dtos/AccidentItem.dto'
defineProps<{ row: AccidentItem }>()
</script>
<style scoped lang="scss">

</style>