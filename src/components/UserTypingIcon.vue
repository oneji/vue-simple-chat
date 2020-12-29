<template>
    <div class="container-dot">
        <span class="dot" :style="`height: ${size}px; width: ${size}px;`"></span>
        <span class="dot" :style="`height: ${size}px; width: ${size}px;`"></span>
        <span class="dot" :style="`height: ${size}px; width: ${size}px;`"></span>
    </div>
</template>

<script>
export default {
    props: {
        size: {
            type: Number,
            default: 10
        }
    }
}
</script>

<style scoped>
    .container-dot {
        margin: 0;
        display: inline-block;
    }

    .dot {
        height: 10px;
        width: 10px;
        border-radius: 100%;
        display: inline-block;
        background-color: #B4B5B9;
        animation: 1.2s typing-dot ease-in-out infinite;
        margin-right: 5px;
    }

    .dot:nth-of-type(2) {
        animation-delay: 0.15s;
    }

    .dot:nth-of-type(3) {
        animation-delay: 0.25s;
    }

    @keyframes typing-dot {
        15% {
            transform: translateY(-35%);
            opacity: 0.5;
        }
        30% {
            transform: translateY(0%);
            opacity: 1;
        }
    }
</style>