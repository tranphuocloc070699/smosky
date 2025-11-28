<template>
  <!-- Project - Project item -->
  <div class="p-4 flex-col gap-2 pb-0">
    <p class="font-semibold">Project</p>
    <div class="grid grid-cols-3">
      <URadio
          v-for="option of projectOptions"
          :key="option.value"
          v-model="createBoilerplateData.type"
          v-bind="option"
      />
    </div>
  </div>
  <!-- Project - Language -->
  <div class="p-4 flex-col gap-2 pb-0">
    <p class="font-semibold">Language</p>
    <div class="grid grid-cols-3">
      <URadio
          v-for="option of languageOptions"
          :key="option.value"
          v-model="languageSelected"
          v-bind="option"
      />
    </div>
  </div>
  <!-- Project - Spring Boot Version -->
  <div class="p-4 flex-col gap-2 pb-0">
    <p class="font-semibold">Spring Boot version</p>
    <div class="grid grid-cols-2">
      <URadio
          v-for="option of springBootVersionOptions"
          :key="option.value"
          v-model="createBoilerplateData.bootVersion"
          v-bind="option"
      />
    </div>
  </div>
  <!-- Project Packaging -->
  <div class="p-4 flex-col gap-2 pb-0">
    <p class="font-semibold">Packaging</p>
    <div class="grid grid-cols-3">
      <URadio
          v-for="option of packagingOptions"
          :key="option.value"
          v-model="createBoilerplateData.metadata.packaging"
          v-bind="option"
      />
    </div>
  </div>
  <!-- Project Java Version -->
  <div class="p-4 flex-col gap-2">
    <p class="font-semibold">Java version</p>
    <div class="grid grid-cols-3 font-light">
      <URadio
          v-for="option of javaVersionOptions"
          :key="option.value"
          v-model="createBoilerplateData.metadata.jvmVersion"
          v-bind="option"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  projectOptions,
  languageOptions,
  springBootVersionOptions,
  packagingOptions,
  javaVersionOptions
} from '~/utils/springPostgres.data'
import {useCreateBoilerplateData} from '~/composables/useState';

const languageSelected = ref("java");
const createBoilerplateData = useCreateBoilerplateData();

</script>

<style scoped>

</style>~/utils/springPostgres.data