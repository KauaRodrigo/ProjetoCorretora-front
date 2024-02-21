<template>
    <div class="item" v-if="row">
        <span>{{ row.code }}</span>
        <span>{{ row.clientName }}</span>
        <span>{{ row.company }}</span>
        <span>{{ row.event }}</span>
        <span>{{ row.type }}</span> 
        <span>
            <div class="tag tag-success">
                {{ row.status }}
            </div>
        </span>
        <span class="d-flex justify-content-end actions">
            <div class="btn btn-success"></div>
            <div class="btn btn-info"></div>
            <div class="btn btn-danger"></div>
        </span>       
    </div>
</template>
<script setup lang="ts">
defineProps<{ row: any }>()
</script>
<style scoped lang="scss">
@import '../../assets/_variables';
.item {
    display: grid;    
    background-color: transparent !important;    
    grid-template-columns: 0.3fr 0.8fr 0.4fr 1fr 0.8fr 0.5fr 0.4fr;
}
span {
    font-size: 16px;    
    text-transform: capitalize;
    padding: 3% 0;    
}
.actions {
    gap: 10px;
    div {
        height: 25px;        
    }
}

.tag {
    font-size: 14px;    
    color: black;
    text-align: center;    
    border-radius: 4px;
    display: flex;
    padding: 2% 4%;
    width: fit-content;
    align-items: center;
}

.tag-success {
    background: $secondary;
}
</style>