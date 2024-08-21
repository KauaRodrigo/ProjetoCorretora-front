<template>
    <div class="squareSummary">
        <div class="square" @click="setFilterRedirect()">
            <i v-if="type=='Veicular'" class="bi bi-car-front"></i>
            <i v-if="type=='Residencial'" class="bi bi-house"></i>
            <i v-if="type=='Vida'" class="bi bi-heart-pulse"></i>
            <i v-if="type=='Empresarial'" class="bi bi-briefcase"></i>
            <i v-if="type=='Viagem'" class="bi bi-airplane"></i>
            <div v-if="data" class="key">
                <h5>Em aberto</h5>
                <h5 v-if="type=='Veicular'">Retorno rep.</h5>
                <h5 v-if="type=='Residencial'">Retorno rep.</h5>
                <h5 v-if="type=='Empresarial'">Retorno rep.</h5>
            </div>
            <div v-if="data" class="value">
                <h6>{{ data?.aberto }}</h6>
                <h6 v-if="type=='Veicular'">{{ data?.retorno_reparo }}</h6>
                <h6 v-if="type=='Residencial'">{{ data?.retorno_reparo }}</h6>
                <h6 v-if="type=='Empresarial'">{{ data?.retorno_reparo }}</h6>                
            </div>
            <Loader v-if="loading" text="Carregando..."/>
        </div>
        <h2>{{ type }}</h2>
    </div>
</template>

<script setup lang="ts">
import useSinistroStore from '@/stores/SinistroStore'
import { computed, onMounted, provide, ref } from 'vue';
import Loader from './Loader.vue';
import { useRouter } from 'vue-router';

    const props = defineProps<{
        type:string,
    }>();
    
    const store  = useSinistroStore();
    const router = useRouter();

    const loading = ref(false);
    const data    = computed(() => store.squareData(props.type.toUpperCase()));

    async function getSquareData() {        
        loading.value = true;
        await store.getSquareData(props.type.toUpperCase());        
        loading.value = false;
    }

    onMounted(async () => {
        await getSquareData();
    }) 

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