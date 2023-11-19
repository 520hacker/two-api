<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">编辑用户
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处更新用户信息</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
                        <el-form-item label="名称">
                            <el-input v-model="form.username" placeholder="input your User name" disabled />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="form.password" type="password" show-password
                                placeholder="input your User password" />
                            <div style="padding-top: 5px; color: #ccc;">
                                无需修改则留空
                            </div>
                        </el-form-item>
                        <el-form-item label="显示名称">
                            <el-input v-model="form.displayName" placeholder="input your User display name" />
                        </el-form-item>
                        <el-form-item label="分组">
                            <el-radio-group v-model="form.group">
                                <el-radio-button label="default" />
                                <el-radio-button label="vip" />
                                <el-radio-button label="svip" /> 
                            </el-radio-group> 
                        </el-form-item>
                        <el-form-item label="剩余额度">
                            <el-input v-model="form.quota" placeholder="input your User balance" />
                            <div style="padding-top: 10px;">
                                等值 ${{ (form.quota / 500000).toFixed(2) }}
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">更新用户</el-button>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <router-link to="/users" class="link">
                                <p class="link-text">返回列表</p>
                            </router-link>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">栏目导航</h3>
                    <ul class="toc-items">
                        <li class="toc-item">
                            <router-link to="/users" class="toc-link">
                                <p class="link-text">用户列表</p>
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
import { updateUser, getUser } from '@/api/user'
import { getErrorMessage } from '@/utils/enums'
export default {
    name: 'UserEdit',
    setup() {
        const quota_label = ref("额度")
        const router = useRouter();
        const route = useRoute();
        const form = reactive({
            username: '',
            password: '',
            displayName: '',
            role: '',
            group: '',
            remainQuota: ''

        })

        const onLoad = () => {
            CheckLogin()
            getUser({
                id: route.params.id
            }).then(data => {
                console.log(data.item)
                form.username = data.item.username
                form.password = ''
                form.displayName = data.item.displayName
                form.role = data.item.role
                form.quota = data.item.quota
                form.group = data.item.group
            });

            setInterval(function () {
                if (form.remainQuota && form.remainQuota != '') {
                    quota_label.value = "额度" + "($" + (form.remainQuota / 500000).toFixed(2) + ")"
                }
            }, 500)
        };
        onLoad();

        const onSubmit = () => {
            updateUser({
                id: route.params.id,
                username: form.username,
                password: form.password,
                displayName: form.displayName,
                role: form.role,
                quota: form.quota,
                group: form.group
            }).then(data => {
                if (data.success) {
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '用户更新成功'),
                        ]),
                        callback: () => {
                            router.push('/users');
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
            form,
        };
    }
}
</script>