<template>
    <div class="label">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: []
}
</script>
<style scoped>
    .label {
        height: 100%;
        font-family: 'Segoe UI WestEuropean','Segoe UI','-apple-system','BlinkMacSystemFont','Roboto','Helvetica Neue',sans-serif;
        width: 100%;
        list-style-type: none;
        user-select: none;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        box-sizing: border-box;
    }
    .label::v-deep(h3), .label::v-deep(h4), .label::v-deep(h5), .label::v-deep(h6) {
        margin-left: 0;
        margin-right: 0;
        margin-top: 2px;
        margin-bottom: 2px;
        font-size: 14px;
        font-weight: normal;
        line-height: normal;
    }
    .label::v-deep(p) {
        color: #666666;
        margin-left: 0;
        margin-right: 0;
        margin-top: 0;
        margin-bottom: 2px;
        font-size: 14px;
        line-height: 20px;
        text-overflow: inherit;
        overflow: inherit;
    }
</style>