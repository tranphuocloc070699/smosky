<template>
  <!-- Navigation -->
  <div
    class="bg-slate-100 flex items-center gap-2 py-2 px-4 text-sm font-normal"
  >
    <span class="cursor-pointer hover:underline">Admin</span>
    <UIcon name="i-heroicons-chevron-right" />
    <strong class="cursor-pointer hover:underline">Create Tag</strong>
  </div>
  <div class="grid grid-cols-12 p-8 bg-gradient-to-b from-slate-100">
    <div class="col-span-4"></div>
    <div class="col-span-4">
      <h2 class="text-2xl font-medium text-center">Create Tag</h2>
      <div class="py-4">
        <label for="name" class="text-sm font-medium">Type</label>
        <USelect v-model="type" :options="types" />
      </div>
      <div class="py-4">
        <label for="name" class="text-sm font-medium">Tag Name</label>
        <UInput type="text" id="name" />
      </div>
      <div class="py-8 text-end">
        <UButton
          class="ml-4"
          color="emerald"
          label="Create New Tag"
          @click="handleSubmit"
        />
      </div>
    </div>
    <div class="col-span-4"></div>
  </div>
</template>

<script setup lang="ts">


const types = ['Post','CI CD']

const type = ref(types[0])

const handleSubmit = () => {
  
};
</script>

<style scoped></style>
