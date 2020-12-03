<template>
    <div>
        <div v-if="collapse !== 'condense'">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ["translucent", "collapse"]
}
</script>