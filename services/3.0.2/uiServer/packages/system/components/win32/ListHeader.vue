<template>
    <div class="listheader" :class="{'lines-full': lines === 'full'}">
        <slot></slot>
    </div>
</template>
<script>
export default {
    inject: ["lines"]
}
</script>
<style scoped>
.listheader {
    font-family: 'Segoe UI WestEuropean','Segoe UI','-apple-system','BlinkMacSystemFont','Roboto','Helvetica Neue',sans-serif;
    padding: 10px;
    padding-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
}

.listheader.lines-full {
    border-bottom: 1px solid #c2c2c2;
}
</style>