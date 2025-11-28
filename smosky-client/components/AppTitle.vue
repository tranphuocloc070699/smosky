<template>

  <div class="w-full mx-auto py-4 px-4">
    <h3 class="text font-medium text-lg flex items-center pb-2">
      <UIcon v-if="data.iconName" :name="`i-${data.iconName}`" class="w-6 h-6 mr-2"/>
      <slot v-else name="image"/>
      {{ data.title }}
    </h3>
    <slot/>
  </div>

</template>

<script lang="ts" setup>
import type {IAppTitle} from '~/types/components';


defineProps<{
  data: IAppTitle;

}>()

</script>

<style scoped></style>
