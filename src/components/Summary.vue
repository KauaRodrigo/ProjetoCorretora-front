<template>
    <div class="summary">
        <h1>Resumo</h1>
        <ul>
            <li>
                <SquareSummary type="Veicular"/>
            </li>
            <li>
                <SquareSummary type="Residencial"/>
            </li>
            <li>
                <SquareSummary type="Vida"/>
            </li>
            <li>
                <SquareSummary type="Empresarial"/>
            </li>
            <li>
                <SquareSummary type="Viagem"/>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import SquareSummary from './baseComponents/SquareSummary.vue';
</script>

<style scoped lang="scss">
    @import "../assets/__variables.scss";
    
    .summary{
        overflow: visible;
        margin-top: 1rem;
        margin-bottom: 2.5rem;
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
        margin-top: 20px;
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