<template>
  <div>
    <UButton class="py-2 px-4" @click="isOpen = true">Create a review</UButton>
    <UModal v-model="isOpen" prevent-close>
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
              Leave a review
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
        <div class="flex flex-col gap-1">
          <div v-show="!isLogged" class="p-4 flex items-start gap-1 flex-col">
            <p class="text-sm font-medium">Your name</p>
            <UInput
              v-model="data.name.value"
              class="w-full h-auto"
              placeholder="Enter your name..."
              :color="data.content.error.invalid ? 'red' : 'white'"
              @blur="onBlur(data.name)"
              @input="onInput(data.name)"
            />
          </div>
          <p
            v-show="data.name.error.invalid"
            class="text-xs text-red-700 flex items-center gap-1"
          >
            <UIcon name="i-heroicons-backspace" />
            {{ data.name.error.message }}
          </p>
        </div>
        <div class="p-4 flex items-start gap-1 flex-col">
          <p class="text-sm font-medium">Give a star</p>

          <AppVoting
            :read-only="false"
            :rating-value="data.star"
            @rating-selected="(value) => (data.star = value)"
            :size="8"
          />
        </div>

        <div class="flex flex-col gap-1">
          <div class="p-4 flex items-start gap-1 flex-col">
            <p class="text-sm font-medium">Your comment</p>
            <UTextarea
              @blur="onBlur(data.content)"
              :color="data.content.error.invalid ? 'red' : 'white'"
              @input="onInput(data.content)"
              v-model="data.content.value"
              class="w-full h-auto"
            />
          </div>
          <p
            v-show="data.content.error.invalid"
            class="text-xs text-red-700 flex items-center gap-1"
          >
            <UIcon name="i-heroicons-backspace" />
            {{ data.content.error.message }}
          </p>
        </div>
        <div class="flex justify-end mt-10">
          <UButton class="py-2 px-8" @click="onSubmit">Submit</UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const emit = defineEmits(["onSubmit"]);
const props = defineProps<{
  id: number;
}>();

const isOpen = ref(false);
const data = ref({
  id: props.id,
  name: {
    value: "",
    error: {
      invalid: false,
      message: "",
    },
  },
  email: {
    value: "",
    error: {
      invalid: false,
      message: "",
    },
  },
  content: {
    value: "",
    error: {
      invalid: false,
      message: "",
    },
  },
  star: 5,
});

const isLogged = computed(() => authStore.user.id.length>0)

onMounted(() => {
  if (authStore.user.email && authStore.user.name) {
    data.value.email.value = authStore.user.email;
    data.value.name.value = authStore.user.name;
  }
});

const onBlur = (data: any) => {
  if (data.value.trim().length === 0) {
    data.error.invalid = true;
    data.error.message = "This field is required";
  }
};

const onInput = (data: any) => {
  if (data.error.invalid) {
    data.error.invalid = false;
  }
};

const onSubmit = () => {
  if (
    data.value.name.value.trim().length === 0 ||
    data.value.content.value.trim().length === 0
  ) {
    alert("Name or content invalid");
    return;
  }
  emit("onSubmit", {
    id: data.value.id,
    name: data.value.name.value,
    email: data.value.email.value,
    content: data.value.content.value,
    star: data.value.star,
  });
  isOpen.value = false;
};
</script>

<style scoped></style>
