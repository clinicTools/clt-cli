<template>
    <button class="button"
        type="button"
        :class="{'icon': type === 'icon', 'buttons': buttons, 'color-primary': color === 'primary' }"
        :disabled="disabled"
        @click="$emit('click', $event)"
    >
        <slot name="start"></slot>
        <slot></slot>
        <slot name="end"></slot>    
    </button>
</template>

<script>
export default {
    emits: ["click"],
    props: {
        type: {
            type: String,
            default: 'button'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: ""
        }
    },
    inject: {
        'buttons': {
            default: false
        }
    }
};
</script>

<style scoped>
.button {
    font-family: 'Segoe UI WestEuropean','Segoe UI','-apple-system','BlinkMacSystemFont','Roboto','Helvetica Neue',sans-serif;
    font-size: 15px;
    height: 30px;
    background: #ccc;
    padding: 0 37px;
    border: 1px solid #ccc;
    color: #000100;
    border-radius: 0;
    outline: none;
    line-height: unset;
}

.button.icon {
    border-color: transparent;
    background: transparent;
    font-size: 28px;
    width: 32px;
    padding: 4px 3px;
    color: #0078d4;
}

.button.buttons {
    height: 32px;
    width: 48px;
    padding: 0;
    border-radius: 0;
    border-width: 0;
    background-color: transparent;
    outline: none;
    display: block;
}
button.buttons.icon {
    padding: 1px 3px;
}

.button.icon:hover {
    background-color: rgb(243, 242, 241);
    border-color: rgb(243, 242, 241);
}

.button:hover {
    border-color: #979797;
}

.button:disabled {
    color: #7a7a7a;
}

.button:disabled:hover {
    border-color: #ccc;
}

.button.color-primary {
  background: #0078d4;
  border-color: #0078d4;
  color: #fff;
}

.button.color-primary:hover {
    border-color: #7a7a7a;
}

.button.color-primary:disabled { 
    background: #ccc;
    border-color: #ccc;
}
</style>