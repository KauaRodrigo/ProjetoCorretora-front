<template>
    <div class="lista">
        <Table :headers="['Código', 'Nome', 'CPF', 'Telefone', 'Seguradora', '']" template="0.3fr 0.8fr 0.6fr 0.7fr 0.5fr 0.7fr">
            <ClientesListItem v-for="(oCliente, iIndex) of aClientes" :key="iIndex" :oCliente="oCliente" ></ClientesListItem>            
        </Table>
        <Loader v-if="false" :big="true">Carregando...</Loader>
    </div>
</template>
<script lang="ts" setup>
defineProps<{ aClientes: any[] }>();
import { onMounted } from 'vue';
import Loader from '../baseComponents/Loader.vue';
import Table from '../baseComponents/TableComponent.vue';
import ClientesListItem from './ClientesListItem.vue';

</script>
<style lang="scss" scoped>
@import '/src/assets/_variables.scss';

.lista {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #EEEEEE;
    border-radius: 10px 10px 10px 10px;
    margin-top: 2.5rem;    
}

</style>