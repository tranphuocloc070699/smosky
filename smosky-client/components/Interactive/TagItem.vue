<template>
  <div
    v-if="data"
    :class="` px-4 py-1 rounded-3xl flex items-center gap-2 text-sm font-normal border border-slate-400  cursor-pointer transition duration-300 ease-in-out hover:brightness-95`"
  >
    <div class="w-3 h-3 bg-blue-700 rounded-full opacity-80">
      
    </div>
    {{ data.name }}
  </div>
</template>

<script setup lang="ts">
import type { ITag } from "~/types/model";

defineProps<{
  data?: ITag;
}>();
</script>

<style scoped></style>
