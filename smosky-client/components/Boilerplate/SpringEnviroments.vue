<template>
  <div
      class="flex items-start overflow-x-auto  gap-10 py-4 flex-nowrap h-[439px] scrollbar"
  >
    <div
        v-for="item in springDependenciesSelected"
        v-show="item.properties && item.properties.length > 0"
        :key="item.name"
        class="border border-slate-200 shadow-sm rounded-md min-w-[424px] rounded-t-md"
    >
      <h4
          class="text-center py-2 font-semibold border-b border-slate-[#467190] bg-slate-200  rounded-t-md text-gray-900"
      >
        {{ item.name }}
      </h4>

      <div
          v-for="property in item.properties"
          :key="property.id"
          class="text-sm font-normal gap-4 p-4 flex items-center"
      >
        <UTooltip :popper="{ placement: 'top' }" class="">
          <template #text>
            <p class="font-medium text-sm px-4">{{ property.id }}</p>
          </template>
          <label
              class="font-medium text-sm flex items-center cursor-pointer whitespace-nowrap"
          >{{ property.title }}
            <UIcon
                class="text-lg ml-1 mb-[1px]"
                name="i-heroicons-question-mark-circle"
            />
          </label>
        </UTooltip>
        <UInput
            v-if="property.options.length === 0"
            v-model="property.value"
            :disabled="property?.isDisable"
            class="flex-1"
            placeholder="Enter something..."
            variant="outline"
        />

        <USelect
            v-else
            v-model="property.value"
            :options="property.options"
            class="flex-1"

        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const boilerplateStore = useBoilerplateStore()
const {springDependenciesSelected} = storeToRefs(boilerplateStore);
console.log({springDependenciesSelected})

</script>

<style scoped></style>
