<template>
    <ion-button class="button" :class="{'icon': type === 'icon'}">
        <slot></slot>
    </ion-button>
</template>
<script>
export default {
    props: ["type"],
}
</script>
<style scoped>
    .button.icon::v-deep(ion-icon) {
        font-size: 28px;
    }
</style>