<template>
    <TheHeader />
    <Page>
        <div class="container">
            <h1>Buscar sinistro</h1>
            <form @submit.prevent="submit">
                <div class="row justify-content-between">
                    <div class="col-5">
                        <label>Nome, CPF, CNPJ ou placa</label>
                        <input type="text" v-model="formData.searchFilter">
                    </div>
                    <div class="col-4">
                        <label>Data</label>
                        <div class="date">
                            <div class="date-item">
                                <input type="date" v-model="formData.dataFilter.init">
                            </div>
                            <h6>Até</h6>
                            <div class="date-item">
                                <input type="date" v-model="formData.dataFilter.end">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-between">
                    <div class="vehicle col-6">
                        <div class="vehicle-item col-4">
                            <label>Número da apólice</label>
                            <input type="text" v-model="formData.policyNumberFilter">
                        </div>
                        <div class="vehicle-item">
                            <label>Seguradora</label>
                            <input type="text" v-model="formData.companyFilter"/>
                        </div>
                    </div>
                    <div class="col-3 selects">
                        <div>
                            <label>Tipo seguro</label>
                            <select name="status" v-model="formData.typeFilter">
                                <option value="">Não Filtrar</option>
                                <option value="VEICULAR">Veicular</option>
                                <option value="VIDA">Vida</option>
                                <option value="VIAGEM">Viagem</option>
                                <option value="EMPRESARIAL">Empresarial</option>
                                <option value="RESIDENCIAL">Residencial</option>
                            </select>
                        </div>
                        <div>
                            <label>Status</label>
                            <select name="status" v-model="formData.statusFilter">
                                <option value="">Não Filtrar</option>
                                <option value="ABERTO">Aberto</option>
                                <option value="INDENIZADO">Indenizado</option>
                                <option value="FECHADO">Fechado</option>
                                <option value="ARQUIVADO">Arquivado</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button id="registerCustomer">Buscar</button>
            </form>
            <AccidentList :rows="accidentList?.rows" :loading="loading"/>
        </div>
    </Page>
</template>

<script setup lang="ts">
    import TheHeader from '@/components/baseComponents/TheHeader.vue'
    import Page from '@/components/baseComponents/Page.vue';
    import Form from '@/components/baseComponents/Form.vue';
    import AccidentList from '@/components/accident/AccidentList.vue';
    import { onMounted, ref } from 'vue';
import useSinistroStore from '@/stores/SinistroStore';

    const sinistroStore = useSinistroStore()  

    const formData = ref({
        policyNumberFilter: '',
        companyFilter: '',
        searchFilter: '',
        dataFilter: {
            init: '',
            end: ''
        },
        statusFilter: '',
        typeFilter: ''
    })    

    const loading = ref(true)

    const accidentList: any = ref({})

    onMounted(async () => {        
        accidentList.value = await sinistroStore.getAccidentsByFilters(formData.value)        
        loading.value = false
    })

    async function submit() {
        loading.value = true
        accidentList.value = await sinistroStore.getAccidentsByFilters(formData.value)        
        loading.value = false
    }

</script>
<style scoped lang="scss">
    @import "../assets/__variables.scss";
    .selects {
        display: flex;
        gap: 5px;
        justify-content: end;
    }

    h1{
        color: $primary;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 2%;
    }

    input, select{
        width: 100%;
        height: 45px;
        background-color: #f9f9f9;
        border: none;
        border-radius: 5px;
        padding: 0 13px;
    }

    input:focus-visible, select:focus-visible{
        outline: none;
    }

    input:focus, select:focus{
        border: 1px solid $secondary;
        padding: 0 12px;
    }

    label{
        font-size: 18px;
        font-weight: bold;
        color: $primary;
        margin-top: 15px;
    }

    .date{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }

    .date h6{
        color: $primary;
        font-size: 16px;
        margin-top:8px;
    }
    .date-item{
        width: 45%;
    }

    .vehicle{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .vehicle-item{
        width: 49.5%;
    }


    #registerCustomer{
        background-color: $primary;
        color: white;
        font-weight: 700;        
        padding: 0.5% 1.5%;
        border-radius: 5px;
        font-size: 16px;
        transition: 0.1s;
        margin: 2% 0;        
        border: none;        
    }
    form {
        margin-bottom: 4%;
    }

    .searchResult{
        margin-top: 15px;
    }

    .searchResult h1{
        margin-bottom: 5px;
    }

    .result{
        padding: 0 10px;
        border: 1.5px solid #EEEEEE;
        border-radius: 10px;
    }

    .spacing{
        margin: 10px 0;
    }

</style>