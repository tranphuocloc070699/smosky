<template>
  <div>
  <!--   <h2 class="text font-semibold text-lg py-4 flex items-center">
      
      Boilerplate
    </h2> -->
    <AppTitle :data="{title:'Boilerplates',iconName:''}">
      <template #image>
        <img
        src="@/assets/images/ci-cd.svg"
        alt="Home"
        width="24"
        height="24"
        class="w-7 h-7 pr-2"
      />
      </template>
      <template #default>
        <div class="pb-4">
        <div class="grid grid-cols-1 gap-4">
      <InteractiveImageItem v-for="item of boilerplateList.boilerplates" :key="item.id" :data="item" />
    </div>
      </div>
      </template>
    
    </AppTitle>
    
  </div>
</template>

<script setup lang="ts">
import { useBoilerplateList } from '~/composables/useState';
import { useBoilerplateStore } from '~/stores/boilerplate.store';

const boilerplateState = useBoilerplateList();
const {boilerplateList} = useBoilerplateStore();

</script>


<style scoped></style>
