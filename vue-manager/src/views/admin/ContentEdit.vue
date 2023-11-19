<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">设置
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处指定你的配置信息，支持HTML</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
                        <p>设置类型</p>
                        <el-select v-model="form.type" placeholder="Select" @change="onSelectChange">
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
                        <li class="toc-item">
                            <router-link to="/content/edit/HomePage" class="toc-link" @click="onLinkChange('HomePage')">
                                <p class="link-text">编辑首页</p>
                            </router-link>
                        </li>  
                        <li class="toc-item">
                            <router-link to="/content/edit/HowToUse" class="toc-link" @click="onLinkChange('HowToUse')">
                                <p class="link-text">编辑使用指南</p>
                            </router-link>
                        </li> 
                        <li class="toc-item">
                            <router-link to="/content/edit/ContactPage" class="toc-link" @click="onLinkChange('ContactPage')">
                                <p class="link-text">编辑联系我们</p>
                            </router-link>
                        </li>  
                        <li class="toc-item">
                            <router-link to="/content/edit/AboutPage" class="toc-link" @click="onLinkChange('AboutPage')">
                                <p class="link-text">编辑关于我们</p>
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
            type: 'HomePage',
            label: '首页',
            data: '',
            options: [
                {
                    value: 'HomePage',
                    label: '首页',
                },
                {
                    value: 'HowToUse',
                    label: '使用指南',
                }, 
                {
                    value: 'ContactPage',
                    label: '联系我们',
                },
                {
                    value: 'AboutPage',
                    label: '关于我们',
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
            
            if ( key &&  key != '') {
                form.type = key
                const selectedOption = form.options.find(item => item.value ===  key);
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