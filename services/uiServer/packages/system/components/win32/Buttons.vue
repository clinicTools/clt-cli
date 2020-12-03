<template>
    <div class="buttons">
        <slot>
        </slot>
    </div>
</template>
<script>
export default {
    props: [],
    provide() {
        return {
            buttons: true
        }
    }
}
</script>
<style scoped>
    .buttons {
        display: flex;
    }
</style>