<template>
  <NuxtLink
   :to="`/blogs/${data.slug}`"
    class="border border-gray-200 rounded-md overflow-hidden cursor-pointer"
    v-if="data"
  >
    <img
      :src="data.thumbnail"
      width="auto"
      height="auto"
      alt="Image Thumbnail"
      class="h-48 w-full object-cover"
    />
    <div class="px-4 pt-4">
      <h3 class="text-base font-medium flex-grow">
        {{ data.title }}
      </h3>
    </div>
    <div class="px-4 pt-4">
      <h4 class="text-gray-500 text-sm line-clamp-3">
       {{ data.preContent }}
      </h4>
    </div>
    <div class="px-4 text-xs text-gray-400 font-normal py-2">
      By
      <span
        class="text-sky-800 pl-1 underline cursor-pointer opacity-80 hover:opacity-100"
      >
        GoodThingTakeTime</span
      >
    </div>
    <div class="flex items-center justify-end gap-2 p-4">
      <InteractiveIconItem name="i-heroicons-heart" :counting="1" />
      <InteractiveIconItem
        name="i-heroicons-chat-bubble-bottom-center"
        :counting="4"
      />
      <InteractiveIconItem name="i-heroicons-bookmark" />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IPost } from '~/types/model';

defineProps<{
  data:IPost
}>()
</script>

<style scoped></style>