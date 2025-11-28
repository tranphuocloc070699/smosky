<template>
  <div>
    <!-- Navigation -->
    <AppNavigation :data="navigationData" />
    <!-- Header -->
   <BoilerplateInfo type="boilerplate" />
    <!-- Body -->
    <!-- Project -->
    <!-- <div class="p-4">
      <h3 class="text font-semibold text-lg py-4 flex items-center">
        <UIcon name="i-heroicons-document" class="w-6 h-6 mr-2" />
        Project
      </h3>
    </div> -->

    <AppTitle
      v-if="boilerplateStore.boilerplate && boilerplateStore.boilerplate?.projectStructure"
      :data="{ title: 'Example project', iconName: 'heroicons-document' }"
    >
      <InteractiveProjectStructure
        :data="boilerplateStore.boilerplate?.projectStructure"
      />
    </AppTitle>

    <AppTitle
      :data="{ title: 'Features', iconName: '' }"
      class="bg-slate-50 py-5"
    >
    <template #image>
      <img
        alt="Home"
        class="w-7 h-7 pr-2"
        height="24"
        src="@/assets/images/sparkles.svg"
        width="24"
      />
    </template>
    <template #default>
      <ClientOnly>

        <BoilerplateFeature
          v-show="boilerplateStore.boilerplate?.features"
          :data="boilerplateStore.boilerplate.features"
        />
      </ClientOnly>

    </template>
    </AppTitle>


    <AppTitle :data="{ title: 'Reviews', iconName: '' }">
    

      <template #image>
      <img
        alt="Home"
        class="w-7 h-7 pr-2"
        height="24"
        src="@/assets/images/chat.svg"
        width="24"
      />
    </template>
    <template #default>
      <BoilerplateReview
        id="boilerplate-review"
        @on-submit="onCreateReviewSubmit"
      />

    </template>
    </AppTitle>

    <AppLoading v-show="loading"/>
  </div>
</template>

<script lang="ts" setup>
import type { INavigation } from "~/types/components";
import { useBoilerplateItem } from "~/composables/useState";
import useApi from "~/composables/useApi";
import type { ICreateReview } from "~/types/request";
import type { IReview } from "~/types/model";
import NotifyData from "~/utils/notify-data";
import { useReviewStore } from "~/stores/review.store";
const route = useRoute();
definePageMeta({
  layout: "detail",
});
const name = route.params.name;

const loading = ref(false)
const boilerplateStore = useBoilerplateStore()
const postStore = usePostStore()
const reviewStore = useReviewStore();
 useAsyncData('boilerplate', () => {
  return boilerplateStore.fetchBoilerplate(name as string)
})


const onCreateReviewSubmit = async (dto: IReview) => {
  loading.value = true;
   await reviewStore.createReview({
  boilerplateId:dto.id,
  name:dto.name,
  email:dto.email,
  content:dto.content,
  star:dto.star
});
  loading.value = false;
  loading.value = false;
};

const navigationData: INavigation[] = [
  {
    title: "Home",
    link: "/",
    isActive: false,
  },
  {
    title: "Detail",
    link: `/boilerplate/${name}`,
    isActive: true,
  },
];

</script>

<style scoped></style>
