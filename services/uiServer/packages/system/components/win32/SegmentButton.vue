<template>
    <div class="segmentButton" :class="{'selected': value === selected.value}" :value="value" @click="click">
        <div class="sub">
        <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ["value"],
    methods: {
        click(e) {
            this.setSelected(this.value)
        }
    },
    inject: ["selected", "setSelected"]
}
</script>
<style scoped>
    .segmentButton {
        font-weight: 400;
        position: relative;
        height: 34px;
        line-height: 34px;
        display: inline-block;
        margin: 0px 8px 0px 0px;
        padding: 0px 8px;
        color: rgb(50, 49, 48);
        cursor: pointer;
    }
    .segmentButton:hover {
        background-color: rgb(243, 242, 241)
    }

    .segmentButton .sub {
        padding: 0px 5px;
    }

    .segmentButton:before {
        background-color: transparent;
        bottom: 0px;
        content: "";
        height: 2px;
        left: 8px;
        position: absolute;
        right: 8px;
        transition: left 0.267s cubic-bezier(0.1, 0.25, 0.75, 0.9) 0s, right 0.267s cubic-bezier(0.1, 0.25, 0.75, 0.9) 0s;
    }    

    .segmentButton.selected {
        font-weight: 600;
    }
    .segmentButton.selected:before {
        background-color: rgb(0, 120, 212);
    }
    .segmentButton.selected:hover:before {
        left: 0px;
        right: 0px;
    }
</style>