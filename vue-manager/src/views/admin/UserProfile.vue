<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">个人信息更新
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在此更新显示信息和账户密码</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
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
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">更新</el-button> 
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">栏目导航</h3>
                    <ul class="toc-items">
                        <li class="toc-item">
                            <router-link to="/user/profile" class="toc-link">
                                <p class="link-text">更新密码</p>
                            </router-link>
                        </li>
                        <li class="toc-item">
                            <router-link to="/user/redeem" class="toc-link">
                                <p class="link-text">卡券充值</p>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>
  
<script>
import { h, ref, reactive } from 'vue';
import { ElMessageBox } from 'element-plus'
import { CheckLogin } from '@/api/user'
import { updateProfile, getProfile } from '@/api/user'
import { getErrorMessage } from '@/utils/enums'
export default {
    name: 'UserEdit',
    setup() {
        const quota_label = ref("额度")
        const form = reactive({
            password: '',
            displayName: '',

        })

        const onLoad = () => {
            CheckLogin()
            getProfile({
            }).then(data => {
                console.log(data.item)
                form.password = ''
                form.displayName = data.displayName
            });

            setInterval(function () {
                if (form.remainQuota && form.remainQuota != '') {
                    quota_label.value = "额度" + "($" + (form.remainQuota / 500000).toFixed(2) + ")"
                }
            }, 500)
        };
        onLoad();

        const onSubmit = () => {
            updateProfile({
                password: form.password,
                displayName: form.displayName
            }).then(data => {
                if (data.success) {
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '更新成功'),
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

        return {
            quota_label,
            onLoad,
            onSubmit,
            form,
        };
    }
}
</script>