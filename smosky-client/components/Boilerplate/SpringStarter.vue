<template>
 <ClientOnly>
  <div class="border border-slate-200 rounded-md grid grid-cols-1 md:grid-cols-3">
    <!-- Project -->
    <div class="border-r border-slate-200 flex flex-col gap-2">
      <BoilerplateSpringStarterProjectConfig />
    </div>
    <!-- Project Metadata -->
    <div class="border-r border-slate-200">
     <BoilerplateSpringStarterMetadataConfig/>
    </div>
    <!-- Entities -->
    <div>
      <BoilerplateSpringStarterDependency/>
    </div>
  </div>
 </ClientOnly>
</template>

<script setup lang="ts">
import type { ISpringDependencyGroup } from '~/types/model';


defineProps({
 data: Array as () => ISpringDependencyGroup[],
});
</script>

<style scoped></style>
