<template>
    <ion-header :collapse="collapse" :translucent="translucent">
        <slot></slot>
    </ion-header>
</template>
<script>
export default {
    props: ["translucent", "collapse"]
}
</script>