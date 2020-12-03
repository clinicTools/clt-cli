<template>
    <ion-icon :color="color" :name="name  + '-outline'"></ion-icon>
</template>
<script>
export default {
    props: ["color", "name"]
}
</script>