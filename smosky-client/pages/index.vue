<template>
    <div class="grid grid-cols-12">
        <div class="col-span-12 md:col-span-9 md:px-8">
            <TrendingImages />
        </div>
        <div class="col-span-12 md:col-span-3 md:px-8 border-l border-gray-100">
            <TrendingImageTags />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useBoilerplateStore } from "~/stores/boilerplate.store";

const boilerplateStore = useBoilerplateStore();
</script>

<style scoped></style>
