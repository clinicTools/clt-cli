<template>
    <div class="title">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: []
}
</script>
<style scoped>
    .title {
        font-family: 'Segoe UI WestEuropean','Segoe UI','-apple-system','BlinkMacSystemFont','Roboto','Helvetica Neue',sans-serif;
        color: rgb(0,0,0);
        font-size: 16px;
        /*font-weight: 600;*/
        display: block;
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        pointer-events: auto;
    }
</style>