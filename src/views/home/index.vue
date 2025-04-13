<template>
    <CommpnPage>
        <main>
            <div class="m-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <n-card class="title-center cursor-pointer" @click="pushRoute('/dream')">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/13/67fbb86a5f633.png" class="w-1/2">
                        <span class="ml-4 text-lg">AI解梦</span>
                    </div>
                </n-card>
                <n-card class="title-center cursor-pointer" @click="pushRoute('/song')">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/13/67fbb871a358e.png" class="w-1/2">
                        <span class="ml-4 text-lg">歌词解读</span>
                    </div>
                </n-card>
                <n-card class="title-center cursor-pointer" @click="pushRoute('/plan')">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/13/67fbb86f99364.png" class="w-1/2">
                        <span class="ml-4 text-lg">旅程规划</span>
                    </div>
                </n-card>
                <n-card class="title-center">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/13/67fbb86a8969a.png" class="w-1/2">
                        <span class="ml-4 text-lg">好书概读</span>
                    </div>
                </n-card>
            </div>
        </main>
    </CommpnPage>
</template>

<script setup lang="ts">
//   import { ref } from 'vue'
//   import axios from 'axios'
import CommpnPage from '@/components/common/CommpnPage.vue'
//   const loading = ref(false)
import { useRouter } from 'vue-router'
const router = useRouter()

const pushRoute = (path: string) => {
  router.push(path)
}

</script>

<style scoped>


</style>
