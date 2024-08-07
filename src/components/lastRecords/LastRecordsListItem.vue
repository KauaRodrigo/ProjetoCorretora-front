<template>
    <div class="item" v-if="row">
        <span>{{ row.code }}</span>
        <span>{{ row.cliente }}</span>
        <span>{{ row.company.toLowerCase() }}</span>
        <span :title="row.event">{{ row.event }}</span>
        <span>{{ row.type.toLowerCase() }}</span>
        <span>
            <div class="tag">
                {{ row.status == 'RETORNO_REPARO' ?  row.status.replace('_', ' ').toLowerCase() : row.status.toLowerCase() }}<i class="bi bi-circle-fill" :class="{'closed': row.status == 'FECHADO' || row.status == 'CANCELADO', 'opened': row.status == 'ABERTO' || row.status == 'INDENIZADO'}"></i>
            </div>
        </span>
        <span class="d-flex justify-content-end actions">            
            <div class="btn edit" @click="editRegister(row.id)"><i class="fa-solid fa-pen-nib"></i></div>
            <div class="btn bg-warning" @click="atualizaSinistro()"><i class="fa-solid fa-arrows-rotate"></i></div>
            <div v-if="mostraBotaoCancelar(row.status)" class="btn bg-danger" @click="deleteSinistro()"><i class="fa-solid fa-xmark"></i></div>
        </span>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps<{ row: any }>()
const emits = defineEmits(['deleteSinistro', 'atualizaSinistro']);
const router = useRouter();

function deleteSinistro() {    
    emits('deleteSinistro');
}

function atualizaSinistro() {
    emits('atualizaSinistro');
}

function mostraBotaoCancelar(status: string): boolean {
    let removeBotao = [
        'CANCELADO',
        'INDENIZADO',
        'FECHADO'
    ]

    if(removeBotao.includes(status)) {
        return false
    }
    return true;
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
@import '../../assets/_variables';
.item {
    padding: 0.8%;
    display: grid;    
    background-color: #e2e2e2;    
    grid-template-columns: 0.5fr 0.8fr 0.6fr 0.7fr 0.5fr 0.7fr 0.7fr;
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
    div {            
        display: flex;
        align-items: center;
        //width: 35%;
        height: 30px;
        border: none;              
        color: white;
        justify-content: center;  
        border-radius: 5px;    
    }
    .edit{
        background-color: #0094FF;
    }

    i{
        font-size: 15px;
    }

    .close{
        background-color: #e5c122c3;
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