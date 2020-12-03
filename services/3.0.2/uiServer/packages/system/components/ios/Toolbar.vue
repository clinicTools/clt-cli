<template>
    <ion-toolbar>
        <div slot="start">
            <slot name="start">
            </slot>
        </div>
        <slot></slot>
        <div slot="end">
            <slot name="end">
            </slot>
        </div>
    </ion-toolbar>
</template>
<script>
export default {
    props: []
}
</script>