<template>
    <div class="lista">
        <Table :headers="['Código', 'Seguradora', '']" template="0.2fr 1fr 1fr">
            <SeguradorasListItem v-for="(oSeguradora, iIndex) of aSeguradoras" :key="iIndex" :oSeguradora="oSeguradora" ></SeguradorasListItem>            
        </Table>
        <Loader v-if="false" :big="true">Carregando...</Loader>
    </div>
</template>
<script lang="ts" setup>
defineProps<{ aSeguradoras: any[] }>();
import { onMounted } from 'vue';
import Loader from '../baseComponents/Loader.vue';
import Table from '../baseComponents/TableComponent.vue';
import SeguradorasListItem from './SeguradorasListItem.vue';

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