<template>
    <div class="summary">
        <h1>Resumo</h1>
        <ul>
            <li>
                <SquareSummary open=200 indem=100 type="Veicular"/>
            </li>
            <li>
                <SquareSummary open="200" indem="100" type="Residencial"/>
            </li>
            <li>
                <SquareSummary open="200" indem="100" type="Vida"/>
            </li>
            <li>
                <SquareSummary open="200" indem="100" type="Empresarial"/>
            </li>
            <li>
                <SquareSummary open="200" indem="100" type="Viagem"/>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import SquareSummary from './baseComponents/SquareSummary.vue';
</script>

<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    
    .summary{
        overflow: visible;

    }
    .summary h1{
        color: $primary;
        font-weight: bold;
        font-size: 20px;
        margin-bottom: 5px;
        overflow: visible;
    }
    
    ul{
        display: flex;
        padding: 0;
        justify-content: space-between;
        width: 100%;
    }

    li{
        list-style-type: none;
    }
    
    @media screen and (max-width: 820px) {
        li{
            flex-grow: 1;
            margin: 0 1.75%;
            text-align: center;
        }

        ul{
            flex-wrap: wrap;
        }
    }
    
</style>