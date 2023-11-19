<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">注册
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处填写信息进行注册以获得访问权</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
                        <el-form :model="form" label-width="120px">
                            <el-form-item label="用户名">
                                <el-input v-model="form.username" placeholder="Please input username" />
                            </el-form-item>
                            <el-form-item label="邮箱">
                                <el-tooltip class="box-item" effect="dark" content="用于取回密码，请填写您的真实邮件地址" placement="top">
                                    <el-input v-model="form.email" placeholder="Please input Email" />
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="form.password" type="password" show-password
                                    placeholder="Please input password" />
                            <div style="padding-top: 5px; color: #ccc;">
                                请提供一个安全的密码：8位以上，包含字母和数字
                            </div>
                            </el-form-item>
                            <el-form-item label="确认密码">
                                <el-input v-model="form.confirmPassword" type="password" show-password
                                    placeholder="Please input confirm password" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">提交注册</el-button>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <router-link to="/login" class="link">
                                    <p class="link-text">已有账户了,点此登录</p>
                                </router-link>
                            </el-form-item>
                        </el-form>
                    </el-form>
                </div>
            </div>
            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">导航</h3>
                    <ul class="toc-items">
                        <li class="toc-item">
                            <router-link to="/login" class="ltoc-link">
                                <p>登录</p>
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
import { Register } from '@/api/user'
import { h, reactive } from 'vue';
import { ElMessageBox } from 'element-plus' 
import { getErrorMessage } from '@/utils/enums'

export default {
    name: 'RegisterView',
    setup() {
        const router = useRouter();
        const form = reactive({
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
        })
        const onSubmit = () => {
            Register({
                username: form.username,
                password: form.password,
                confirmPassword: form.confirmPassword,
                email: form.email
            }).then(data => {
                if (data.success) {
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '注册成功'),
                        ]),
                        callback: () => {
                            router.push('/login');
                        }
                    })
                } else {
                    var errorMessage = getErrorMessage(data.errorMessage) 
                    ElMessageBox({
                        title: '未成功',
                        message: h('p', null, [
                            h('span', null, '注册未成功,' + errorMessage),
                        ]),
                    })
                }
            });

        };
        return {
            onSubmit,
            form
        };
    }
}
</script>