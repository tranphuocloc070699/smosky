<template>
  <div class="bg-slate-50 px-4">
    <div v-if="boilerplate" class="w-full mx-auto py-8 md:grid md:grid-cols-2 px-4 md:px-0">
      <div class="flex flex-col justify-between">
        <!-- Title -->
        <div class="flex flex-col gap-2 min-h-44">
          <div>
            <h2 class="text-xl text-slate-800 font-semibold">
              {{ boilerplate.name }}
            </h2>
            <!-- Description -->
            <h3 class="font-normal text-slate-600 text-base">
              {{ boilerplate.description }}
            </h3>
          </div>
          <!-- Rating -->
          <div v-if="type === 'boilerplate'" class="flex items-center gap-1">
            <AppVoting :rating-value="boilerplate.starAvg" :read-only="true"/>
            <h5 class="text-slate-500 font-light text-sm">
              ({{ boilerplate.totalReview }} voting)
            </h5>
            <a
                class="ml-4 font-semibold text-sm flex items-center gap-2 cursor-pointer hover:underline text-black"
                href="#boilerplate-review"
            >
              Show reviews
              <UIcon name="i-heroicons-chevron-down"/>
            </a>

          </div>
          <!-- Created by -->
          <!--     <h3 class="font-normal" v-if="type === 'boilerplate'">
                Created by
                <span
                  class="pl-2 underline font-medium text-green-700 cursor-pointer"
                  >GoodThingTakeTime</span
                >
              </h3> -->
        </div>

        <div v-if="type === 'boilerplate'" class="flex items-center gap-10">
          <NuxtLink :to="`/boilerplate/explore/${boilerplate.name}`"
          >
            <UButton class="py-2 px-6">Let's explore</UButton>
          </NuxtLink
          >
          <!-- <UButton color="white" class="py-2 px-6" v-show="isMobile" @click="showDemoOpen=true">Show demo</UButton> -->
        </div>

      </div>
      <!-- <div v-show="!isMobile" class="flex justify-end">
        <InteractiveVideo :preview-link="boilerplateItemState.previewLink" :thumbnail="boilerplateItemState.thumbnail" />
      </div> -->
    </div>
    <ModalShowVideo :is-open="showDemoOpen" :preview-link="boilerplate?.previewLink"
                    @update:is-open="toggleShowDemo"/>
  </div>
</template>

<script lang="ts" setup>

import {useMobileDetector} from '@/composables/useState'

const boilerplateStore = useBoilerplateStore()
const isMobile = useMobileDetector();

const {boilerplate} = storeToRefs(boilerplateStore);
/* 
  Input:
    - type:boilerplate || explore 
*/
defineProps<{
  type: string;
}>();

const showDemoOpen = ref(false);

const toggleShowDemo = (value: boolean) => {
  showDemoOpen.value = value
}


</script>

<style scoped></style>
