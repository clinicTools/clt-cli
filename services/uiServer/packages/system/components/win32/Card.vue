<template>
    <div class="card">
        <slot></slot>
    </div>
</template>
<script>
    export default {
        props: [],
    }
</script>
<style scoped>
    .card {
        background-color: #efeff4;
        margin: 0;
        padding: none;
        /*border: 1px solid #c2c2c2;*/
    }
</style>