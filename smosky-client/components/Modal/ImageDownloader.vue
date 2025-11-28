<template>
  <div>
    <UButton color="blue" label="Open" @click="isOpen = true"
      >Download</UButton
    >

    <UModal v-model="isOpen" prevent-close >
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100',
          width: 'max-w-2xl',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              Download Image
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              @click="isOpen = false"
            />
          </div>
        </template>

   
            <!-- Body -->
          <div >
            <h3 class="text-lg font-medium flex items-center gap-1 px-4">
               
                <UIcon
                  name="i-heroicons-wrench"
                  class="text-xl"
                />
               Config Enviroments
            </h3>
            <!-- Field -->
            <div class="text-sm font-normal gap-4 p-4">
              <UTooltip
                text="Tooltip example"
                :popper="{  placement: 'right' }"
              >
              <label
                class="font-medium text-sm flex items-center cursor-pointer"
                >Postgres Hostname
                <UIcon
                  name="i-heroicons-question-mark-circle"
                  class="text-xl ml-1"
                />
              </label>
              </UTooltip>
          
              <UInput
                color="blue"
                variant="outline"
                placeholder="Example:localhost"
                model-value="asdasd"
                class="mt-1"
              />
            </div>
            <div class="text-sm font-normal gap-4 p-4">
              <UTooltip
                text="Tooltip example"
                :popper="{  placement: 'right' }"
              >
              <label
                class="font-medium text-sm flex items-center cursor-pointer"
                >Postgres Username
                <UIcon
                  name="i-heroicons-question-mark-circle"
                  class="text-xl ml-1"
                />
              </label>
              </UTooltip>
          
              <UInput
                color="blue"
                variant="outline"
                placeholder="Example:localhost"
                model-value="asdasd"
                class="mt-1"
              />
            </div>

            <div class="text-sm font-normal gap-4 p-4">
              <UTooltip
                text="Tooltip example"
                :popper="{  placement: 'right' }"
              >
              <label
                class="font-medium text-sm flex items-center cursor-pointer"
                >Postgres Password
                <UIcon
                  name="i-heroicons-question-mark-circle"
                  class="text-xl ml-1"
                />
              </label>
              </UTooltip>
          
              <UInput
                color="blue"
                variant="outline"
                placeholder="Example:localhost"
                model-value="asdasd"
                class="mt-1"
              />
            </div>
          </div>

          <!-- Footer -->
        <div class="text-end px-4 mt-4">

            <UButton color="blue" >Download</UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref<boolean>(false);
</script>

<style scoped></style>
