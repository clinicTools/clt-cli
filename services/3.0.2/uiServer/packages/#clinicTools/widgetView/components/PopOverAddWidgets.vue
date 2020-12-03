<template>
    <List lines="none" style="padding: 0;">
        <Item v-for="widget in widgets" :button="true" @click="add(widget)">{{ widget.name }}</Item>
    </List>
</template>
<script>
export default {
    data: () => {
        return {
            widgets: []
        }
    },
    methods: {
        add(widget) {
            this.emit("add", widget)
            this.emit("close")
        }
    }
}
</script>