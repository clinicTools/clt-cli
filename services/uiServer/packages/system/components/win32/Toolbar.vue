<template>
    <div class="toolbar">
        <div class="top" :class="{'compressed': compressed === true}">
            <slot name="start">
                <div></div>
            </slot>
            <div v-if="compressed === true" class="top-middle">
                <slot>
                </slot>
            </div>
            <slot name="end">
            </slot>
        </div>
        <div v-if="compressed !== true" class="middle">
            <slot>
            </slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ["compressed"]
}
</script>
<style scoped>
    .toolbar {
        font-family: 'Segoe UI WestEuropean','Segoe UI','-apple-system','BlinkMacSystemFont','Roboto','Helvetica Neue',sans-serif;
        background-color: #efeff4;
    }

    clt-detail .toolbar {
        background-color: #fff;
    }

    .top {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        height: 32px;
        width: 100%;
    }
    .top.compressed {
        height: unset;
        min-height: 44px;
        padding-bottom: 5px;
    }

    .top-middle {
        width: 100%;
        flex: 1 1 0%;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0%;
        min-width: 0px;
    }
    .middle {
        line-height: 32px;
        padding: 0px 16px;
        height: 32px;
        width: 100%;
    }
</style>