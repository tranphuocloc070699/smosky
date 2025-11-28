<template>
  <div class="bg-gradient-to-b from-slate-100">
    <!-- Navigation -->
    <h2 class="text-center py-8 text-2xl font-semibold">Admin Dashboard</h2>
    <UTabs :items="items" class="w-full p-4">
      <!-- <template #ci-cd="{ item }"> </template> -->

      <template #posts="{ item }">
        <div></div>
        <UTable :rows="postList" :columns="columns">
          <template #thumbnail-data="{ row }">
            <div>
              <img
                :src="row?.thumbnail"
                class="w-10 h-10 rounded-md"
                alt="Thumbnail"
              />
            </div>
          </template>
          <template #control-data="{row}">
            <div class="flex items-center gap-4">
              <UIcon name="i-heroicons-pencil-square" class="w-5 h-5 bg-amber-500 p-4 rounded cursor-pointer"/>
              <UIcon @click="onOpenModal(row)" name="i-heroicons-trash" class="w-5 h-5 bg-red-500 p-4 rounded cursor-pointer"/>
            </div>
          </template>
        </UTable>
      </template>

      <template #questions="{ item }"> </template>

      <template #reviews="{ item }"> </template>
    </UTabs>

    <UModal v-model="rowOpen">
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
          <p class="font-normal">Do you really want to delete the post: <b>{{ postRowSelected.title }}</b></p>
        </div>

        <div class="flex gap-4 justify-end mt-10">
            <UButton class="py-2 px-8" color="white" @click="onCloseModal">Close</UButton>
          <UButton class="py-2 px-8" @click="onConfirm">Yes</UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type { IColumn } from "~/types/components";
import type { IPost } from "~/types/model";
import { postInitValue } from "~/utils/stores/initValue";

const postStore = usePostStore();
const reviewStore = useReviewStore();
const { postList } = storeToRefs(postStore);
const {} = storeToRefs(reviewStore);

const postRowSelected = ref<IPost>(postInitValue)
const rowOpen = ref<boolean>(false)
const columns: IColumn[] = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "title",
    label: "Title",
  },
  {
    key: "thumbnail",
    label: "Thumbnail",
  },
  {
    key: "createdAt",
    label: "CreatedAt",
  },
  {
    key: "control",
    label: "Control",
  },
];

const items = [
  // {
  //   slot: "boilerplates",
  //   label: "Boilerplate",
  // },
  {
    slot: "posts",
    label: "Posts",
  },
  {
    slot: "questions",
    label: "Questions",
  },
  {
    slot: "reviews",
    label: "Reviews",
  },
];

const onOpenModal = (post : IPost) =>{
  rowOpen.value = true;
  postRowSelected.value = post
}

const onCloseModal = () =>{
  rowOpen.value = false;
  postRowSelected.value = postInitValue
}
const onConfirm = () =>{
  postStore.deletePost(postRowSelected.value.id,onCloseModal)
}
</script>

<style scoped></style>
