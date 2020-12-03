<template>
        <IonModal :isOpen="true" :swipetoClose="true" @onDidDismiss="$emit('closed')">
            <ion-page>TEST</ion-page>
        </IonModal>
</template>
<script>
import {IonModal } from "@ionic/vue"

export default {
    props: ["open"],
    emits: ["closed"],
    data() {
        return {
            app: document.querySelector("ion-app")
        }
    }
    ,methods: {
        closed() {
            this.$emit('closed')
        }
    }
    ,mounted() {
        this.$el.addEventListener("onDidDismiss", () => {
            console.log("closed")
        });
    },
    components: {
        'IonModal': IonModal
    }
}
</script>