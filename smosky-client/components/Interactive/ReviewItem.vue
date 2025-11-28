<template>
  <div v-if="data" class="p-4 rounded border border-slate-300 bg-slate-50">
    <div class="flex items-center gap-4">
      <UAvatar
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
      />
       <div>
        <div class="flex items-center gap-2">
        <p class="text-base font-medium"> {{ data.name }}</p>
        <p class="text-sm text-slate-500">{{convertDateTimeToYMD(data.createdAt.toString())  }}</p>
       </div>
          <AppVoting :read-only="true" :rating-value="data.star"/>
       </div>

        


   
    </div>
    <p class="pt-4">{{ data.content }}</p>
  </div>
</template>

<script setup lang="ts">
import type { IReview } from '~/types/model';
import {convertDateTimeToYMD} from '~/utils/timer'
defineProps<{
  data:IReview
}>();

</script>

<style scoped></style>
