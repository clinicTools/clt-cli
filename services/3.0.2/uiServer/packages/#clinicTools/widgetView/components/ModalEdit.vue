<template>
    <Modal title="Dashboards" @close="$emit('close')">
        <List lines="full">
            <ReorderGroup disabled="false" @reorder="reorder">
                <Item v-for="dashboard in dashboards" :key="dashboard.name">
                    <ion-input :value="dashboard.name" @ionBlur="dashboard.name = $event.target.value;"></ion-input>
                    <ReorderItem></ReorderItem>
                </Item>
            </ReorderGroup>
        </List>
    </Modal>
</template>
<script>
export default {
    data: () => {
        return {
            dashboards: [] //UserSettings.get("dashboards")
        }
    }
    ,methods: {
        reorder(e) {
            e.detail.complete(this.dashboards);
        } 
    }
    ,components: {
        Modal: ModalComponent
    }
}
</script>