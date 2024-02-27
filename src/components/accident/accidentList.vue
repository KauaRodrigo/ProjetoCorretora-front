<template>
    <div>
        <Table template="0.5fr 0.8fr 0.6fr 0.7fr 0.8fr 0.5fr 0.7fr" :headers="['Código', 'Cliente', 'Seguradora', 'Evento', 'Tipo', 'Status', '']">
            <AccidentListItem v-for="(value, index) of accidentList.rows" :key="index" :row="value"/>
        </Table>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import Table from '../baseComponents/Table.vue'
    import AccidentListItem from './accidentListItem.vue';
import useSinistroStore from '@/stores/SinistroStore';

    const accidentList = ref()
    const store = useSinistroStore()

    const props = defineProps<{ filters: any }>()

    onMounted(() => {
        accidentList.value = store.getAccidentsByFilters(props.filters)
    })
 
</script>
<style scoped lang="scss">

</style>