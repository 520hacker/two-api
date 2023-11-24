<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">添加渠道
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处添加渠道</p>
                </div>
                <div class="example-1">
                    <el-form :model="form" label-width="120px">
                        <el-tabs type="border-card">
                            <el-tab-pane label="基础设定">
                                <el-form-item label="类型">
                                    <el-select v-model="form.type" class="m-2" placeholder="Select" size="large"
                                        @change="handleTypeChange">
                                        <el-option v-for="item in types" :key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="名称">
                                    <el-input v-model="form.name" placeholder="input your channel name" />
                                </el-form-item>
                                <el-form-item label="分组">
                                    <el-checkbox-group v-model="form.group">
                                        <el-checkbox-button v-for="group in groups" :key="group.value" :label="group.label">
                                            {{ group.label }}
                                        </el-checkbox-button>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="模型">
                                    <el-input v-model="form.models" readonly="true" />
                                    <div style="height: 10px; width:  100%;"></div>
                                    <el-checkbox-group v-model="form.models">
                                        <el-checkbox :label="model" :key="model" v-for="model in models" border />
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="密钥">
                                    <el-input v-model="form.keys" :autosize="{ minRows: 2, maxRows: 10 }" type="textarea"
                                        placeholder="key,一行一个" />
                                </el-form-item>
                                <el-form-item label="代理">
                                    <el-input v-model="form.baseUrl"
                                        placeholder="input your channel base url or proxy server" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">添加渠道</el-button>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <router-link to="/channels" class="link">
                                        <p class="link-text">返回列表</p>
                                    </router-link>
                                </el-form-item>
                            </el-tab-pane>
                            <el-tab-pane label="高级设置">
                                <el-form-item label="默认启用">
                                    <el-radio-group v-model="form.status">
                                        <el-radio-button label="1">启用</el-radio-button>
                                        <el-radio-button label="2">禁用</el-radio-button>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="并发权重">
                                    <el-input v-model="form.weight" placeholder="3" />
                                </el-form-item>
                                <el-form-item label="模型重定向">
                                    <JsonEditorVue class="editor" v-model="form.modelMapping"
                                        style="height: 220px; width: 100%;" />
                                </el-form-item>

                                <el-form-item label="访问频率限制">
                                    <div class="form-limits">
                                        <JsonEditorVue class="editor" v-model="form.limits"
                                            style="height: 220px; width: 100%;" />
                                    </div>
                                    <div class="form-limits-default">
                                        <a class="set-to-default" @click="setDefaultLimit">设置初始值
                                        </a>
                                    </div>
                                </el-form-item>
                                <el-form-item label="特殊计费">
                                    <div class="form-limits">
                                        <JsonEditorVue class="editor" v-model="form.settleMethod"
                                            style="height: 220px; width: 100%;" />
                                    </div>
                                    <div class="form-limits-default">
                                        <a class="set-to-default" @click="setDefaultSettleMethod">默认计费
                                        </a><br />
                                        <a class="set-to-default" @click="setDefaultSettleMethod2">按次计费
                                        </a>
                                    </div>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">添加渠道</el-button>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <router-link to="/channels" class="link">
                                        <p class="link-text">返回列表</p>
                                    </router-link>
                                </el-form-item>
                            </el-tab-pane>
                        </el-tabs>
                    </el-form>
                </div>
            </div>

            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">栏目导航</h3>
                    <ul class="toc-items">
                        <li class="toc-item">
                            <router-link to="/channel/new" class="toc-link">
                                <p class="link-text">渠道添加</p>
                            </router-link>
                        </li>
                        <li class="toc-item">
                            <router-link to="/channels" class="toc-link">
                                <p class="link-text">渠道列表</p>
                            </router-link>
                        </li>
                        <li class="toc-item">
                            <router-link to="/models" class="toc-link">
                                <p class="link-text">模型列表</p>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { h, ref, reactive } from 'vue';
import { ElMessageBox } from 'element-plus'
import { CheckLogin } from '@/api/user'
import { addChannel } from '@/api/channel'
import { getErrorMessage, getAllModels, getActivatedChannelTypes, getGroups } from '@/utils/enums'
import JsonEditorVue from 'json-editor-vue3'
export default {
    components: { JsonEditorVue },
    name: 'ChannelAdd',
    setup() {
        const router = useRouter()
        const groups = getGroups()
        const models = ref([])
        const types = getActivatedChannelTypes()
        const form = reactive({
            type: 0,
            name: '',
            group: ['default'],
            models: ['gpt-3.5-turbo'],
            modelMapping: {},
            keys: '',
            baseUrl: '',
            limits: {},
            settleMethod: {},
            weight: 100,
            status: 1
        })
        const defaultValues = ref({
            limits: {
                "minute": 3,
                "hour": 60,
                "day": 200
            },
            settleMethod: {
                "type": 0,
                "defaultPerTimeToken": 0,
                "perTimeToken": { 
                }
            }
        })
        const setDefaultLimit = () => {
            form.limits = defaultValues.value.limits
        }

        const setDefaultSettleMethod = () => {
            form.settleMethod = defaultValues.value.settleMethod
        }

        const setDefaultSettleMethod2 = () =>{
            form.settleMethod = {
                "type": 1,
                "defaultPerTimeToken": 500,
                "perTimeToken": {
                    "gpt-4": 2000
                }
            }
        }

        const onLoad = () => {
            CheckLogin()
            models.value = getAllModels(0);
        };
        onLoad();

        const handleTypeChange = () => {
            models.value = getAllModels(form.type);
        }

        const onSubmit = () => {
            var keys = form.keys.split("\n")
            addChannel({
                type: form.type == 0 ? 1 : form.type,
                name: form.name,
                group: form.group.join(','),
                models: form.models.join(','),
                keys: keys,
                weight: form.weight,
                modelMapping: JSON.stringify(form.modelMapping),
                limits: JSON.stringify(form.limits),
                settleMethod: JSON.stringify(form.settleMethod),
                baseUrl: form.baseUrl,
                status: form.status
            }).then(data => {
                if (data.success) {
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '新的渠道添加成功'),
                        ]),
                        callback: () => {
                            router.push('/channels');
                        }
                    })
                } else {
                    var errorMessage = getErrorMessage(data.errorMessage)
                    ElMessageBox({
                        title: '未成功',
                        message: h('p', null, [
                            h('span', null, '添加未成功，' + errorMessage),
                        ]),
                    })
                }
            });
        };

        return {
            onLoad,
            onSubmit,
            handleTypeChange,
            setDefaultLimit,
            setDefaultSettleMethod,
            setDefaultSettleMethod2,
            form,
            groups,
            types,
            models
        };
    }
}
</script>
<style>
.form-limits {
    width: 100%;
    position: relative;
}

.form-limits-default {
    cursor: pointer;
    position: absolute;
    left: -90px;
    top: 30px
} 
</style>