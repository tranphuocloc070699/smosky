<template>
  <UIcon
    name="i-heroicons-plus-circle-20-solid"
    class="w-6 h-6 text-emerald-700 cursor-pointer"
    @click="isOpen = true"
  />
  <UModal v-model="isOpen" prevent-close>
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Add Validation
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

      <div class="flex items-center gap-6 pb-4">
        <USelect
          :options="modalAddSpringValidationOptions"
          v-model="addNewFieldValue"
        />
        <UButton @click="onAddNewField">Add new field</UButton>
      </div>
      <div v-for="item in validateList" :key="item.name" class="py-2">
        <div class="text-sm font-normal gap-4 p-4 pb-0 flex items-center border-t border-slate-200">
          <UTooltip text="Something help" :popper="{ placement: 'top' }">
            <label class="font-medium text-sm flex items-center cursor-pointer"
              >{{ item.name }}
              <UIcon
                name="i-heroicons-question-mark-circle"
                class="text-lg ml-1 mb-[1px]"
              />
            </label>
          </UTooltip>
          <div>
            <div v-if="item.name === 'size'" class="flex items-center gap-4 pb-2">
              <UInput
                variant="outline"
                class="flex-1"
                placeholder="Min value..."
                v-model="item.min"
              />
              <UInput
                variant="outline"
                class="flex-1"
                placeholder="Max value..."
                v-model="item.max"
              />
            </div>
            <UInput
              variant="outline"
              class="flex-1"
              placeholder="Enter something..."
              v-model="item.message"
            />
          </div>
          <div class="flex-1 flex justify-end">
            <UIcon name="i-heroicons-x-circle" class="w-5 h-5  text-red-600"/>
          </div>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
interface IValidateField {
  name: string;
  help: string;
  message: string;
  min?: string;
  max?: string;
}

const isOpen = ref(false);

const addNewFieldValue = ref("required");
const validateList = ref<IValidateField[]>([]);
const onAddNewField = () => {
 
  switch (addNewFieldValue.value) {
    case "required":
      validateList.value.push({
        name: addNewFieldValue.value,
        help: "This field is required",
        message: "This field is required",
      });
      break;
    case "size":
      validateList.value.push({
        name: addNewFieldValue.value,
        help: "This field is required",
        min: '',
        max: '',
        message: "This field is required",
      });
      break;
    case "email":
      validateList.value.push({
        name: addNewFieldValue.value,
        help: "This field is required",
        message: "Email invalid",
      });
      break;
    case "phone":
      validateList.value.push({
        name: addNewFieldValue.value,
        help: "This field is required",
        message: "Phone invalid",
      });
      break;
    default:
      break;
  }
};

const modalAddSpringValidationOptions = [
  {
    name: "Required",
    value: "required",
  },
  {
    name: "Size",
    value: "size",
  },
  {
    name: "Email",
    value: "email",
  },
  {
    name: "Phone",
    value: "phone",
  },
];
</script>

<style scoped></style>
