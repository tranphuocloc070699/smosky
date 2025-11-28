<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean;
  readOnly: boolean;
  size?: number;
}>();
const emit = defineEmits(["update:isOpen","callback"]);

const toggleModal = () => {
  emit("update:isOpen", !props.isOpen);
};

const handleCallback = () => {
  emit("callback")
};
</script>

<template>
  <UModal
      class="w-"
  :model-value="isOpen"
  @update:model-value="toggleModal"
  :ui="{
    width: 'w-full sm:max-w-2xl',
  }"
  >
   <UCard>
     <UButton
         color="gray"
         variant="ghost"
         icon="i-heroicons-x-mark-20-solid"
         class="-my-1"
         @click="toggleModal"
     />

     <div class="p-10 bg-amber-50">
       <UButton
           color="gray"
           variant="ghost"
           class="-my-1"
           @click="handleCallback"
       >
         Callback
       </UButton>
     </div>
     This is test modal
   </UCard>
  </UModal>
</template>

<style scoped>

</style>