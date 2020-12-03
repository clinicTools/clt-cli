<template>
    <div class="segment" :value="value">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: ["value"],
    emits: ["change"],
    data() {
        return {
            selected: {
                value: 0
            }
        }
    },
    methods: {
        setSelected(val) {
            this.selected.value = val;
            this.$emit('change', this.selected.value)
        }
    },
    provide() {
        return {
            selected: this.selected,
            setSelected: this.setSelected
        }
    },
    mounted() {
        this.selected.value = this.value;
    }
}
</script>
<style scoped>
    .segment {
        padding-left: 10px;
        display: inline-block;
    }
</style>