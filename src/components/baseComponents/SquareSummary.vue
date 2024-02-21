<template>
    <div class="squareSummary">
        <div class="square">
            <i v-if="type=='Veicular'" class="bi bi-car-front"></i>
            <i v-if="type=='Residencial'" class="bi bi-house"></i>
            <i v-if="type=='Vida'" class="bi bi-heart-pulse"></i>
            <i v-if="type=='Empresarial'" class="bi bi-briefcase"></i>
            <i v-if="type=='Viagem'" class="bi bi-airplane"></i>
            <div v-if="data" class="key">
                <h5>Em aberto</h5>
                <h5>Indenizados</h5>
            </div>
            <div v-if="data" class="value">
                <h6>{{ data?.aberto }}</h6>
                <h6>{{ data?.indenizado }}</h6>
            </div>
            <Loader v-if="loading" text="Carregando..."/>
        </div>
        <h2>{{ type }}</h2>
    </div>
</template>

<script setup lang="ts">
import useSinistroStore from '@/stores/SinistroStore'
import { onMounted, ref } from 'vue';
import Loader from './Loader.vue';

    const props = defineProps<{
        open:string,
        indem:string,
        type:string,
    }>()
    
    const store = useSinistroStore();

    const loading = ref(false)
    const data = ref()

    async function getSquareData() {
        loading.value = true
        data.value = await store.getSquareData(props.type.toUpperCase());
        loading.value = false
    }

    onMounted(async () => {
        await getSquareData()
    }) 
    
</script>

<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    *{
        font-weight: bold;
    }
    
    .squareSummary{
        display: inline-block;
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
    }

    .square h5{
        font-size: 16px;
        line-height: 26px;
    }

    .square h6{
        color: $secondary;
        font-size: 25px;
    }

    .square i{
        color: rgba(0, 50, 99, 0.1);
        font-size: 120px;
        position: absolute;
    }

    @media screen and (max-width: 940px) {
        
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
                text-align: left;
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