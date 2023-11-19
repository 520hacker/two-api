<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">设置
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处指定你的配置信息, 错误的配置可能会导致站点崩溃</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
                        <p>设置类型</p>
                        <el-select v-model="form.type" placeholder="Select" @change="onSelectChange">
                            <el-option v-for="item in form.options" :key="item.value" :label="item.label"
                                :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                                <span style=" float: right; color: var(--el-text-color-secondary); font-size: 13px;">{{
                                    item.value }}</span>
                            </el-option>
                        </el-select>
                        <p>{{ form.label }}</p>
                        <el-input v-model="form.data" :rows="8" type="textarea" placeholder="Please input" />
                        <p>&nbsp;</p>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">提交</el-button>
                            <el-button @click="onCancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">导航</h3>
                    <ul class="toc-items"> 
                        <li class="toc-item" v-for="item in form.options" :key="item.value">
                            <router-link :to="'/option/'+ item.value" class="toc-link" @click="onLinkChange(item.value)">
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
export default {
    name: 'SettingCard',
    setup() {
        const route = useRoute();
        const form = reactive({
            type: 'GroupRatio',
            label: '分组倍率',
            data: '',
            options: [
                {
                    value: 'BlackWords',
                    label: '敏感词(,分割)',
                },
                {
                    value: 'BlackWordErrorMessage',
                    label: '敏感词错误提示',
                },
                {
                    value: 'TestPrompt',
                    label: '测试提示词'
                },
                {
                    value: 'FilingInfo',
                    label: '备案信息'
                }
            ]
        })
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
                form.data = data.item
                loading.close()
            });
        };
        onLoad();

        const onSubmit = () => {
            updateOption({
                key: form.type,
                value: form.data
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