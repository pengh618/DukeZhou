<template>
  <header
    class="sticky top-0 z-20 w-full flex justify-center flex-col md:flex-row md:items-center gap-3 p-3 lg:px-4 md:h-16 auto-bg2">
    <div class="flex items-center w-full gap-8 lg:w-[1200px]">
      <div class="flex items-center gap-2">
        <router-link to="/">
          <n-gradient-text :size="48" type="info">
            AI帮帮忙
          </n-gradient-text>
        </router-link>
      </div>
      <div class="flex items-center gap-2 ml-auto">
        <router-link to="/" class="text-lg text-gray-500 hover:text-gray-700">关于</router-link>
        <router-link to="/" class="text-lg text-gray-500 hover:text-gray-700">联系</router-link>
        <router-link to="/" class="text-lg text-gray-500 hover:text-gray-700">反馈</router-link>
        <!-- <n-button @click="toggleDark" size="small" type="info">切换主题</n-button> -->
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
// import { useDark, useToggle } from '@vueuse/core'
// import { useAppStore } from '@/store'

// const appStore = useAppStore()
// const isDark = useDark()
// const toggleDark = () => {
//   appStore.toggleDark()
//   useToggle(isDark)()
// }
</script>

<style scoped></style>
