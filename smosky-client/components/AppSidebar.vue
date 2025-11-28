<template>
    <div :class="['max-w-60 w-full top-[65px]   h-screen', isFixed && 'fixed border border-gray-100 ']">
        <div :class="[' pb-4 border-b  border-slate-100', isFixed && ' ']">
            <h3 class=" flex items-center m-4 rounded-md font-medium ">

                Navigation
                <UIcon name="i-heroicons-chevron-right" />

            </h3>

            <NuxtLink to="/"
                :class="['flex items-center p-2 mx-2 mt-2 rounded-md hover:bg-gray-100 font-light', route.name === 'index' && 'bg-slate-100']">
                <img src="@/assets/images/home.svg" alt="Home" width="20" height="20" class="w-5 h-5" />
                <p :class="['text-base px-4', route.name === 'index' && 'font-medium']">Home</p>
            </NuxtLink>
            <NuxtLink to="https://loffy.me"
                :class="['flex items-center p-2 mx-2 mt-2  rounded-md hover:bg-gray-100 font-light', route.name === 'blogs' && 'bg-slate-100']">
                <img src="@/assets/images/blog.svg" alt="Home" width="20" height="20" class="w-5 h-5" />
                <p :class="['text-base px-4', route.name === 'blogs' && 'font-medium']">Blog</p>
            </NuxtLink>
        </div>
        <!-- User -->
        <div v-show="Role?.includes('USER')" class="border-b border-slate-100 pb-4">
            <h3 class=" flex items-center m-4 rounded-md font-medium ">

                User
                <UIcon name="i-heroicons-chevron-right" />
            </h3>

            <a :href="profileUrl" class="flex items-center p-2 mx-2 mt-2 rounded-md hover:bg-gray-100 font-light">

                <UIcon name="i-heroicons-user-circle" class="w-5 h-5" />

                <p class="text-base px-4">Profile</p>

            </a>
            <a :href="logoutUrl" class="flex items-center p-2 mx-2 mt-2   rounded-md hover:bg-gray-100 font-light">
                <UIcon name="i-heroicons-x-circle" class="w-5 h-5  text-red-600" />
                <p class="text-base px-4 text-red-600">Log Out</p>
            </a>
        </div>
        <!-- Admin -->
        <div v-show="Role?.includes('ADMIN')" class="border-b border-slate-100 pb-4">
            <h3 class=" flex items-center m-4 rounded-md font-medium ">

                Admin
                <UIcon name="i-heroicons-chevron-right" />
            </h3>

            <NuxtLink to="/admin"
                :class="['flex items-center p-2 mx-2 mt-2  rounded-md hover:bg-gray-100 font-light', route.name === 'admin' && 'bg-slate-100']">
                <UIcon name="i-heroicons-home" class="w-5 h-5" />
                <p :class="['text-base px-4', route.name === 'admin' && 'font-medium']">Dashboard</p>
            </NuxtLink>
            <!-- <NuxtLink to="/admin/create-ci-cd" :class="['flex items-center p-2 mx-2 mt-2  rounded-md hover:bg-gray-100 font-light',route.name==='admin-create-ci-cd' && 'bg-slate-100']">
            
            <UIcon name="i-heroicons-plus-circle" class="w-5 h-5"/>
            <p :class="['text-base px-4',route.name==='admin-create-ci-cd' && 'font-medium']">Create CI CD</p>
        </NuxtLink> -->
            <NuxtLink to="/admin/create-post"
                :class="['flex items-center p-2 mx-2 mt-2  rounded-md hover:bg-gray-100 font-light', route.name === 'admin-create-post' && 'bg-slate-100']">
                <UIcon name="i-heroicons-document-plus" class="w-5 h-5" />
                <p :class="['text-base px-4', route.name === 'admin-create-post' && 'font-medium']">Create Post</p>
            </NuxtLink>

            <!-- <NuxtLink to="/admin/create-tag" :class="['flex items-center p-2 mx-2 mt-2  rounded-md hover:bg-gray-100 font-light',route.name==='admin-create-tag' && 'bg-slate-100']">
            <img src="@/assets/images/tag-plus.svg" alt="Home" width="20" height="20" class="w-5 h-5"/>
            <p :class="['text-base px-4',route.name==='admin-create-tag' && 'font-medium']">Create Tag</p>
        </NuxtLink> -->
        </div>

    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig();
const authStore = useAuthStore()

const authUrl = config.public.NUXT_BASE_URL_AUTH_SERVER;
const logoutUrl = computed(() => `${authUrl}/logout`)
const profileUrl = computed(() => `${authUrl}/dashboard`)
const Role = computed(() => {
    if (!authStore.user.id) return []
    if (authStore.user.role === 'ADMIN') return ['ADMIN', 'USER']
    if (authStore.user.role === 'USER') return ['USER']
})

defineProps<{
    isFixed?: boolean
}>()
</script>

<style scoped></style>