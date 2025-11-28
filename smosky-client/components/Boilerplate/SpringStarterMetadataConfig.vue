<template>
  <p class="font-semibold p-4">Project metadata</p>
  <!-- Group -->
  <div class="text-sm font-normal gap-4 p-4 pb-0">
    <UTooltip text="Tooltip example" :popper="{ placement: 'right' }">
      <label class="font-medium text-sm flex items-center cursor-pointer"
        >Group
        <UIcon
          name="i-heroicons-question-mark-circle"
          class="text-lg ml-1 mb-[1px]"
        />
      </label>
    </UTooltip>

    <div class="flex flex-col gap-1">
      <UInput
        variant="outline"
        placeholder="Enter group..."
        v-model="createBoilerplateData.metadata.groupId.value"
        :color="createBoilerplateData.metadata.groupId.error.invalid ? 'red' : 'white'"
        @blur="
          onInputBlur(createBoilerplateData.metadata.groupId.error, createBoilerplateData.metadata.groupId.value)
        "
        @input="onInput(createBoilerplateData.metadata.groupId.error)"
        class="mt-1"
      />
      <p
        v-show="createBoilerplateData.metadata.groupId.error.invalid"
        class="text-xs text-red-700 flex items-center gap-1"
      >
        <UIcon name="i-heroicons-backspace" />
        {{ createBoilerplateData.metadata.groupId.error.message }}
      </p>
    </div>
  </div>
  <!-- Artifact -->
  <div class="text-sm font-normal gap-4 p-4 pb-0">
    <UTooltip text="Tooltip example" :popper="{ placement: 'right' }">
      <label class="font-medium text-sm flex items-center cursor-pointer"
        >Artifact
        <UIcon
          name="i-heroicons-question-mark-circle"
          class="text-lg ml-1 mb-[1px]"
        />
      </label>
    </UTooltip>

    <div class="flex flex-col gap-1">
      <UInput
        variant="outline"
        placeholder="Enter artifact..."
        v-model="createBoilerplateData.metadata.artifactId.value"
        :color="createBoilerplateData.metadata.artifactId.error.invalid ? 'red' : 'white'"
        @blur="
          onInputBlur(
            createBoilerplateData.metadata.artifactId.error,
            createBoilerplateData.metadata.artifactId.value
          )
        "
        @input="onInput(createBoilerplateData.metadata.artifactId.error)"
        class="mt-1"
      />
      <p
        v-show="createBoilerplateData.metadata.artifactId.error.invalid"
        class="text-xs text-red-700 flex items-center gap-1"
      >
        <UIcon name="i-heroicons-backspace" />
        {{ createBoilerplateData.metadata.artifactId.error.message }}
      </p>
    </div>
  </div>
  <!-- Name -->
  <div class="text-sm font-normal gap-4 p-4 pb-0">
    <UTooltip text="Tooltip example" :popper="{ placement: 'right' }">
      <label class="font-medium text-sm flex items-center cursor-pointer"
        >Name
        <UIcon
          name="i-heroicons-question-mark-circle"
          class="text-lg ml-1 mb-[1px]"
        />
      </label>
    </UTooltip>

    <div class="flex flex-col gap-1">
      <UInput
        variant="outline"
        placeholder="Enter name..."
        v-model="createBoilerplateData.metadata.name.value"
        :color="createBoilerplateData.metadata.name.error.invalid ? 'red' : 'white'"
        @blur="
          onInputBlur(createBoilerplateData.metadata.name.error, createBoilerplateData.metadata.name.value)
        "
        @input="onInput(createBoilerplateData.metadata.name.error)"
        class="mt-1"
      />
      <p
        v-show="createBoilerplateData.metadata.name.error.invalid"
        class="text-xs text-red-700 flex items-center gap-1"
      >
        <UIcon name="i-heroicons-backspace" />
        {{ createBoilerplateData.metadata.name.error.message }}
      </p>
    </div>
  </div>
  <!-- Description -->
  <div class="text-sm font-normal gap-4 p-4 pb-0">
    <UTooltip text="Tooltip example" :popper="{ placement: 'right' }">
      <label class="font-medium text-sm flex items-center cursor-pointer"
        >Description
        <UIcon
          name="i-heroicons-question-mark-circle"
          class="text-lg ml-1 mb-[1px]"
        />
      </label>
    </UTooltip>

    <UInput
      variant="outline"
      placeholder="Enter description..."
      v-model="createBoilerplateData.metadata.description"
      class="mt-1"
    />
  </div>
  <!-- Package name -->
  <div class="text-sm font-normal gap-4 p-4">
    <UTooltip text="Tooltip example" :popper="{ placement: 'right' }">
      <label class="font-medium text-sm flex items-center cursor-pointer"
        >Package name
        <UIcon
          name="i-heroicons-question-mark-circle"
          class="text-lg ml-1 mb-[1px]"
        />
      </label>
    </UTooltip>

    <UInput
      variant="outline"
      :disabled="true"
      placeholder="Enter group..."
      :model-value="packageNameInput"
      class="mt-1"
    />
  </div>
</template>

<script setup lang="ts">
import { useCreateBoilerplateData } from "~/composables/useState";
import type { IValidationErrorItem } from "~/types/components";
import { isRequired,hasNumber,containsSpecialCharsWithoutDot } from "~/utils/validation";


const createBoilerplateData = useCreateBoilerplateData();

const packageNameInput = ref(
  `${createBoilerplateData.value.metadata.groupId.value}.${createBoilerplateData.value.metadata.artifactId.value}`
);

watch(
  createBoilerplateData,
  (newValue) => {
    packageNameInput.value = `${newValue.metadata.groupId.value}.${newValue.metadata.artifactId.value}`;
  },
  {
    deep: true,
  }
);


const onInputBlur = (key: IValidationErrorItem, value: string) => {
  validation(key, value);
};
const onInput = (key: IValidationErrorItem) => {
  if (key.invalid) key.invalid = false;
};

const validation = (key: IValidationErrorItem, value: string) => {
  if (!isRequired(value)) {
    (key.invalid = true), (key.message = "This field is required");

    return;
  }
  if (hasNumber(value)) {
    (key.invalid = true), (key.message = "Cannot contains number");

    return;
  }
  if (containsSpecialCharsWithoutDot(value)) {
    (key.invalid = true), (key.message = "Cannot contains special characters");
    return;
  }
};
</script>

<style scoped></style>
