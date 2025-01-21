<template>
    <div class="squareSummary">
        <div class="square" @click="setFilterRedirect()">
            <i class="bi" :class="{'bi-car-front': type === 'Veicular', 'bi-house': type === 'Residencial', 'bi-heart-pulse': type === 'Vida', 'bi-briefcase': type == 'Empresarial', 'bi-airplane': type == 'Viagem' }"></i>            
            <div v-if="data && !loading" class="key">
                <h5>Em aberto</h5>
                <h5 title="Retorno Reparo" v-if="type == 'Veicular' || type == 'Residencial' || type == 'Empresarial'">Retorno rep.</h5>                    
            </div>
            <div v-if="data && !loading" class="value">
                <h6>{{ data?.aberto }}</h6>
                <h6 v-if="type == 'Veicular' || type == 'Residencial' || type == 'Empresarial'">{{ data?.retorno_reparo }}</h6>                
            </div>            
            <Loader v-else text="Carregando..."/>
        </div>
        <h2>{{ type }}</h2>
    </div>
</template>

<script setup lang="ts">
import useSinistroStore from '@/stores/SinistroStore'
import { computed, onMounted, ref } from 'vue';
import Loader from './Loader.vue';
import { useRouter } from 'vue-router';

    const props   = defineProps<{ type:string }>();    
    const store   = useSinistroStore();
    const router  = useRouter();
    const loading = ref(false);
    const data    = computed(() => store.squareData(props.type.toUpperCase()));

    onMounted(async () => {
        loading.value = true;
        await getSquareData();
        loading.value = false;
    })

    /**
     * Busca os dados referente ao tipo de sinistro específico
     * 
     * @return {void}
     */
    async function getSquareData() {        
        loading.value = true;
        await store.getSquareData(props.type.toUpperCase());        
        loading.value = false;
    }

    /**
     * Redireciona para a tela de busca de sinistros e preenche o filtro de tipo de sinistro
     * 
     * @return {void}
     */
    function setFilterRedirect() {
        store.getFilters({ type: props.type.toUpperCase() });
        router.push({ name: 'accidentSearch' });
    }
    
</script>

<style scoped lang="scss">
    @import "../../assets/__variables.scss";
    *{
        font-weight: bold;
    }
    
    .squareSummary{
        display: inline-block;        
        transition: all 0.4s;
    }

    .squareSummary:hover {
        transition: all 0.4s;
        transform: scale(1.15);
    }

    .squareSummary h2{
        text-align: center;
        font-weight: 200;
        color: $primary;
        font-size: 20px;
        margin-top: 7px;
    }
    
    .square{
        background-color: #EEEEEE;
        width: 150px;
        height: 150px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 8px;
    }

    .square h5{
        font-size: 16px;
        line-height: 26px;
        z-index: 100;
    }

    .square h6{
        color: $secondary;
        font-size: 25px;
        text-align: right;
    }

    .square i{
        color: rgba(0, 50, 99, 0.1);
        font-size: 120px;
        position: absolute;
        z-index: 0;
    }    

    @media screen and (max-width: 991px) {
        
        .squareSummary h2{
            font-size: 18px;
            margin-bottom: 20px;
        }
            
        .square{
            width: 130px;
            height: 130px;
        }

        .square i{
            font-size: 100px;
        }

        @media screen and (max-width: 820px) {

            .squareSummary h2{
                font-size: 20px;
            }

            .square{
                width: 150px;
                height: 150px;
                text-align: right;
            }

            .square i{
                font-size: 120px;
            }

            @media screen and (max-width: 595px) {

                .squareSummary h2{
                    font-size: 18px;
                }

                .square{
                    width: 130px;
                    height: 130px;
                }

                .square i{
                    font-size: 100px;
                }

                @media screen and (max-width: 515px){

                    .squareSummary h2{
                        font-size: 20px;
                    }

                    .square{
                        width: 150px;
                        height: 150px;
                    }

                    .square i{
                        font-size: 120px;
                    }

                    @media screen and (max-width: 390px){
                        .squareSummary h2{
                            font-size: 18px;
                        }

                        .square{
                            width: 130px;
                            height: 130px;
                        }

                        .square i{
                            font-size: 100px;
                        }
                    }
                }
            }
        }
    }
</style>