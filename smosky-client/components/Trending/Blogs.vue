<template>
  <div>
    <h2 class="text font-semibold text-lg py-4 flex items-center">
      <UIcon name="i-heroicons-newspaper" class="w-6 h-6 mr-2" />
      Blog
    </h2>
    <div class="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      <InteractiveBlogItem
        v-for="item in postList"
        :key="item.id"
        :data="item"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const postStore = usePostStore();

const { postList } = storeToRefs(postStore);
</script>

<style scoped></style>
