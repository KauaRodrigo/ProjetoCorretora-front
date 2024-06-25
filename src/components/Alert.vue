<template>
    <div v-if="show" class="alert">
        <h1>{{ title }}</h1>
        <h4>{{ content }}</h4>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';


defineProps<{title: string, content: string}>();

const show = ref(false);

onMounted(() => {
    show.value = true
    setTimeout(() => {
        const alert = (document.getElementsByClassName('alert'))[0];
        alert.classList.add('fadeOut')
        destoyAlert();
    }, 5000)
})

function destoyAlert() {
    setTimeout(() => {
        show.value = false;
    }, 1000)
}

</script>
<style lang="scss" scoped>
    @import '../assets/_variables';

    .alert {
        background-color: $primary;
        opacity: 0.5;
        max-width: 30%;
        position: fixed;
        bottom: 5px;
        right: 5px;
        margin: 0;
        min-height: 12%;         
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
        transition: all 1s;
        opacity: 0;
    }

</style>