<template>
    <div class="summary">
        <h1>Resumo</h1>
        <div class="squares">
            <div class="group">
                <div class="squareSummary">
                    <i class="bi bi-car-front"></i>
                    <div class="key">
                        <h5>Em aberto</h5>
                        <h5>Indenizados</h5>
                    </div>
                    <div class="value">
                        <h6>103</h6>
                        <h6>206</h6>
                    </div>
                </div>
                <h2>Veicular</h2>
            </div>

            <div class="group">
                <div class="squareSummary">
                    <i class="bi bi-house"></i>
                    <div class="key">
                        <h5>Em aberto</h5>
                        <h5>Indenizados</h5>
                    </div>
                    <div class="value">
                        <h6>103</h6>
                        <h6>206</h6>
                    </div>
                </div>
                <h2>Residencial</h2>
            </div>

                <div class="group">
                <div class="squareSummary">
                    <i class="bi bi-heart-pulse"></i>
                    <div class="key">
                        <h5>Em aberto</h5>
                        <h5>Indenizados</h5>
                    </div>
                    <div class="value">
                        <h6>103</h6>
                        <h6>206</h6>
                    </div>
                </div>
                <h2>Vida</h2>
            </div>

                <div class="group">
                <div class="squareSummary">
                    <i class="bi bi-briefcase"></i>
                    <div class="key">
                        <h5>Em aberto</h5>
                        <h5>Indenizados</h5>
                    </div>
                    <div class="value">
                        <h6>103</h6>
                        <h6>206</h6>
                    </div>
                </div>
                <h2>Empresarial</h2>
            </div>

                <div class="group">
                <div class="squareSummary">
                    <i class="bi bi-airplane"></i>
                    <div class="key">
                        <h5>Em aberto</h5>
                        <h5>Indenizados</h5>
                    </div>
                    <div class="value">
                        <h6>103</h6>
                        <h6>206</h6>
                    </div>
                </div>
                <h2>Viagem</h2>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    *{
        font-family: 'Inter', sans-serif;
        font-weight: bold;
    }
    
    .summary h1{
        color: $primary;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 5px;
    }

    .squares{
        width: 100%;
        display: grid;
        grid-template-columns: auto auto auto auto auto;
        justify-content: space-between;
        margin-bottom: 30px;
    }

    .group{
        text-align: center;
    }
    .group h2{
        font-weight: 200;
        color: $primary;
        font-size: 20px;
        margin-top: 7px;
    }
    
    .squareSummary{
        background-color: #EEEEEE;
        width: 150px;
        height: 150px;
        border-radius: 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        text-align: left;
    }

    .squareSummary h5{
        font-size: 13px;
        font-weight: bold;
        line-height: 26px;
    }

    .squareSummary h6{
        color: $secondary;
        font-size: 22px;
    }

    .squareSummary i{
        color: rgba(0, 50, 99, 0.1);
        font-size: 120px;
        position: absolute;
    }



    
    @media screen and (max-width: 940px) {
        
        .group h2{
                font-size: 18px;
            }
            
        .squareSummary{
                width: 130px;
                height: 130px;
            }

            .squareSummary i{
                font-size: 100px;
            }

        @media screen and (max-width: 800px) {

            .squares{
                display: grid;
                grid-template-columns: auto auto auto;
            }

            .group h2{
                font-size: 20px;
            }

            .squareSummary{
                width: 150px;
                height: 150px;
            }

            .squareSummary i{
                font-size: 120px;
            }

            @media screen and (max-width: 550px) {

                .group h2{
                    font-size: 18px;
                }

                .squareSummary{
                    width: 130px;
                    height: 130px;
                }

                .squareSummary i{
                    font-size: 100px;
                }

                @media screen and (max-width: 480px){
                    .squares{
                        grid-template-columns: auto auto;
                    }

                    .group h2{
                        font-size: 20px;
                    }

                    .squareSummary{
                        width: 150px;
                        height: 150px;
                    }

                    .squareSummary i{
                        font-size: 120px;
                    }
                }
            }
        }
    }
</style>