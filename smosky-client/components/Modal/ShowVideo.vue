<template>
 
    <UModal
      :model-value="isOpen"
      @update:model-value="toggleModal"
      :ui="{
        width: 'w-full sm:max-w-2xl',
      }"
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
        <div v-if="previewLink" class="flex items-center py-4 pb-20">
          <iframe
          width="560"
          height="315"
          class="mx-auto"
          :src="previewLink"
          frameborder="0"
          allowfullscreen
        ></iframe>
        </div>
      </div>
    </UModal>
</template>
w
<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  previewLink?:string;
}>();


const emit = defineEmits(["update:isOpen"]);

const toggleModal = () => {
  emit("update:isOpen", !props.isOpen);
};
</script>

<style scoped></style>
