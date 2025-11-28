<template>
  <div>
    <div class="flex justify-between">
      <InteractiveReviewInfo />
      <ModalCreateReview v-if="boilerplate?.id" :id="boilerplate?.id" @on-submit="onSubmit" />
    </div>
    <div v-if="boilerplate" class="max-w-[708px] py-4 mt-10">
      <div class="py-4" v-for="item of boilerplate.reviews" :key="item.id"  >
        <InteractiveReviewItem :data="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import type { ICreateReview } from "~/types/request";

const boilerplateStore = useBoilerplateStore()
const {boilerplate} = storeToRefs(boilerplateStore);

const emit = defineEmits(['onSubmit'])

const onSubmit = (dto : ICreateReview) =>{
  emit('onSubmit',dto)
}

</script>

<style scoped></style>
