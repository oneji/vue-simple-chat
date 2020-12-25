<template>
    <div class="the-overlay" v-if="show">
        <b-spinner style="width: 3rem; height: 3rem;" label="Загрузка..." variant="primary"></b-spinner>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
    .the-overlay {
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #fff;
    }
</style>