<template>
    <ion-list :lines="lines">
        <div class="firstLine" v-if="lines === 'full' && firstLine !== false">
        </div>
        <slot></slot>
    </ion-list>
</template>
<script>
export default {
    props: ["lines", "firstLine"],
    provide() {
        return {
            lines: this.lines
        }
    }
}
</script>
<style>
    .firstLine {
        font-family: 'Segoe UI WestEuropean','Segoe UI','-apple-system','BlinkMacSystemFont','Roboto','Helvetica Neue',sans-serif;
        background-color: #c2c2c2;
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 1px;
    }
</style>