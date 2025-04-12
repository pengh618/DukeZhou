<template>
    <CommpnPage>
        <main class="auto-bg h-full flex flex-col items-center">

            <div class="p-4 bg-gray-50 rounded-lg shadow-md mb-8 lg:w-[1000px] w-90%">
                <div class="pt-4 pl-6 pr-5">
                    <n-space vertical>
                        <n-input type="textarea" v-model:value="userInput" size="large" round placeholder="请描述你的梦境..."
                            :style="{ height: '120px' }" />
                    </n-space>
                    <div class="mt-4 flex justify-center">
                        <n-button type="info" :loading="loading" @click="handleClick">
                            <template v-if="loading">
                                AI 正在思考...
                            </template>
                            <template v-else>
                                解读梦境
                            </template>
                        </n-button>
                    </div>
                    <div v-show="showProcess" style="font-size: 10px; overflow-y: auto;">
                        <!-- <div id="think-box" v-html="md.render(answers)"></div> -->
                        <div id="think-box" v-html="answers" style="white-space: pre-wrap; word-wrap: break-word;"></div>
                    </div>
                </div>

                <n-table :bordered="false" :single-line="false" v-show="showResult">
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
            </div>
        </main>
    </CommpnPage>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CommpnPage from '@/components/common/CommpnPage.vue'
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';

const userInput = ref('')
const answers = ref('')
const loading = ref(false)
const showProcess = ref(false)
const showResult = ref(false)

// 初始化MarkdownIt实例
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(lang, str, true).value +
                    '</code></pre>';
            } catch (__) {
            }
        }
        
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
});

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

/**
 * 滚动到聊天框底部
 */
const scrollToBottom = async () => {
    await nextTick();
    const thinkBox = document.getElementById('think-box');
    if (thinkBox) {
        thinkBox.scrollTo({
            top: thinkBox.scrollHeight,
            behavior: 'smooth'
        });
    }
};

const handleClick = async () => {
    loading.value = true
    showResult.value = false;
    showProcess.value = true
    try {

        let url = 'https://world.ai-help.space/qa_plus/generate?input=' + encodeURIComponent(userInput.value);
        // let url = 'https://duke-zhou-server.vercel.app/qa_plus/generate?input='+encodeURIComponent(userInput.value);

        let eventSource: EventSource;
        eventSource = new EventSource(url);
        eventSource.onmessage = (event) => {
            if (event.data === ("[DONE]")) {
                loading.value = false;
                eventSource.close();

                let content = answers.value;
                content = content.slice(7, -3);

                resultObj.value = JSON.parse(content);
                showProcess.value = false;
                showResult.value = true;
                answers.value = '';
                return;
            }
            answers.value += event.data;
            scrollToBottom();
        };

        eventSource.onerror = (error) => {
            console.error("SSE 连接出错：", error);
            loading.value = false
            eventSource.close();
        };

    } catch (error) {
        console.error('Error fetching data:', error)
    } finally {

    }
}

</script>