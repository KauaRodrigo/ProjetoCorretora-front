<template>
    <Page class="container">
        <form :formData="formData" @submit.prevent="submit">
            <div>
                <label for="">Nome</label>
                <input v-model="formData.sNome" type="text" class="w-50">
            </div>            
        </form>
        <div class="actions" id="actions">
            <button type="submit" class="btn btn-success">Confirmar</button>
            <button type="button" @click="() => router.back()" class="btn btn-danger">Cancelar</button>
        </div>
    </Page>
</template>
<script setup lang="ts">
import Page from '@/components/baseComponents/Page.vue';
import useSeguradoraStore from '../../stores/SeguradoraStore';
import { onMounted, ref } from 'vue';
import router from '../../router';

const seguradoraStore = useSeguradoraStore();
const formData = ref({ sNome: '' });

onMounted(() => {    
    $(window).on('resize', () => setResize());        
    setResize();
})

function setResize() {    
    let oActions = $('#actions');
    let oPage    = $('.page');
    
    oPage.css('height', $('#app').height() - 87);
    oActions.css('margin-top', oPage.height() - 150);
}

function submit() {    
    return seguradoraStore.cadastrarSeguradora(formData.value)
}
</script>
<style lang="scss" scoped>
@import url('/src/assets/inputbox.scss');

input {
    display: block;
}

.actions {          
    height: 40px;
    text-align: right;
    button:nth-child(1) {
        margin-right: 15px;
    }
}

</style>