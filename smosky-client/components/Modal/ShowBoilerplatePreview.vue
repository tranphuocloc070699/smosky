<template>
 
    <UModal
      :model-value="isOpen"
      @update:model-value="toggleModal"
      fullscreen
      prevent-close
    >
      <div>
        <div class="flex justify-end px-4 py-4">
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="toggleModal"
          />
        </div>
        <AppTitle :data="{ title: 'Preview project', iconName: 'heroicons-chevron-double-up-16-solid' }">
          <InteractiveProjectStructure :data="projectStructure"/>

          <div class="flex items-end mt-10">
            <UButton
          class="px-4 py-2 min-w-32 flex items-center justify-center"
          @click="onDownloadBoilerplateFromPreview"
          >Download</UButton
        >
          </div>
      </AppTitle>


      
      </div>
    </UModal>
</template>
w
<script setup lang="ts">
import type { IProjectStructure } from '~/types/model';

const props = defineProps<{
  isOpen: boolean;
  projectStructure:IProjectStructure;
}>();




const emit = defineEmits(["update:isOpen","onBtnDownloadClick"]);

const onDownloadBoilerplateFromPreview = () =>{
  emit('onBtnDownloadClick')
}

const toggleModal = () => {
  emit("update:isOpen", !props.isOpen);
};
</script>

<style scoped></style>
