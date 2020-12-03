<template>
    <ion-segment :value="value" @ionChange="change">
        <slot></slot>
    </ion-segment>
</template>
<script>
export default {
    props: ["value"],
    emits: ["change"],
    methods: {
        change(event) {
            this.$emit('change', event.detail.value)
        }
    }
    ,mounted() {
        this.$el.addEventListener("ionChange", (e) => { 
            this.change(e)
        })
    }
}
</script>