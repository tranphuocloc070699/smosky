<template>
  <div v-if="boilerplate" class="flex items-center gap-10">
    <div
      class="w-44 h-44 round shadow-lg flex flex-col gap-6 items-center justify-center relative"
    >
      <p class="text-2xl text-[#173952] font-semibold">
        {{ Math.ceil(boilerplate.starAvg)}}
      </p>
      <div class="absolute left-[25%] top-[45%]">
        <AppVoting :read-only="true" :rating-value="boilerplate.starAvg"/>
      </div>
      <p class="text-sm font-light text-[#173952]">
      {{ boilerplate.totalReview }} Reviews
      </p>
    </div>
    <div v-show="!isMobile" class="flex flex-col gap-2">
         <!-- Five Star -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          5
          <UIcon
            :name="`i-heroicons-star-solid`"
            class="w-4 h-4 text-amber-400"
          />
        </div>
        <UProgress
          :value="convertStarToPercent(boilerplate.fiveStar)"
          color="yellow"
          class="w-96"
        />
        <p class="text-sm">{{ boilerplate.fiveStar }}</p>
      </div>
      <!-- Four Star -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          4
          <UIcon
            :name="`i-heroicons-star-solid`"
            class="w-4 h-4 text-amber-400"
          />
        </div>
        <UProgress
          :value="convertStarToPercent(boilerplate.fourStar)"
          color="yellow"
          class="w-96"
        />
        <p class="text-sm">{{ boilerplate.fourStar }}</p>
      </div>
     

      <!-- Three Star -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          3
          <UIcon
            :name="`i-heroicons-star-solid`"
            class="w-4 h-4 text-amber-400"
          />
        </div>
        <UProgress
          :value="convertStarToPercent(boilerplate.threeStar)"
          color="yellow"
          class="w-96"
        />
        <p class="text-sm">{{ boilerplate.threeStar }}</p>
      </div>

      <!-- Two Star -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          2
          <UIcon
            :name="`i-heroicons-star-solid`"
            class="w-4 h-4 text-amber-400"
          />
        </div>
        <UProgress
          :value="convertStarToPercent(boilerplate.twoStar)"
          color="yellow"
          class="w-96"
        />
        <p class="text-sm">{{ boilerplate.twoStar }}</p>
      </div>
      <!-- One Star -->
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1">
          1
          <UIcon
            :name="`i-heroicons-star-solid`"
            class="w-4 h-4 text-amber-400"
          />
        </div>
        <UProgress
          :value="convertStarToPercent(boilerplate.oneStar)"
          color="yellow"
          class="w-96"
        />
        <p class="text-sm">{{ boilerplate.oneStar }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { useMobileDetector } from "~/composables/useState";

const boilerplateStore = useBoilerplateStore()
const {boilerplate} = storeToRefs(boilerplateStore);
const isMobile = useMobileDetector();
const convertStarToPercent = (value: number) => {
  if (!value || !boilerplate) return 0;

  return (value / boilerplate.value.totalReview) * 100;
};
</script>

<style scoped></style>
