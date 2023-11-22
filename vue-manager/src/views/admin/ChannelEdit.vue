<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">编辑渠道
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处更新渠道信息</p>
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
                                    <el-input v-model="form.models" />
                                    <div style="height: 10px; width:  100%;"></div>
                                    <el-checkbox-group v-model="form.models">
                                        <el-checkbox :label="model" :key="model" v-for="model in models" border />
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="密钥">
                                    <el-input v-model="form.key" placeholder="input your channel key" />
                                </el-form-item>
                                <el-form-item label="代理">
                                    <el-input v-model="form.baseUrl"
                                        placeholder="input your channel base url or proxy server" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">更新渠道</el-button>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <router-link to="/channels" class="link">
                                        <p class="link-text">返回列表</p>
                                    </router-link>
                                </el-form-item>
                            </el-tab-pane>
                            <el-tab-pane label="高级设置">
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
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">更新渠道</el-button>
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
import { useRouter, useRoute } from 'vue-router';
import { h, ref, reactive } from 'vue';
import { ElMessageBox } from 'element-plus'
import { CheckLogin } from '@/api/user'
import { updateChannel, getChannel } from '@/api/channel'
import { getErrorMessage, getAllModels, getActivatedChannelTypes, getGroups } from '@/utils/enums'
import JsonEditorVue from 'json-editor-vue3'
export default {
    components: { JsonEditorVue },
    name: 'ChannelEdit',
    setup() {
        const router = useRouter();
        const route = useRoute();
        const groups = getGroups()
        const models = ref([])
        const types = getActivatedChannelTypes()
        const form = reactive({
            type: 1,
            name: '',
            group: ['default'],
            models: ['gpt-3.5-turbo'],
            modelMapping: {},
            key: '',
            baseUrl: '',
            limits: {},
            weight: 100
        })
        const defaultValues = ref({
            limits: {
                "minute": 3,
                "hour": 60,
                "day": 200
            }
        })
        const setDefaultLimit = () => {
            form.limits = defaultValues.value.limits
        }
        const onLoad = () => {
            models.value = getAllModels(-1);
            CheckLogin()
            getChannel({
                id: route.params.id
            }).then(data => {
                form.type = data.item.type
                models.value = getAllModels(form.type);
                form.name = data.item.name
                form.group = data.item.group.split(',')
                form.models = data.item.models.split(',')
                form.weight = data.item.weight
                form.key = data.item.key
                form.baseUrl = data.item.baseUrl

                try {
                    form.modelMapping = JSON.parse(data.item.modelMapping)
                } catch {
                    form.modelMapping = data.item.modelMapping
                }
                try {
                    form.limits = JSON.parse(data.item.limits)
                } catch {
                    form.limits = data.item.limits
                }
            });
        };
        onLoad();

        const handleTypeChange = () => {
            models.value = getAllModels(form.type);
        }

        const onSubmit = () => {
            updateChannel({
                id: route.params.id,
                type: form.type,
                name: form.name,
                group: form.group.join(','),
                models: form.models.join(','),
                key: form.key,
                baseUrl: form.baseUrl,
                modelMapping: JSON.stringify(form.modelMapping),
                limits: JSON.stringify(form.limits),
                weight: form.weight
            }).then(data => {
                if (data.success) {
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '渠道更新成功'),
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
                            h('span', null, '更新未成功，' + errorMessage),
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