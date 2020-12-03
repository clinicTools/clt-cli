<template>
    <ion-content :fullscreen="fullscreen">
        <slot></slot>
    </ion-content>
</template>
<script>
export default {
    props: ["fullscreen"]
}
</script>