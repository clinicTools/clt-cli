<template>
    <Label :position="position">{{ name }}</Label>
    <ion-input :type="type" :enterkeyhint="enterkeyhint"></ion-input>
</template>
<script>
import { Navigation } from "system"
export default {
    props: ["name", "type", "enterkeyhint", "position"]
}
</script>