<template>
    <CommpnPage>
        <main class="auto-bg h-full flex flex-col items-center">

            <div class="p-4 bg-gray-50 rounded-lg shadow-md mb-8 lg:w-[1000px] w-90%">
                <div class="pt-4 pl-6 pr-5">
                    <div class="flex items-center space-x-4">
                        <n-input v-model:value="userInput" placeholder="请输入城市名称" clearable class="flex-1" />
                        <n-select v-model:value="selectedDay" :options="daysOptions" placeholder="请选择天数" clearable class="flex-1" />
                    </div>
                    <div class="mt-4 flex justify-center">
                        <n-button type="info" :loading="loading" @click="handleClick">
                            <template v-if="loading">
                                AI 正在思考...
                            </template>
                            <template v-else>
                                旅程规划
                            </template>
                        </n-button>
                    </div>
                    <div style="font-size: 10px; overflow-y: auto;">
                        <div v-show="showProcess" id="think-box" v-html="md.render(answers)"></div>
                        <!-- <div id="think-box" v-html="answers" style="white-space: pre-wrap; word-wrap: break-word;"></div> -->
                    </div>

                    <n-timeline v-show="showResult">
                        <n-timeline-item
                            v-for="(itinerary, index) in resultObj.行程规划"
                            type="info"
                            :key="index"
                            :title="itinerary.主题"
                            :content="itinerary.行程.map(item => `${item.时间} - ${item.景点}: ${item.描述}`).join(' ——> ')"
                            :time="itinerary.日期"
                        />
                        <!-- <n-timeline-item content="啊" />
                        <n-timeline-item
                        type="success"
                        title="成功"
                        content="哪里成功"
                        time="2018-04-03 20:46"
                        />
                        <n-timeline-item type="error" content="哪里错误" time="2018-04-03 20:46" />
                        <n-timeline-item
                        type="warning"
                        title="警告"
                        content="哪里警告"
                        time="2018-04-03 20:46"
                        />
                        <n-timeline-item
                        type="info"
                        title="信息"
                        content="是的"
                        time="2018-04-03 20:46"
                        line-type="dashed"
                        /> -->
                        <!-- <n-timeline-item content="啊" /> -->
                    </n-timeline>


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
const selectedDay = ref(1)
const daysOptions = [
    { label: '1天', value: 1 },
    { label: '2天', value: 2 },
    { label: '3天', value: 3 },
    { label: '4天', value: 4 },
    { label: '5天', value: 5 },
    { label: '6天', value: 6 },
    { label: '7天', value: 7 },
]
const answers = ref('')
const loading = ref(false)
const showProcess = ref(false)
const showResult = ref(false)

interface Itinerary {
    日期: string;
    主题: string;
    行程: {
        景点: string;
        时间: string;
        描述: string;
        交通?: string;
        贴士?: string;
        餐饮推荐?: string;
        特色小吃?: string[];
        推荐菜?: string[];
    }[];
    实用信息: {
        交通建议: string;
        预算参考: string;
        最佳季节: string;
        注意事项: string;
    };
}

interface ApiResponse {
    "行程规划": Itinerary[];
}

const resultObj = ref<ApiResponse>({
    行程规划: []
})

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
    showResult.value = false;
    showProcess.value = true
    resultObj.value = {};
    try {

        let url = 'https://world.ai-help.space/sse/generate_md?code=plan&days='+selectedDay.value+'&city=' + encodeURIComponent(userInput.value);
        // let url = 'https://duke-zhou-server.vercel.app/qa_plus/generate?input='+encodeURIComponent(userInput.value);
        console.log(url);
        let eventSource: EventSource;
        eventSource = new EventSource(url);
        eventSource.onmessage = (event) => {
            if (event.data === ("[DONE]")) {
                loading.value = false;
                eventSource.close();

                let content = answers.value;
                content = content.slice(7, -3);
                console.log(content);
                try {
                    resultObj.value = JSON.parse(content);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }

                showProcess.value = false;
                showResult.value = true;

                // if (resultObj.value["行程规划"]) {
                //     resultObj.value["行程规划"].forEach((itinerary, index) => {
                //         console.log(`行程 ${index + 1}:`);
                //         console.log(`日期: ${itinerary.日期}`);
                //         console.log(`主题: ${itinerary.主题}`);
                //         itinerary.行程.forEach((item, idx) => {
                //             console.log(`  行程 ${idx + 1}:`);
                //             console.log(`    景点: ${item.景点}`);
                //             console.log(`    时间: ${item.时间}`);
                //             console.log(`    描述: ${item.描述}`);
                //             if (item.交通) console.log(`    交通: ${item.交通}`);
                //             if (item.贴士) console.log(`    贴士: ${item.贴士}`);
                //             if (item.餐饮推荐) console.log(`    餐饮推荐: ${item.餐饮推荐}`);
                //             if (item.特色小吃) console.log(`    特色小吃: ${item.特色小吃.join(', ')}`);
                //             if (item.推荐菜) console.log(`    推荐菜: ${item.推荐菜.join(', ')}`);
                //         });
                //         console.log(`实用信息:`);
                //         console.log(`  交通建议: ${itinerary.实用信息.交通建议}`);
                //         console.log(`  预算参考: ${itinerary.实用信息.预算参考}`);
                //         console.log(`  最佳季节: ${itinerary.实用信息.最佳季节}`);
                //         console.log(`  注意事项: ${itinerary.实用信息.注意事项}`);
                //     });
                // }

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