<template>
  <NuxtLink
      v-if="data"
      :to="`/boilerplate/${data.name}`"
      class="p-4 border border-slate-200 rounded-md overflow-hidden cursor-pointer bg-gradient-to-b from-slate-50 flex items-start gap-4"
  >
    <img
        :src="data.thumbnail"
        alt="Image Thumbnail"
        class="h-20 w-20 object-contain"
        height="auto"
        width="auto"
    />
    <div>
      <h3 class="text-base font-medium flex-grow">
        {{ data.name }}
      </h3>
      <h4 class="text-slate-400 font-light text-base">
        {{ data.description }}
      </h4>
      <div class="flex items-center gap-2">
        <AppVoting :rating-value="data.starAvg" :read-only="true"/>
        <h5 class="text-slate-400 font-light text-sm">
          ({{ data.totalReview }} voting)
        </h5>
      </div>

    </div>

  </NuxtLink>
</template>

<script lang="ts" setup>
import type {IBoilerplate} from '~/types/model';

defineProps<
    {
      data: IBoilerplate
    }
>()
</script>

<style scoped></style>
