<template>
    <div>
        <h1>{{ comment.usuario }}</h1>
        <textarea :readonly="!alterando" name="content" id="content" v-model="comment.conteudo"></textarea>
        <i>Adicionado em {{ oDataHora.data }} às {{ oDataHora.hora }}</i>
        <div v-if="showActions()" class="actions">
            <button v-if="!alterando" class="btn btn-info" @click="habilitarCampoComentario"><i class="text-white fa-solid fa-pencil"></i></button>
            <button v-if="!alterando" class="btn btn-danger" @click="openModalExclusaoComentario"><i class="fa fa-trash"></i></button>
            <button v-if="alterando" @click="alterarComentario" class="btn btn-success"><i class="fa fa-check"></i></button>
            <button v-if="alterando" @click="cancelarAlteracao" class="btn btn-danger"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <Modal v-if="showModal" texto="Tem certeza que deseja excluir esta atualização?" @confirmar="excluirComentario" @cancelar="closeModal" />
        <!-- <ModalExclusaoComentario v-if="showModal" @closeModal="closeModalExclusaoComentario" @excluirComentario="excluirComentario"/> -->
    </div>
</template>
<script setup lang="ts">
import api from '@/axios';
import { onMounted, ref, type Ref } from 'vue';
import Modal from '../Modal.vue';

const oDataHora: Ref<{ data: string, hora: string }> = ref({
    data: '',
    hora: ''
})

const props = defineProps<{ comment: any }>()
const emits = defineEmits(['refreshComments'])
const alterando = ref(false);
const showModal = ref(false)

onMounted(() => {        
    const oDataHoraComment = props.comment.dataComentario.split(' ');
    oDataHora.value.data = oDataHoraComment[0];
    oDataHora.value.hora = oDataHoraComment[1]
})

/**
 * Habilita o textarea para alterar um comentario
 */
function habilitarCampoComentario() {
    alterando.value = true;    
}

/**
 * Cancela a alteração do comentário e desabilita novamente o textarea
 */
function cancelarAlteracao() {
    alterando.value = false
}

/**
 * Faz a requisição para atualizar o conteúdo do comentário que está sendo alterado
 */
function alterarComentario() {
    api.post(`/sinistros/atualizarComentario/${props.comment.idComentario}`, {
        conteudo: props.comment.conteudo
    })
    const contentInput = document.getElementById('content')
    contentInput?.setAttribute('readonly', 'true')
    contentInput.style.pointerEvents = 'none'
    alterando.value = false;
}

/**
 * 
 * Faz a requisição para excluir o comentário selecionado
 * 
 */
async function excluirComentario() {
    await api.post(`/sinistros/excluirComentario/${props.comment.idComentario}`)
    closeModalExclusaoComentario()
    emits('refreshComments')
}

/**
 * Abre o modal para excluir o comentário
 */
function openModalExclusaoComentario() {
    showModal.value = true
}

/**
 * Fecha o modal de exclusão de comentário
 */
function closeModalExclusaoComentario() {
    showModal.value = false
}
 
/**
 * Habilita as ações de alterar e excluir um comentário caso o usuário logado seja o usuário que criou o comentário
 */
function showActions() {
    let user;
    if(api.defaults.headers.user) {
        user = JSON.parse(api.defaults.headers.user);
    }    
    return props.comment.idUsuario == user.id
}

</script>
<style lang="scss" scoped>
div {
    width: 50%;
    padding: 2%;
    background-color: #f0f0f0;
    border-radius: 10px;
    margin-top: 20px;
    max-height: 1200px;
    overflow-y: auto;

    h1 {
        font-size: 1.5rem;
        font-weight: 600;
    }

    textarea {
        background-color: white;
        padding: 2%;
        width: 100%;
        resize: none;
        word-wrap: break-word;
        padding: 1% 0;
        border-radius: 5px;
    }

    i {
        display: block;
        text-align: right;        
    }
}

@media screen and (max-width: 620px){
    div{
        width: 100%;
    }
}

.actions {
    width: 18%;        
    min-height: 40px;
    display: flex;
    justify-content: space-between;
    padding: 0% 1%;
    
}

#modalExclusao {
    display: hidden;
}
</style>
