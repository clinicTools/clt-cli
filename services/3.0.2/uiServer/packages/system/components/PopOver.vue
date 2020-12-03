<template>
    <IonPopover :isOpen="open" :event="event" :translucent="true" :showBackdrop="false" cssClass="all" >
        <slot>
        </slot>
    </IonPopover>
</template>
<script>
import { IonPopover } from "@ionic/vue"

export default {
    props: ["open", "event"]
    ,components: {
        "IonPopover": IonPopover
    }
}
</script>