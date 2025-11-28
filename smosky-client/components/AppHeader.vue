<template>
  <ClientOnly>
    <div class="border-b border-gray-100 p-4 fixed top-0 left-0 right-0 bg-white z-10">
      <div class="w-full mx-auto grid grid-cols-6 px-4 md:px-0">
        <div class="flex items-center gap-4 col-span-2 h-8">

          <UIcon v-show="props.showMenu" class="w-8 h-8 cursor-pointer" name="i-heroicons-bars-3-16-solid"
            @click="isOpen = true" />
          <NuxtLink class="font-medium text-xl cursor-pointer" to="/">
            <img src="@/assets/images/logo.svg" width="80" height="40" />
          </NuxtLink>
        </div>
        <HeaderAppSearch class="col-span-2 h-8 invisible" />
        <HeaderAppUserControls class="col-span-2 " />
      </div>
    </div>
    <USlideover v-model="isOpen" class="w-[260px]" side="left">
      <UCard :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100' }"
        class="flex flex-col flex-1">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 ">
              Menu
            </h3>
            <UButton class="-my-1" color="gray" icon="i-heroicons-x-mark-20-solid" variant="ghost"
              @click="isOpen = false" />
          </div>
        </template>

        <AppSidebar :is-fixed="false" />
      </UCard>
    </USlideover>

  </ClientOnly>
</template>

<script lang="ts" setup>
const props = defineProps({
  showMenu: {
    type: Boolean,
    default: false
  },
})


const isOpen = ref(false)


</script>
<style scoped></style>
