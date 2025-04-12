<template>
    <CommpnPage>
        <main>
            <div class="m-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <n-card class="title-center cursor-pointer" @click="pushRoute('/dream')">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/06/67f27fe10ed35.png" class="w-1/2">
                        <span class="ml-4 text-lg">AI解梦</span>
                    </div>
                </n-card>
                <n-card class="title-center cursor-pointer" @click="pushRoute('/song')">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/06/67f27fdba0a11.png" class="w-1/2">
                        <span class="ml-4 text-lg">歌词解读</span>
                    </div>
                </n-card>
                <n-card class="title-center">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/06/67f27fe02e8f7.png" class="w-1/2">
                        <span class="ml-4 text-lg">旅程规划</span>
                    </div>
                </n-card>
                <n-card class="title-center">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/06/67f27fdb9dc1f.png" class="w-1/2">
                        <span class="ml-4 text-lg">AI大厨</span>
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
