<template>
    <ion-segment-button :value="value">
        <slot></slot>
    </ion-segment-button>
</template>
<script>
export default {
    props: ["value"]
}
</script>