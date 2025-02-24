<template>
  <CommpnPage>
    <main class="auto-bg h-full flex flex-col items-center">
      <div class="m-12 flex-1 rounded-2 lg:w-[1200px] lg:px-0 w-90%">
        <n-gradient-text :size="24" type="info">
          分享你的梦境，获取AI提供的详细解读
        </n-gradient-text>
      </div>

      <div class="p-4 bg-gray-50 rounded-lg shadow-md mb-8 lg:w-[600px] w-90%">
        <div class="pt-4 pl-6 pr-5">
          <n-space vertical>
            <n-input type="textarea" v-model:value="userInput" size="large" round placeholder="请描述你的梦境..."
              :style="{ height: '200px' }" />
          </n-space>
        </div>

        <div class="mt-4 flex justify-center space-x-4">
          <n-button type="info" :loading="loading" @click="handleClick">
            解读梦境
          </n-button>
        </div>
      </div>

    </main>
  </CommpnPage>
</template>

<script setup lang="ts">
import {  ref } from 'vue'
import axios from 'axios'

const userInput = ref('') 
const loading = ref(false)

const handleClick = async () => {
  loading.value = true
  try {
    console.log(userInput.value)
    const response = await axios.post(`https://duke-zhou-server.vercel.app/ai/generate?input=${encodeURIComponent(userInput.value)}`)
    console.log(response.data)
    const message = useMessage()
    message.info(response.data)

  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
  }
}
</script>
