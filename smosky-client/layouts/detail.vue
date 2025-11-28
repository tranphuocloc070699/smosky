<template>
    <div>
        <AppHeader :show-menu="isMobile"/>
        <div class="mt-[65px]">
            <div>
                <slot />
            </div>
        </div>
        <AppFooter/>
    </div>
</template>

<script setup lang="ts">
import {useMobileDetector} from '@/composables/useState'
const isMobile = useMobileDetector();

onMounted(() =>{
    handleResize()
    window.addEventListener('resize',handleResize)
}) 

const handleResize = () =>{

    if(window.innerWidth<768){
        isMobile.value=true
    }
}

onUnmounted(() =>{
    window.removeEventListener('resize',handleResize)
})
</script>

<style scoped>

</style>