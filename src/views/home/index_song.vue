<template>
    <CommpnPage>
        <main class="auto-bg h-full flex flex-col items-center">

            <div class="p-4 bg-gray-50 rounded-lg shadow-md mb-8 lg:w-[1000px] w-90%">
                <div class="pt-4 pl-6 pr-5">
                    <n-space vertical>
                        <n-input type="textarea" v-model:value="userInput" size="large" round placeholder="请输入歌曲名称..."
                            :style="{ height: '120px' }" />
                    </n-space>
                    <div class="mt-4 flex justify-center">
                        <n-button type="info" :loading="loading" @click="handleClick">
                            <template v-if="loading">
                                AI 正在思考...
                            </template>
                            <template v-else>
                                歌词解读
                            </template>
                        </n-button>
                    </div>
                    <div style="font-size: 10px; overflow-y: auto;">
                        <div id="think-box" v-html="md.render(answers)"></div>
                        <!-- <div id="think-box" v-html="answers" style="white-space: pre-wrap; word-wrap: break-word;"></div> -->
                    </div>
                </div>             
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
    answers.value = '';    
    try {

        let url = 'https://world.ai-help.space/sse/generate_md?code=song&input=' + encodeURIComponent(userInput.value);
        // let url = 'https://duke-zhou-server.vercel.app/qa_plus/generate?input='+encodeURIComponent(userInput.value);

        let eventSource: EventSource;
        eventSource = new EventSource(url);
        eventSource.onmessage = (event) => {
            if (event.data === ("[DONE]")) {
                loading.value = false;
                eventSource.close();
                // answers.value = '';
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