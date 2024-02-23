<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">编辑令牌
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处更新令牌信息</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
                        <el-tabs type="border-card">
                            <el-tab-pane label="基础设定">
                                <el-form-item label="名称">
                                    <el-input v-model="form.name" placeholder="input your Token name" />
                                </el-form-item>
                                <el-form-item label="过期时间">
                                    <el-switch v-model="form.unlimitedTime" class="ml-2" inline-prompt
                                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                                        active-text="不限时间" inactive-text="限时间" /> &nbsp; &nbsp; &nbsp;
                                    <el-date-picker v-model="form.expiredTime" type="datetime" placeholder="Pick a day"
                                        :disabled-date="disabledDate" :shortcuts="shortcuts" size="default"
                                        :disabled="form.unlimitedTime" />
                                </el-form-item>
                                <el-form-item label="限额">
                                    <el-switch v-model="form.unlimitedQuota" class="ml-2" inline-prompt
                                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                                        active-text="不限额度" inactive-text="限额" />
                                </el-form-item>
                                <el-form-item :label="quota_label">
                                    <el-input v-model="form.remainQuota" placeholder="input your remain quota"
                                        :disabled="form.unlimitedQuota" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">更新令牌</el-button>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <router-link to="/tokens" class="link">
                                        <p class="link-text">返回列表</p>
                                    </router-link>
                                </el-form-item>
                            </el-tab-pane>
                            <el-tab-pane label="高级设置">
                                <el-form-item label="模型">
                                    <el-input v-model="form.models" :autosize="{ minRows: 1, maxRows: 10 }" type="textarea"
                                        placeholder="model，请在下方选择" readonly="true" />
                                    <div style="height: 10px; width:  100%;"></div>
                                    <el-checkbox-group v-model="form.models">
                                        <el-checkbox :label="model" :key="model" v-for="model in models" />
                                        <el-checkbox :label="model" :key="model" v-for="model in custom_models" />
                                    </el-checkbox-group>
                                    <div style="height: 10px; width:  100%;"></div>
                                    <div>
                                        <el-button style="float: left; margin-bottom: 10px;"
                                            @click="handleSet35Models">一键3.5</el-button>
                                        <el-button style="float: left; margin-bottom: 10px;"
                                            @click="handleSet40Models">一键4</el-button>
                                        <el-input
                                            style="float: left;  margin-bottom: 10px; width: 40%; margin-left: 10px;    margin-right: 10px;"
                                            v-model="form.custom_model" />
                                        <el-button style="float: left; margin-bottom: 10px;"
                                            @click="handleSetCustomModel">自定义</el-button>
                                    </div>
                                </el-form-item> 
                                <el-form-item label="模型重定向">
                                    <JsonEditorVue class="editor" v-model="form.modelMapping"
                                        style="height: 220px; width: 100%;" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="onSubmit">更新令牌</el-button>
                                    &nbsp;
                                    &nbsp;
                                    &nbsp;
                                    <router-link to="/tokens" class="link">
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
                            <router-link to="/tokens" class="toc-link">
                                <p class="link-text">令牌列表</p>
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
import { updateToken, getToken } from '@/api/token' 
import { getErrorMessage, getAllModels, get35Models, get40Models } from '@/utils/enums'
import JsonEditorVue from 'json-editor-vue3'
export default {
    components: { JsonEditorVue },
    name: 'TokenEdit',
    setup() {
        const quota_label = ref("额度")
        const router = useRouter();
        const route = useRoute();
        const models = ref([])
        const custom_models = ref([])
        const form = reactive({
            name: '',
            expiredTime: new Date('2099-01-01'),
            remainQuota: 500000,
            unlimitedQuota: false,
            unlimitedTime: false, 
            models: [],
            modelMapping: {},
        })

        const handleSet35Models = () => {
            form.models = get35Models();
        }

        const handleSet40Models = () => {
            form.models = get40Models();
        }

        const handleSetCustomModel = () => {
            custom_models.value.push(form.custom_model)
        }

        const checkIfCustomModel = (inputModels) => {
            let customModels = [];
            let allModels = getAllModels(-1);
            inputModels.forEach(inputModel => {
                let foundModel = allModels.find(model => model == inputModel);
                if (!foundModel) {
                    customModels.push(inputModel);
                }
            });
            custom_models.value = customModels;
        }

        const onLoad = () => {
            CheckLogin()
            
            models.value = getAllModels(-1);
            getToken({
                id: route.params.id
            }).then(data => {
                if (!data.success && data.errorCode == 401) { 
                    router.push('/login');
                    return;
                }
                
                form.models =  data.item.models ? data.item.models.split(',') : []
                form.name = data.item.name
                form.expiredTime = data.item.expiredTime
                form.remainQuota = data.item.remainQuota
                form.unlimitedQuota = data.item.unlimitedQuota == 1
                form.unlimitedTime = data.item.expiredTime == -1
                
                checkIfCustomModel(form.models);

                try {
                    form.modelMapping = JSON.parse(data.item.modelMapping)
                } catch {
                    form.modelMapping = data.item.modelMapping
                } 
            });

            setInterval(function () {
                if (form.remainQuota && form.remainQuota != '') {
                    quota_label.value = "额度" + "($" + (form.remainQuota / 500000).toFixed(2) + ")"
                }
            }, 500)
        };
        onLoad();
        const shortcuts = [
            {
                text: '1天',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24)
                    return date
                },
            },
            {
                text: '一周',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
                    return date
                },
            },
            {
                text: '30天',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
                    return date
                },
            },
            {
                text: '365天',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 365)
                    return date
                },
            },
            {
                text: '无限',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 3650 * 5)
                    return date
                },
            },
        ]

        const onSubmit = () => {
            updateToken({
                id: route.params.id,
                name: form.name,
                expiredTime: form.unlimitedTime ? -1 : form.expiredTime.getTime(),
                remainQuota: form.remainQuota,
                unlimitedQuota: form.unlimitedQuota ? 1 : 2,
                
                models: form.models.join(','),
                modelMapping: JSON.stringify(form.modelMapping),
            }).then(data => {
                if (data.success) {
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '令牌更新成功'),
                        ]),
                        callback: () => {
                            router.push('/tokens');
                        }
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

        return {
            quota_label,
            onLoad,
            onSubmit,
            
            handleSet35Models,
            handleSet40Models,
            handleSetCustomModel,
            
            custom_models,
            form,
            shortcuts,
            models
        };
    }
}
</script>