<template>
    <Overlay />
    <div v-bind="$attrs" class="modal-wrapper">
        <div class="modal-box" :style="customStyle">        
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import Overlay from './Overlay.vue';
defineProps<{customStyle: string}>();

</script>
<style scoped lang="scss">
@import '../../assets/_variables.scss';

.modal-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;    
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-box {
    position: relative;
    width: 90%;
    max-width: 500px;
    border-radius: 10px;
    padding: 2%;
    background-color: white;
    box-shadow: 1px 1px 10px gray;        
}


</style>