<template>
    <div :class="{ item: type === 'LIST', 'card-item': type === 'CARD' }" v-if="row">
        <span>{{  row.code }}</span>
        <span>{{ row.client }}</span>
        <span>{{ row.company.toLowerCase() }}</span>
        <span :title="row.event">{{ row.event || 'Não informado' }}</span>
        <span>{{ row.type.toLowerCase() }}</span>
        <span>
            <div class="tag">
                {{ row.status.toLowerCase() }}<i class="bi bi-circle-fill" :class="{'closed': row.status == 'FECHADO', 'opened': row.status == 'ABERTO'}"></i>
            </div>
        </span>
        <span class="d-flex justify-content-end actions">            
            <RouterLink :to="{ name: 'accidentEdit', params: { id: row.id }}" class="btn edit" @click="editRegister(row.id)"><i class="fa fa-pencil"></i></RouterLink>
            <button @click="deleteRegister(row.id)" class="btn close"><i class="fa fa-trash"></i></button>
        </span>       
    </div>
</template>
<script setup lang="ts">
import useSinistroStore from '@/stores/SinistroStore';
import type { AccidentItem } from '../../dtos/AccidentItem.dto';
import { useRouter } from "vue-router";
import { inject } from 'vue';

const sinistroStore = useSinistroStore();

defineProps<{ row: AccidentItem,type: string}>();
const reload = inject('reload');

const router = useRouter();

async function deleteRegister(id: number) {
    await sinistroStore.deleteAccident(id);    
    reload();
}

function editRegister(id: number) {    
    router.push({
        name: 'accidentEdit',
        params: {
            id
        }
    })
}
</script>
<style scoped lang="scss">

.card-item {
    padding: 0.8%;
    display: flex;    
    border-radius: 10px;    
    min-width: 20%;    
    margin: 0 1% 3% 0;
    flex-direction: column;    
    background-color: #EEE;        
    text-decoration: none;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px;
    color: black;    
}

.card-item:nth-child(4n) {
    margin-right: 0;
}

.item {
    z-index: -1;
    padding: 0.8%;
    display: grid;    
    background-color: #e2e2e2;    
    grid-template-columns: 0.5fr 0.8fr 0.6fr 0.8fr 0.5fr 0.7fr 0.5fr;
    text-decoration: none;
    color: black;    
}
.item:nth-child(2n) {
    background-color: #EEEEEE;
}
.item:last-child {
    border-radius: 0 0 10px 10px;
}
span {
    font-size: 16px;
    padding: 2% 4%;
    text-transform: capitalize;     
    text-wrap: nowrap;    
    overflow: hidden;
    text-overflow: ellipsis;       
}

.actions {
    gap: 10px;    
    a, button {            
        display: flex;
        align-items: center;
        width: 35%;
        height: 30px;
        border: none;              
        color: white;
        justify-content: center;  
        border-radius: 5px;    
    }
    button {
        z-index: 9999;
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