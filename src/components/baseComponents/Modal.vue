<template>
    <Overlay />
    <div class="modal-wrapper">
        <div class="modal-box" :style="{
            'width': `${width}px`,
            'height': `${height}px`
        }">
            <slot></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import Overlay from './Overlay.vue';

const props = defineProps<{ height: string, width: string}>();

</script>
<style scoped lang="scss">
.modal-wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-box {
    border-radius: 10px;
    padding: 2%;
    z-index: 999;
    background-color: white;
    box-shadow: 1px 1px 10px gray;
}
</style>