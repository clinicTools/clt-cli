<template>
    <Header :translucent="true">
        <Toolbar>
            <template #start>
                <Buttons>
                    <Def v-if="root === true">
                        <Button @click="logout" type="icon" title="Abmelden">
                            <Icon color="danger" name="logout"></Icon>
                        </Button>
                    </Def>
                    <Def v-else>
                        <BackButton></BackButton>
                    </Def>
                </Buttons>
            </template>
            <Title>{{title}}</Title>
            <template #end>
                <Buttons>
                    <ion-menu-toggle menu="start" auto-hide="true">
                        <Button type="icon">
                            <Icon color="primary" name="menu"></Icon>
                        </Button>
                    </ion-menu-toggle>
                </Buttons>
            </template>
        </Toolbar>
    </Header>
    <Content>
        <Header collapse="condense">
            <Def v-if="border">
                <Toolbar>
                    <Title size="large">{{title}}</Title>
                </Toolbar>
            </Def>
            <Def v-else>
                <Toolbar style="--border-style: none;">
                    <Title size="large">{{title}}</Title>
                </Toolbar>
            </Def>
        </Header>
        <slot>
        </slot>
    </Content>
</template>
<script>
import { User } from 'system'
export default {
    props: {
        title: {
            default: "{{title}}"
        }
        ,root: {
            default: false
        }
        ,border: {
            default: true
        }
    }
    ,data: () => {
        return {
        }
    }
    ,methods: {
        logout() {
            User.logout()
        }
    }
    ,unmounted: function() {
        //REMOVE DATABINDING LISTENERS
    }
}
</script>