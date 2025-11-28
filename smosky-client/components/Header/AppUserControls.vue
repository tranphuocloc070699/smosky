<template>
  <div class="flex justify-end gap-4">
    <div class="flex items-center gap-3" v-if="authStore.user.username">
      <a class="font-medium text-sm" :href="dashboardUrl">{{ authStore.user.username }}</a>
      <!-- <UAvatar
        class="cursor-pointer"
        src="https://avatars.githubusercontent.com/u/739984?v=4"
        alt="Avatar"
      /> -->
    </div>
    <!-- <div  v-else class="flex items-center gap-5">
      <UButton class="w-18 flex justify-center" :to="loginUrl"
        >Log In</UButton
      >
      <UButton
        color="white"
        class="w-18 flex justify-center"
        :to="signupUrl"
        >Sign Up</UButton
      >
    </div> -->

  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const authStore = useAuthStore()

const authUrl = config.public.NUXT_BASE_URL_AUTH_SERVER;
const clientUrl = config.public.NUXT_BASE_URL_CLIENT;

const loginUrl = computed(() => `${authUrl}/login?redirectUrl=${clientUrl}`)
const signupUrl = computed(() => `${authUrl}/signup?redirectUrl=${clientUrl}`)
const dashboardUrl = computed(() => `${authUrl}/dashboard`)
</script>

<style scoped></style>
