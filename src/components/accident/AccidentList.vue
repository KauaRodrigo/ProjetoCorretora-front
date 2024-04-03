<template>    
    <div class="card-list" :class="{'p-4': loading }">
        <Table v-if="rows && !loading" template="0.5fr 0.8fr 0.6fr 0.7fr 0.8fr 0.5fr 0.7fr" :headers="['Código', 'Cliente', 'Seguradora', 'Evento', 'Tipo', 'Status', '']">
            <AccidentListItem v-for="(value, index) of rows" :key="index" :row="value"/>
        </Table>
        <div class="empty" v-if="rows && !rows.length">
            <h3>Nenhum sinistro cadastrado!</h3>
        </div>
        <Loader class="align-self-center" v-if="loading" text="Carregando..." big />
    </div>
</template>
<script lang="ts" setup>
    import Loader from '../baseComponents/Loader.vue';
    import Table from '../baseComponents/Table.vue'
    import AccidentListItem from './AccidentListItem.vue';

    defineProps<{ rows?: any, loading?: boolean }>()
 
</script>
<style scoped lang="scss">
@import '../../assets/_variables.scss';

.card-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #EEEEEE;
    border-radius: 10px 10px 10px 10px;

    .empty {
        height: 20rem;
        display: flex;
        align-items: center;
        justify-content: center;

        h3 {
            font-weight: 700;
            font-family: Arial, serif;
            color: $tertiary;
        }
    }
}
</style>