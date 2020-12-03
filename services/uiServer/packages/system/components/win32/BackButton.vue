<template>
    <button class="button" @click="goBack()" title="Zurück">
        <Icon name="arrow-back" style="font-size: 25px; margin-top: 1px;"></Icon>
    </button>
</template>
<script>
import { Navigation } from "system"
export default {
    methods: {
        goBack() {
            Navigation.pop();
        }
    }
}
</script>
<style scoped>
.button {
    height: 32px;
    width: 48px;
    color: #0078d7;
    border-radius: 0;
    background-color: transparent;
    outline: none;
}

.button:active {
    background: #979797;
}

.button:hover {
    color: #fff;
    background: #0078d7;
}
</style>