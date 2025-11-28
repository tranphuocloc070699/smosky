<template>
 
    <UModal
      :model-value="isOpen"
      fullscreen
      prevent-close
      @update:model-value="toggleModal"
    >
      <div>
        <div class="flex justify-end px-4 py-4 gap-4">

            <UButton
                icon="i-heroicons-arrow-down-tray"
                @click="onDownloadBoilerplateFromPreview"
            />
          <UButton
            class="-my-1"
            color="gray"
            icon="i-heroicons-x-mark-20-solid"
            variant="ghost"
            @click="toggleModal"
          />
        </div>
        <InteractiveProjectStructure :data="projectStructure"/>


      
      </div>
    </UModal>
</template>
w
<script lang="ts" setup>
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
