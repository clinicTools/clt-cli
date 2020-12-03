<template>
    <ion-item :button="button" :detail="detail" @click="$emit('click')">
        <slot></slot>
    </ion-item>
</template>
<script>
    export default {
        emits: ["click"],
        props: ["button", "detail"]
    }
</script>