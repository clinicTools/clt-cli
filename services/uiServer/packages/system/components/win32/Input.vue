<template>
    <div class="input">
        <label>{{ name }}</label>
        <div class="border">
            <input style="width: 100%;" :type="type" />
        </div>
    </div>
</template>
<script>
import { Navigation } from "system"
export default {
    props: ["name", "type", "enterkeyhint", "position"]
}
</script>
<style>

    .input {
        width: 100%;
        position: relative;
        font-family: 'Segoe UI WestEuropean','Segoe UI','-apple-system','BlinkMacSystemFont','Roboto','Helvetica Neue',sans-serif;
    }

    .input label {
        font-size: 14px;
        font-weight: 600;
        color: rgb(50, 49, 48);
        box-sizing: border-box;
        box-shadow: none;
        margin: 0px;
        display: block;
        padding: 5px 0px;
        overflow-wrap: break-word;
    }

    .input .border {
        margin: 1px;
    }

    .input input {
        font-size: 14px;
        font-weight: 400;
        box-shadow: none;
        padding: 0px 8px;
        box-sizing: border-box;
        background: none transparent;
        color: rgb(50, 49, 48);
        width: 100%;
        text-overflow: ellipsis;
        outline: 0px;
        border: 1px solid rgb(96, 94, 92);
        border-radius: 2px;
        cursor: text;
        height: 32px;
    }
    .input input:focus {
        border-width: 2px;
        border-color: var(--ion-color-primary);
    }
    
</style>