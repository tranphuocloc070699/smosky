<template>
  <div v-if="data" class="border border-slate-200 rounded p-4 fixed w-80 top-[100px] right-0">
    
    <div v-for="item in data" :key="item.id">
      <p @click="scrollToView(item.link)" class="block no-underline font-medium">{{ item.title }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IPostToc } from '~/types/model';

const props = defineProps({
  data: Array as () => IPostToc[],
  isMobile:Boolean
})

const scrollToView = (id : string) =>{
  if(document){
    document.getElementById(id)?.scrollIntoView();
  }
}
</script>

<style>

</style>