<template>
    <List lines="none" style="padding: 0;">
        <Item :detail="false" @click="edit" :button="true">{{ text.edit }}</Item>
        <Item :detail="false" :button="true">{{ text.share }}</item>
        <Item :detail="false" :button="true">{{ text.import}}</item>
        <Item :detail="false" @click="editAll" :button="true">{{ text.editAll }}</Item>
    </List>
</template>
<script>
import { Translator } from "system"
let translate = new Translator("#clinicTools/widgetView")

export default {
    data() {
        return {
            text: {}
        }
    },
    methods: {
        edit() { this.emit("changeEditMode", true); this.emit("close") },
        editAll() {},
    },
    async created() {
        let t = await translate.get();
        this.text = t;
    }
}
</script>