<template>
    <CommpnPage>
        <main>
            <div class="m-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <n-card class="title-center cursor-pointer" @click="pushRoute('/dream')">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/13/67fbb86a5f633.png" class="w-1/2">
                        
                        <n-gradient-text :size="24" :gradient="{
                            from: 'rgb(85, 85, 85)',
                            to: 'rgb(170, 170, 170)',
                        }">
                            AI解梦
                        </n-gradient-text>                            
                    </div>
                </n-card>
                <n-card class="title-center cursor-pointer" @click="pushRoute('/song')">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/13/67fbb871a358e.png" class="w-1/2">
                        
                        <n-gradient-text :size="24" :gradient="{
                            from: 'rgb(85, 85, 85)',
                            to: 'rgb(170, 170, 170)',
                        }">
                            歌词解读
                        </n-gradient-text>                        
                    </div>
                </n-card>
                <n-card class="title-center cursor-pointer" @click="pushRoute('/plan')">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/13/67fbb86f99364.png" class="w-1/2">
                        <n-gradient-text :size="24" :gradient="{
                            from: 'rgb(85, 85, 85)',
                            to: 'rgb(170, 170, 170)',
                        }">
                            旅程规划
                        </n-gradient-text>
                    </div>
                </n-card>
                <n-card class="title-center">
                    <div class="flex items-center">
                        <img src="https://free4.yunpng.top/2025/04/13/67fbb86a8969a.png" class="w-1/2">
                        
                        <n-gradient-text :size="24" :gradient="{
                            from: 'rgb(85, 85, 85)',
                            to: 'rgb(170, 170, 170)',
                        }">
                            好书概读
                        </n-gradient-text>                            
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

<style scoped></style>
