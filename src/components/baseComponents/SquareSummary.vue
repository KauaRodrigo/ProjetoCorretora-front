<template>
    <div class="squareSummary">
        <div class="square">
            <i v-if="type=='Veicular'" class="bi bi-car-front"></i>
            <i v-if="type=='Residencial'" class="bi bi-house"></i>
            <i v-if="type=='Vida'" class="bi bi-heart-pulse"></i>
            <i v-if="type=='Empresarial'" class="bi bi-briefcase"></i>
            <i v-if="type=='Viagem'" class="bi bi-airplane"></i>
            <div class="key">
                <h5>Em aberto</h5>
                <h5>Indenizados</h5>
            </div>
            <div class="value">
                <h6>{{ open }}</h6>
                <h6>{{ indem }}</h6>
            </div>
        </div>
        <h2>{{ type }}</h2>
    </div>
</template>

<script setup lang="ts">
    defineProps<{
        open:string,
        indem:string,
        type:string,
    }>()
    
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
        margin: 0 auto;
        background-color: #EEEEEE;
        width: 150px;
        height: 150px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px;
    }

    .square h5{
        font-size: 13px;
        line-height: 26px;
    }

    .square h6{
        color: $secondary;
        font-size: 22px;
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