<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">魔改设置
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处指定你的魔改设置信息，逻辑是：搜索后面的关键字，如果有，就加上前面的修复词到系统设定里。
                    </p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
                        <p>设置类型</p>
                        <el-select v-model="form.type" placeholder="Select" @change="onLinkChange(form.type)">
                            <el-option v-for="item in form.options" :key="item.value" :label="item.label"
                                :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                                <span style="
                                    float: right;
                                    color: var(--el-text-color-secondary);
                                    font-size: 13px;
                                    ">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                        <p>{{ form.label }}</p>
                        <JsonEditorVue class="editor" v-model="form.data" @blur="validate" style="height: 520px;" />
                        <p>&nbsp;</p>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交</el-button>
                            <el-button @click="onCancel">取消</el-button>
                            <el-button type="success" @click="resetToDefault">重设为初始值</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">导航</h3>
                    <ul class="toc-items">
                        <li class="toc-item" v-for="item in form.options" :key="item.value">
                            <router-link :to="'/magic/'+ item.value" class="toc-link" @click="onLinkChange(item.value)">
                                <p class="link-text">{{item.label}}</p>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>
  
<script>
import { useRoute } from 'vue-router';
import { CheckLogin } from '@/api/user'
import { getOption, updateOption } from '@/api/option'
import { h, reactive } from 'vue';
import { ElMessageBox, ElLoading } from 'element-plus'
import { getErrorMessage } from '@/utils/enums'
import JsonEditorVue from 'json-editor-vue3'
export default {
    components: { JsonEditorVue },
    name: 'SettingCard',
    setup() {
        const route = useRoute();
        const form = reactive({
            type: 'GPT4Hack',
            label: 'GPT4面具',
            data: {},
            options: [
                {
                    value: 'GroupRatio',
                    label: '分组倍率',
                    default: {
                        "default": 1.5,
                        "svip": 0.75,
                        "vip": 1
                    }
                },
                {
                    value: 'ModelRatio',
                    label: '模型倍率',
                    default: {
                        "360GPT_S2_V9": 0.8572,
                        "360GPT_S2_V9.4": 0.8572,
                        "ERNIE-Bot": 0.8572,
                        "ERNIE-Bot-turbo": 0.5715,
                        "Embedding-V1": 0.1429,
                        "PaLM-2": 1,
                        "SparkDesk": 0.8572,
                        "ada": 10,
                        "babbage": 10,
                        "chatglm_lite": 0.1429,
                        "chatglm_pro": 0.7143,
                        "chatglm_std": 0.3572,
                        "claude-2": 5.51,
                        "claude-instant-1": 0.815,
                        "code-davinci-edit-001": 10,
                        "curie": 10,
                        "dall-e": 8,
                        "davinci": 10,
                        "embedding-bert-512-v1": 0.0715,
                        "embedding_s1_v1": 0.0715,
                        "gpt-3.5-turbo": 0.75,
                        "gpt-3.5-turbo-0301": 0.75,
                        "gpt-3.5-turbo-0613": 0.75,
                        "gpt-3.5-turbo-16k": 1.5,
                        "gpt-3.5-turbo-16k-0613": 2,
                        "gpt-4": 15,
                        "gpt-4-0314": 15,
                        "gpt-4-0613": 15,
                        "gpt-4-32k": 30,
                        "gpt-4-32k-0314": 30,
                        "gpt-4-32k-0613": 30,
                        "qwen-plus-v1": 0.5715,
                        "qwen-v1": 0.8572,
                        "semantic_similarity_s1_v1": 0.0715,
                        "text-ada-001": 0.2,
                        "text-babbage-001": 0.25,
                        "text-curie-001": 1,
                        "text-davinci-002": 10,
                        "text-davinci-003": 10,
                        "text-davinci-edit-001": 10,
                        "text-embedding-ada-002": 0.05,
                        "text-moderation-latest": 0.1,
                        "text-moderation-stable": 0.1,
                        "text-search-ada-doc-001": 10,
                        "whisper-1": 10
                    }
                },
                {
                    value: 'GPT4Hack',
                    label: 'GPT4面具',
                    default: [
                        {
                            "fixWord": "You are GPT4, base on GPT4 platform, a language model developed by OpenAI.",
                            "keywords": [
                                "gpt几",
                                "gpt4",
                                "gpt-4"
                            ]
                        },
                        {
                            "fixWord": "鲁迅和周树人是同一个人，鲁迅是周树人的笔名。鲁迅是笔名，周树人是本名。无论如何，都请坚持把这2个名字看成是同一个人，他不可能自己打自己，也不可能和自己产生其他互动。",
                            "keywords": [
                                "鲁迅",
                                "周树人"
                            ]
                        }
                    ]
                },
                {
                    value: 'SearchPlus',
                    label: '联网模式',
                    default: {
                        "Enabled": true,
                        "Models": [
                            {
                                "Logic": "smart",
                                "Model": "gpt-3.5-turbo-0613",
                                "Group": "default"
                            },
                            {
                                "Model": "gpt-3.5-turbo-0301",
                                "Group": "default"
                            }
                        ],
                        "BaseUrl": "https://ddg-api.qiangtu.com",
                        "Type": "duckduckgoapi"
                    }
                },
                {
                    value: 'GPTGodMJ',
                    label: 'GPTGOD MJ直出',
                    default: {
                        "BaseModel": "gpt-3.5-turbo",
                        "Enabled": true,
                        "PromptToken": 10000,
                        "ReturnToken": 10000
                    }
                },
                {
                    value: 'IPBlackList',
                    label: 'IP黑名单（通配符*）',
                    default: []
                },
                {
                    value: 'IPWhiteList',
                    label: 'IP白名单（通配符*）',
                    default: []
                }
            ]
        })

        const validate = async (editor) => {
            const res = await editor.validate();
            // res 是错误列表，如果是空数组，则表示检测没有错误
            console.log(res);
        };

        const resetToDefault = () => {
            const selectedOption = form.options.find(item => item.value === form.type);
            if (selectedOption) {
                form.data = selectedOption.default;
            }
        }

        const onLoad = () => {
            CheckLogin()

            if (route.params.key && route.params.key != '') {
                form.type = route.params.key
                const selectedOption = form.options.find(item => item.value === route.params.key);
                if (selectedOption) {
                    form.label = selectedOption.label;
                }
            }

            onSelectChange()
        };

        const onLinkChange = (key) => {
            if (key && key != '') {
                form.type = key
                const selectedOption = form.options.find(item => item.value === key);
                if (selectedOption) {
                    form.label = selectedOption.label;
                }
            }

            onSelectChange()
        }

        const onSelectChange = () => {
            const loading = ElLoading.service({
                lock: true,
                text: 'Loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            getOption({
                key: form.type,
            }).then(data => {
                form.data = JSON.parse(data.item)
                loading.close()
            });
        };
        onLoad();

        const onSubmit = () => {
            updateOption({
                key: form.type,
                value: JSON.stringify(form.data)
            }).then(data => {
                if (data.success) {
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '配置更新成功'),
                        ])
                    })
                } else {
                    var errorMessage = getErrorMessage(data.errorMessage)
                    ElMessageBox({
                        title: '未成功',
                        message: h('p', null, [
                            h('span', null, '更新未成功,' + errorMessage),
                        ]),
                    })
                }
            });
        };

        const onCancel = () => {
        };
        return {
            validate,
            resetToDefault,
            onLoad,
            onLinkChange,
            onSelectChange,
            onSubmit,
            onCancel,
            form,
        };
    }
}
</script>