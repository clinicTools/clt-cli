<template>
    <div class="item" @click="$emit('click')" :class="{'button': button, 'lines-full': lines === 'full'}">
        <slot>
        </slot>
        <Icon v-if="detail === true" name="chevron-forward" class="chevron"></Icon>
    </div>
</template>
<script>
export default {
    emits: ["click"],
    props: ["button", "detail"],
    inject: ["lines"]
}
</script>
<style scoped>
    .item {
        font-family: 'Segoe UI WestEuropean','Segoe UI','-apple-system','BlinkMacSystemFont','Roboto','Helvetica Neue',sans-serif;
        background-color: #fff;
        border-left: 2px solid transparent;
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .item.button {
        cursor: pointer;
    }

    .item.button:hover {
        background-color: #e7e7e7;
        border-left-color: #0078d7;
    }

    .item.lines-full:first-child {
        /*border-top: 1px solid #c2c2c2;*/
    }

    .item.lines-full {
        border-bottom: 1px solid #c2c2c2;
    }
    .item .chevron {
        font-size: 20px; 
        color: rgb(161, 159, 157);
    }
</style>