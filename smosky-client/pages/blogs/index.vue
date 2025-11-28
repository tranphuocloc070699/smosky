<template>
    <div class="grid grid-cols-12">
  <div class="col-span-12 md:col-span-9 px-8">
    <TrendingBlogs />
  </div>
  <div class="col-span-12 md:col-span-3 px-8 border-l border-gray-100">
    <TrendingImageTags />
  </div>
</div>
</template>

<script setup lang="ts">
import useApi from '~/composables/useApi'
import { usePostList } from '~/composables/useState';
import type { IApiInstance } from '~/plugins/api';
import type { IPost } from '~/types/model';
const postListState = usePostList();

const {$api} = useNuxtApp()
const postStore = usePostStore();


</script>

<style scoped>

</style>