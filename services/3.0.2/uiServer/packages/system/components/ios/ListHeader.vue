<template>
    <ion-list-header :lines="lines" style="font-size: 16px;">
        <slot></slot>
    </ion-list-header>
</template>
<script>
export default {
    props: ["lines"]
}
</script>