<template>
    <div class="campo-pesquisavel-wrapper">
        <select id="opcao-campo" @change="(event: any)=>setTipoCampo(event)" class="campo-principal">
            <option v-for="oOption of aOptionsCampo" :coluna-pesquisa="oOption.sColuna" :value="oOption.value">{{ oOption.title }}</option>
        </select>
        <input id="campo" class="campo-pesquisavel" :type="sTipoCampo">
    </div>
</template>
<script lang="ts" setup>
import { UtilsCampos } from '@/utils/UtilsCampos';

const props = defineProps<{ aOptionsCampo: any }>();

let sTipoCampo: string;

function setTipoCampo(oEvento: any) {    
    const oCampo = UtilsCampos.getCampo('campo');
    const oValor = props.aOptionsCampo[oEvento.target.value];
    oCampo.off();
    
    oCampo.val('');
    sTipoCampo = oValor.type;

    if(sTipoCampo == 'numerico') {
        oCampo.prop('type', 'text').on('keyup', (event: any) => { oCampo.val(UtilsCampos.removeAlfaNumericos(event.target.value))});        
        return;
    }  

    if(sTipoCampo == 'cpf') {
        oCampo.prop('type', 'text').on('blur', (event: any) => { oCampo.val(UtilsCampos.mascaraCpf(event.target.value)) });
        return;
    }

    if(sTipoCampo == 'telefone') {
        oCampo.prop('type', 'text').on('blur', (event: any) => { oCampo.val(UtilsCampos.mascaraTelefone(event.target.value))});        
        return;
    }

    oCampo.prop('type', oValor.type)
}

</script>
<style lang="scss" scoped>
@import '/src/assets/inputbox.scss';
@import '/src/assets/_variables';

.campo-pesquisavel-wrapper {
    display: flex;
    width: 25vw;
    justify-content: left;

    input, select {
        border-radius: 0;
        border: 1px solid $tertiary;
        height: 40px;
    }

    .campo-principal {
        border-right: 0;
        width: max-content;        
    }
}

</style>