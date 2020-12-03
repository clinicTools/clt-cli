<template>
        <Header>
            <Toolbar :compressed="true">
                <Title>{{title}}</Title>
                <template #start>
                    <Buttons>
                        <Button v-if="win32 !== true" @click="$emit('close')" type="icon">
                            <Icon name="close"></Icon>
                        </Button>
                    </Buttons>
                    <Def v-if="win32" style="width: 10px;">
                    </Def>
                </template>
                <template #end>
                    <Buttons>
                        <Button v-if="win32 === true" @click="$emit('close')" type="icon">
                            <Icon name="close"></Icon>
                        </Button>
                    </Buttons>
                </template>
            </Toolbar>
        </Header>
        <Content>
            <Header collapse="condense">
                <Toolbar style="--border-style: none;">
                    <Title size="large">{{title}}</Title>
                </Toolbar>
            </Header>
            <slot></slot>
        </Content>
</template>
<script>
import { Platform } from "system"

export default {
    emits: ["close"],
    props: {
        title: {
            default: "{{title}}"
        }
    }
    ,data: () => {
        return {
            win32: Platform.os.win32
        }
    }
}
</script>
<style scoped>
    body.win32 ion-content {
        --background: #fff;
    }
    body.win32 .toolbar {
        background: #fff;
    }
</style>