<template>
  <div v-if="data">
    <UButton class="py-2 px-4" @click="isOpen = true" color="emerald"
      >Add dependency</UButton
    >
    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100',
          width: 'w-full sm:max-w-2xl',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Dependency list
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>
        <div class="flex flex-col gap-4">
          <UInput placeholder="Enter dependency name..." @change="onFilter" />
          <UAlert
            icon="i-heroicons-command-line"
            color="blue"
            variant="solid"
            title="Tip!"
            description="Press enter to search."
          />

          <div
            class="border border-slate-200 rounded-md overflow-y-scroll h-[400px]"
          >
            <div v-for="(item, index) in localData" :key="index">
              <h3
                :class="[
                  'font-semibold bg-slate-100 px-4 py-2',
                  index > 0 && 'border-t border-slate-200',
                ]"
              >
                {{ item.name || "Unknown" }}
              </h3>
              <div
                class="border-t p-4 border-slate-200 cursor-pointer hover:bg-emerald-600 hover:text-white group"
                v-for="childItem in item.dependencies"
                v-show="!isSelected(childItem)"
                :key="childItem.name"
                @click="() => emit('onAddItem', childItem)"
              >
                <h4 class="font-medium flex items-center gap-2">
                  {{ childItem.name }}
                  <UIcon
                    name="i-heroicons-clipboard-document-check"
                    class="text-lg cursor-pointer hidden group-hover:block"
                  />
                </h4>
                <p class="text-sm">{{ childItem.description }}</p>
              </div>
            </div>
            <div v-show="localData.length===0" class="flex flex-col items-center p-8">
            <UIcon name="i-heroicons-face-frown" class="w-10 h-10 text-gray-500"/>
              <p class="text-gray-500 font-medium">Data not found.</p>
            </div>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import type {
  ISpringDependencyGroup,
  ISpringDependencyItem,
} from "~/types/model";

const props = defineProps({
  data: Array as () => ISpringDependencyGroup[],
  listSelected: Array as () => ISpringDependencyItem[],
});

const emit = defineEmits(["onAddItem"]);

const localData = ref<ISpringDependencyGroup[]>([]);

watch(
  props,
  (value) => {
    if (!value.data) return;

    localData.value = JSON.parse(JSON.stringify(value.data));
  },
  { deep: true, immediate: true }
);

const onFilter = (e: any) => {
  if (!props.data) return;
  if (!e.target.value) {
    localData.value = JSON.parse(JSON.stringify(props.data));
  } else {
    localData.value = (JSON.parse(JSON.stringify(props.data)) as ISpringDependencyGroup[]).filter(
      (item) => {
        item.dependencies = item.dependencies.filter((filterItem) => {
          return filterItem.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        });
        return item.dependencies.length > 0;
      }
    );
  }
};

const isSelected = (data: ISpringDependencyItem) => {
  if (!props.data || !props.listSelected) return;

  if (props.listSelected.findIndex((item) => item.id === data.id) != -1) {
    return true;
  }

  return false;
};

const isOpen = ref(false);
</script>

<style scoped></style>
