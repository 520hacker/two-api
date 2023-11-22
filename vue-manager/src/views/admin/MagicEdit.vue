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
                            <router-link :to="'/magic/' + item.value" class="toc-link" @click="onLinkChange(item.value)">
                                <p class="link-text">{{ item.label }}</p>
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
import { getErrorMessage, getDefaultOptions } from '@/utils/enums'
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
            options: getDefaultOptions()
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
                try {

                    form.data = JSON.parse(data.item)
                } catch {
                    var selectedOption = form.options.find(item => item.value === form.type);
                    if (selectedOption) {
                        form.data = selectedOption.default;
                    }
                }

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