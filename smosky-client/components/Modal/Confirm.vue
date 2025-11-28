<template>
    <div>
        <UModal :model-value="props.data.open" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Confirmation
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="onCloseModal"
            />
          </div>
        </template>
        <div>
          <p class="font-normal">{{ props.data.message }}</p>
          <p v-if="props.data?.notice" class="mt-2 flex justify-center items-center gap-2 bg-red-500 text-white py-2 px-4 text-center rounded text font-normal"><UIcon name="i-heroicons-information-circle" class="text-2xl"/> {{ props.data?.notice }}</p>
        </div>

        <div class="flex gap-4 justify-end mt-10">
            <UButton class="py-2 px-8" color="white" @click="onCloseModal">Close</UButton>
          <UButton class="py-2 px-8" @click="onConfirm">Submit</UButton>
        </div>
      </UCard>
    </UModal>
    </div>
</template>

<script setup lang="ts">
import type { IConfirmModal } from '~/types/components';

const props = defineProps<{
    data:IConfirmModal
}>()


const emit = defineEmits(['close','confirm'])

const onCloseModal = () =>{
    emit('close');
}

const onConfirm = () =>{
    emit('confirm');
}



</script>

<style scoped>

</style>