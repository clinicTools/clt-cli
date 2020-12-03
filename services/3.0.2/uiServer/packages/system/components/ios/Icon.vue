<template>
    <ion-icon :color="color" :name="name  + '-ios'"></ion-icon>
</template>
<script>
export default {
    props: ["color", "name"]
}
</script>