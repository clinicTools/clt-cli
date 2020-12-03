<template>
    <ion-list :lines="lines">
        <slot></slot>
    </ion-list>
</template>
<script>
export default {
    props: ["lines"]
}
</script>