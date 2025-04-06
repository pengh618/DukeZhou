<template>
    <CommpnPage>
        <main>
            <div class="m-12 flex-1 rounded-1 lg:w-[1200px] lg:px-0 w-95%">
                <n-grid x-gap="12" :cols="4">
                    <n-gi>
                        <div class="light-green">
                            <n-card title="AI解梦" class="title-center cursor-pointer" @click="handleDreamClick" >
                                <template #cover>
                                    <img src="https://free4.yunpng.top/2025/04/06/67f27fe10ed35.png">
                                </template>                             
                            </n-card>
                        </div>
                    </n-gi>
                    <n-gi>
                        <div class="green">
                            <n-card title="歌词解读" class="title-center">
                                <template #cover>
                                    <img src="https://free4.yunpng.top/2025/04/06/67f27fdba0a11.png">
                                </template>
                            
                            </n-card>
                        </div>
                    </n-gi>
                    <n-gi>
                        <div class="light-green">
                            <n-card title="旅程规划" class="title-center">
                                <template #cover>
                                    <img src="https://free4.yunpng.top/2025/04/06/67f27fe02e8f7.png">
                                </template>
                               
                            </n-card>
                        </div>
                    </n-gi>
                    <n-gi>
                        <div class="green">
                            <n-card title="AI大厨" class="title-center">
                                <template #cover>
                                    <img src="https://free4.yunpng.top/2025/04/06/67f27fdb9dc1f.png">
                                </template>                            
                            </n-card>
                        </div>
                    </n-gi>
                </n-grid>
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
// 点击AI解梦卡片时的处理函数
const handleDreamClick = () => {
  router.push('/dream')
}
</script>

<style scoped>
.light-green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.12);
}

.green {
    height: 108px;
    background-color: rgba(0, 128, 0, 0.24);
}

.title-center {
  text-align: center;
}

</style>
