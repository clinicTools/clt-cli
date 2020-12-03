
<template>
    <Def 
        class="widget" 
        :style="{ top: calcTop, left: calcLeft, width: calcWidth, height: calcHeight }"
    >
        <slot></slot>
    </Def>
</template>
<style scoped>
    .widget {
        border: var(--ion-color-primary) dashed 2px; 
        position: absolute; 
        margin: 9px; 
        padding: 2px; 
        z-index: 1; 
        color: var(--ion-color-primary);
    }
</style>
<script>
import { Platform } from "system"

export default {
    props: ["top", "left", "height", "width", "editMode", "index"],
    data: () => {
        return {
            
        }
    },
    computed: {
        calcTop() {
            return (((this.top || 0) * 10) + (Platform.os.md? 54 : 44)) + "px"
        },
        calcLeft() {
            return `calc(calc(100% - 10px) / 12 * ${this.left})`
        },
        calcWidth() {
            return `calc(calc(calc(100% - 10px) / 12) * ${this.width} - 8px)`
        },
        calcHeight() {
            return `calc(calc(${this.height} * 10px) + 2px)`
        }
    }
}
</script>