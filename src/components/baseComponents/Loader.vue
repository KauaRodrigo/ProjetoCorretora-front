<template>
    <div class="wrapper">
        <div class="loader" :class="{ big, small }"></div>
        <div v-if="text" class="text-wrapper">
            <p>{{ text }}</p>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps<{
    text?: string,
    small?: boolean,
    big?: boolean
}>()
</script>
<style scoped lang="scss">
.wrapper {
    width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.loader {
    border: 4px solid transparent;
    border-top: 4px solid #3498db;
    border-radius: 80%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite; 
}

.big {
    width: 80px;
    height: 80px;
    border: 8px solid transparent;
    border-top: 8px solid #3498db;
}

.small {
    width: 20px;
    height: 20px;
    border: 2px solid transparent;
    border-top: 2px solid #3498db;
}

.text-wrapper {
    width: 13ch;
}
p {    
    width: 13ch;
    white-space: nowrap;
    overflow: hidden;
    animation: typing 2s steps(5) infinite;
}

@keyframes typing {
    from {
        width: 10ch;
    }
}

@keyframes blinking {
    50% {
        border-color: transparent;
    }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>