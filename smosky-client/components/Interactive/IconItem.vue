<template>
    <div class="flex items-center cursor-pointer">
        <p v-show="counting && counting>0" class="text-xs pr-1">{{ counting }}</p>
        <UIcon :name="name || ''" class="text-xl text-slate-500 "/>
    </div>
</template>

<script setup lang="ts">

defineProps<{
  name?: string
  counting?: number
}>()
</script>

<style scoped>

</style>