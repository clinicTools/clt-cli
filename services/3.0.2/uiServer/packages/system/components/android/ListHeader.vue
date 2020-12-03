<template>
    <ion-list-header :lines="lines">
        <slot></slot>
    </ion-list-header>
</template>
<script>
export default {
    props: ["lines"]
}
</script>
