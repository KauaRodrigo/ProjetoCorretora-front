<template>
    <div class="item" v-if="row">
        <span>{{ row.code }}</span>
        <span>{{ row.clientName }}</span>
        <span>{{ row.company }}</span>
        <span>{{ row.event ?? 'Não informado' }}</span>
        <span>{{ row.type }}</span> 
        <span>
            <div class="tag">
                {{ row.status }}<i class="bi bi-circle-fill" :class="{'closed': row.status == 'FECHADO', 'opened': row.status == 'ABERTO'}"></i>
            </div>
        </span>
        <span class="d-flex justify-content-end actions">            
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
.item {
    padding: 0.8%;
    display: grid;    
    background-color: #e2e2e2;    
    grid-template-columns: 0.5fr 0.8fr 0.6fr 0.7fr 0.8fr 0.5fr 0.7fr;
}
.item:nth-child(2n) {
    background-color: #EEEEEE;
}
.item:last-child {
    border-radius: 0 0 10px 10px;
}
span {
    font-size: 16px;    
    text-transform: capitalize;        
}

.actions {
    gap: 10px;    
    div {            
        display: flex;
        align-items: center;
        width: 35%;
        height: 30px;
        border: none;              
        color: white;
        justify-content: center;  
        border-radius: 5px;    
    }
    .edit{
        background-color: #0094FF;
    }

    .close{
        background-color: #C00000;
    }
}

.tag {
    text-transform: capitalize;
    display: flex;
    gap: 10px;
    align-items: center;
    i {
        font-size: 10px;
        color: #e5c122c3;
    }
    .closed {
        color: #C00000;
    }
    .opened {
        color: green;
    }
}
</style>