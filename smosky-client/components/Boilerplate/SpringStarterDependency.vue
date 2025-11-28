<template>

       <ClientOnly>
        <div class="p-4 flex items-center justify-between ">
        <p class="font-semibold">Dependencies</p>
        <ModalAddSpringDependency v-if="boilerplate" :list-selected="springDependenciesSelected" :data="boilerplate?.dependencies" @on-add-item="onAddSpringDependency"/>
      </div>
     <div class="px-4 pb-4 overflow-y-scroll max-h-[500px] scrollbar">
      <div :class="`p-4 bg-slate-100 rounded-md mt-4 group ${item.required ? 'opacity-80 cursor-not-allowed' :''}`" v-for="item in springDependenciesSelected" :key="item.name">
            <h4 class="font-medium flex items-start justify-between">{{ item.name }}
              <UIcon v-show="!item.required" @click="() => onRemoveSpringDependency(item)" name="i-heroicons-x-circle" class="w-5 h-5  text-red-600 cursor-pointer hidden group-hover:block"/>
            </h4>
            <p class="text-sm">{{ item.description }}</p>
            
        </div>
     </div>
       </ClientOnly>
</template>

<script setup lang="ts">
import type { ISpringDependencyItem } from "~/types/model";

const boilerplateStore = useBoilerplateStore()

const {boilerplate,springDependenciesSelected} = storeToRefs(boilerplateStore);


const onRemoveSpringDependency = (data : ISpringDependencyItem) =>{
  boilerplateStore.onSpringDependenciesSelectedChange(springDependenciesSelected.value.filter(item => item.id!==data.id))
}

const onAddSpringDependency = (item : ISpringDependencyItem) =>{
  const data = [item,...springDependenciesSelected.value]
 boilerplateStore.onSpringDependenciesSelectedChange(data)
}



</script>

<style scoped>

</style>~/utils/springPostgres.data