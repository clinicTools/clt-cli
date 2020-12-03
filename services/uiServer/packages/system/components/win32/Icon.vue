<template>
    <ion-icon class="icon" :color="color" :name="name + '-win32'"></ion-icon>
</template>
<script>
export default {
    props: ["color", "name"]
}
</script>
<style scoped>
    .icon {
        pointer-events: none;
    }
</style>