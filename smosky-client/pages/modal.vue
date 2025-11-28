<script setup lang="ts">
const open = ref(false);
const toggleModal = () =>{
  open.value = !open.value;
}
const handleCallback = () =>{
alert("this is callback")
}
</script>

<template>
<div class="p-10">
  This is modal page
  <ModalTest :is-open="open" @update:is-open="toggleModal" @callback="handleCallback"/>
  <UButton @click="toggleModal">Click to open modal</UButton>
</div>
</template>

<style scoped>

</style>