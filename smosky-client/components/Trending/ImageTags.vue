<template>
  <div>
    <!--  <h2 class="text font-semibold text-lg py-4 flex items-center text-tear-700">
       <img
         src="@/assets/images/tag.svg"
         alt="Home"
         width="24"
         height="24"
         class="w-6 h-6 pr-2"
       />
       Tags
     </h2> -->
    <AppTitle :data="{ title: 'Tags', iconName: '' }">
      <template #image>
        <img alt="Home" class="w-7 h-7 pr-2" height="24" src="@/assets/images/tag.svg" width="24" />
      </template>
      <template #default>
        <div class="flex flex-col items-center justify-center py-12 px-4">
          <!-- Icon -->
          <div class="w-16 h-16 mb-4 text-gray-400">
            <!-- You can replace this with any Hero Icon you prefer -->
            <!-- TagIcon for tags, FolderIcon for folders, DocumentIcon for documents, etc. -->
          </div>

          <!-- Title -->
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            No Tags Found
          </h3>

          <!-- Description -->
          <p class="text-gray-500 text-center max-w-sm mb-6">
            There are no tags available at the moment
          </p>


        </div>
        <!--        <div class="flex items-center flex-wrap gap-4">-->
        <!--          <div v-if="tagListState">-->
        <!--            <InteractiveTagItem v-for="item in tagListState" :key="item.id"-->
        <!--                                :data="item"/>-->
        <!--          </div>-->
        <!--          <div v-else>-->
        <!--            No Data-->
        <!--          </div>-->
        <!--        </div>-->
      </template>

    </AppTitle>

  </div>
</template>

<script lang="ts" setup>
import { useTagList } from '~/composables/useState'

const tagListState = useTagList();
const data = [
  {
    title: "Postgresql",
    color: "blue",
    background: "bg-blue-100",
    textColor: "text-blue-600",
    link: "/",
  },
  {
    title: "Spring boot",
    background: "bg-green-100",
    textColor: "text-green-600",
    link: "/",
  },
  {
    title: "React",
    background: "bg-sky-100",
    textColor: "text-sky-600",
    link: "/",
  },
  {
    title: "Angular",
    background: "bg-red-100",
    textColor: "text-red-600",
    link: "/",
  },
  {
    title: "Vuejs",
    background: "bg-emerald-100",
    textColor: "text-emerald-600",
    link: "/",
  },
];
</script>

<style scoped></style>
