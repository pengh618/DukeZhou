<template>
    <CommpnPage>
        <main class="auto-bg h-full flex flex-col items-center">
            <div class="m-12 flex-1 rounded-2 lg:w-[1200px] lg:px-0 w-90%">
                <n-gradient-text :size="24" type="info">
                    分享你的梦境，获取AI提供的详细解读
                </n-gradient-text>
            </div>

            <div class="p-4 bg-gray-50 rounded-lg shadow-md mb-8 lg:w-[1000px] w-90%">
                <div class="pt-4 pl-6 pr-5">
                    <n-space vertical>
                        <n-input type="textarea" v-model:value="userInput" size="large" round placeholder="请描述你的梦境..."
                            :style="{ height: '100px' }" />
                        <n-input type="textarea" v-model:value="answers" size="large" round placeholder="AI回答..."
                            :style="{ height: '200px' }" />    
                    </n-space>
                </div>

                <div class="mt-4 flex justify-center space-x-4">
                    <n-button type="info" :loading="loading" @click="handleClick">
                        <template v-if="loading">
                            AI 正在思考...
                        </template>
                        <template v-else>
                            解读梦境
                        </template>
                    </n-button>

                </div>
            </div>
            <n-modal v-model:show="showModal" class="custom-card" preset="card" :style="bodyStyle" title="梦境解析"
                size="huge" :bordered="false">

                <template #header-extra>
                </template>

                <n-table :bordered="false" :single-line="false">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><n-tag type="success">
                                    梦境解读结果
                                </n-tag></td>
                            <td>{{ resultObj.梦境解读结果 }}</td>
                        </tr>
                        <tr>
                            <td><n-tag type="info">
                                    简介
                                </n-tag></td>
                            <td>{{ resultObj.简介 }}</td>
                        </tr>
                        <tr>
                            <td><n-tag type="success">
                                    简介
                                </n-tag></td>
                            <td>{{ resultObj.概述 }}</td>
                        </tr>

                        <tr>
                            <td><n-tag type="info">
                                    关键符号
                                </n-tag></td>
                            <td>
                                <ul>
                                    <li v-for="(value, key) in resultObj.关键符号" :key="key"><strong>{{ key }}</strong>: {{
                                        value }}
                                    </li>
                                </ul>
                            </td>
                        </tr>

                        <tr>
                            <td><n-tag type="success">
                                    潜在意义
                                </n-tag></td>
                            <td>{{ resultObj.潜在意义 }}</td>
                        </tr>
                        <tr>
                            <td><n-tag type="info">
                                    总结
                                </n-tag></td>
                            <td>{{ resultObj.总结 }}</td>
                        </tr>
                    </tbody>
                </n-table>
                <template #footer>
                </template>
            </n-modal>


        </main>
    </CommpnPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommpnPage from '@/components/common/CommpnPage.vue'

const userInput = ref('')
const answers = ref('')
const loading = ref(false)
const showModal = ref(false)

interface DreamAnalysis {
    梦境内容: string;
    梦境解读结果: string;
    简介: string;
    概述: string;
    关键符号: {
        符号1: string;
        符号2: string;
        符号3: string;
    };
    潜在意义: string;
    总结: string;
}

const bodyStyle = {
    width: '800vw',
    maxWidth: '1000px'
}

const resultObj = ref<DreamAnalysis>({
    梦境内容: '',
    梦境解读结果: '',
    简介: '',
    概述: '',
    关键符号: {
        符号1: '',
        符号2: '',
        符号3: ''
    },
    潜在意义: '',
    总结: ''
})

const handleClick = async () => {
    loading.value = true
    try {
        
        let url = 'https://duke-zhou-server.vercel.app/qa_plus/generate?input='+encodeURIComponent(userInput.value);
        console.log(url);
        let eventSource: EventSource ;
        eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            console.log("收到消息内容是:", event.data)
            answers.value += event.data;
        };

        eventSource.onerror = (error) => {
            console.error("SSE 连接出错：", error);
            loading.value = false
            eventSource.close();

            let content = answers.value;
            content = content.slice(7, -3);

            console.log(content);
            resultObj.value = JSON.parse(content);
            showModal.value = true;
            answers.value = '';

        };

    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {

    }
}

</script>