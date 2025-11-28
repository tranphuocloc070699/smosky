<template>
    <div class="">
        <div v-for="item in data" :key="item.toString()" class="flex items-center gap-4 px-4 md:px-0">
                <UIcon name="i-heroicons-chevron-double-right" />
                <p class="font-normal">{{ item }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps(
    {
        data: Array as () => String[],
    }
)
</script>

<style scoped>

</style>