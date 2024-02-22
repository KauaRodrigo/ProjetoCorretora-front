<template>
    <div class="updates">
        <h1>Últimos registros</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Código</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Seguradora</th>
                    <th scope="col">Evento</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Status</th>
                    <th scope="col">Edição</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>0000001</td>
                    <td>Splinter Havan</td>
                    <td>Star Proteção Veicular</td>
                    <td>Sinistro de engavetamento</td>
                    <td>Veicular</td>
                    <td>Em aberto<i class="bi bi-circle-fill"></i></td>
                    <td><button class="edit">Editar</button><button class="close">Fechar</button></td>
                </tr>
                <tr>
                    <td>0000002</td>
                    <td>Leonardo Americanas</td>
                    <td>Unifique Telecomunicações</td>
                    <td>Incêndio</td>
                    <td>Residencial</td>
                    <td>Em aberto<i class="bi bi-circle-fill"></i></td>
                    <td><button class="edit">Editar</button><button class="close">Fechar</button></td>
                </tr>
                <tr>
                    <td>0000003</td>
                    <td>Rafael Neo</td>
                    <td>Boa Vida</td>
                    <td>Infarto Fulminante</td>
                    <td>Vida</td>
                    <td>Em aberto<i class="bi bi-circle-fill"></i></td>
                    <td><button class="edit">Editar</button><button class="close">Fechar</button></td>
                </tr>
                <tr>
                    <td>0000004</td>
                    <td>Donatello Presidente</td>
                    <td>B2 Seguro Empresarial</td>
                    <td>Furto</td>
                    <td>Empresarial</td>
                    <td>Finalizado<i class="bi bi-circle-fill closed"></i></td>
                    <td><button class="edit">Editar</button><button class="close">Fechar</button></td>
                </tr>
                <tr>
                    <td>0000005</td>
                    <td>Michelangelo Dalcanale</td>
                    <td>Decolar Seguros</td>
                    <td>Virose</td>
                    <td>Viagem</td>
                    <td>Finalizado<i class="bi bi-circle-fill closed"></i></td>
                    <td><button class="edit">Editar</button><button class="close">Fechar</button></td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script setup lang="ts">
    import UpdateBox from './baseComponents/UpdateBox.vue';
</script>

<style scoped lang="scss">
    @import "../src/assets/__variables.scss";
    .updates h1{
        color: $primary;
        font-weight: bold;
        font-size: 20px;
        //margin-bottom: -15px;
    }

    th:first-child{
        border-radius: 10px 0 0 0;
    }

    th:last-child{
        border-radius: 0 10px 0 0;
    }

    tr th{
        background-color: $primary;
        color: #EEEEEE;
    }

    td{
        background-color: #EEEEEE;
    }

    td:last-child{
        justify-content: space-between;
    }

    tr:last-child td:first-child{
        border-radius: 0 0 0 10px;
        //background-color: red;
    }

    tr:last-child td:last-child{
        border-radius: 0 0 10px 0;
        //background-color: red;
    }

    i{
        color: #008000;
        font-size: 10px;
        margin-left: 5px;
    }

    .closed{
        color: #C00000;
    }

    .edit{
        background-color: #0094FF;
        margin-right: 8px;
    }

    .close{
        background-color: #C00000;
    }

    .edit, .close{
        //margin: 0 10px;
        width: 60px;
        height: 30px;
        border: none;
        //padding: 2.5% 5%;
        color: white;
        border-radius: 5px;
    }
</style>