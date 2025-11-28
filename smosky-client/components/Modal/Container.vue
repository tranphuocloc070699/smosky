<script setup lang="ts">
defineProps<{
  name:string
}>()

const open = ref(false);
const toggleModal = () =>{
  open.value = !open.value;
}
const handleCallback = () =>{
  alert("this is callback")
}


</script>

<template>
<ModalTest :is-open="open" @update:is-open="toggleModal" @callback="handleCallback"/>
</template>

<style scoped>

</style>