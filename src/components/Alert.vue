<template>
    <div class="alert">
        <div class="alertContent">
            <h1>{{ title }}</h1>
            <h4>{{ content }}</h4>
        </div>
        <div class="loaderBar"></div>                
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
    title: string, 
    content: string, 
    route: string
}>();

onMounted(() => {    
    setTimeout(() => {
        const alert = (document.getElementsByClassName('alert'))[0];
        alert.classList.add('fadeOut')
        destoyAlert();
        router.push({ name: props.route })
    }, 5000)    
})

/**
 * Fecha o alerta
 */
function destoyAlert() {
    $('#alert').hide();
}

</script>
<style lang="scss" scoped>
    @import '../assets/_variables';

    .alert {
        background-color: $primary;
        opacity: 0.5;
        max-width: 550px;
        min-width: 400px;
        position: fixed;
        bottom: 5px;
        right: 5px;
        margin: 0;
        min-height: 12%;
        padding: 0;
    }

    .alertContent {
        padding: 2%;
    }

    h4, h1 {        
        color: white;
        opacity: 1;
    }

    h1 {
        font-size: 1.4rem;
    }

    h4 {
        font-size: 1rem;
    }

    .fadeOut {        
        display: none;
    }

    .loaderBar {
        height: 10px;
        width: 100%;
        position: absolute;
        bottom: 0;
        background: black;
        animation: close 5s linear;
    }

    @keyframes close {
        0% {
            width: 100%;
        } 
        100% {
            width: 0;
        }
    }

</style>