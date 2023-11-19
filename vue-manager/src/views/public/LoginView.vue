<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">登录
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处登录</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
                        <el-form :model="form" label-width="120px">
                            <el-form-item label="账户">
                                <el-input v-model="form.username" placeholder="Please input username" />
                            </el-form-item>
                            <el-form-item label="密码">
                                <el-input v-model="form.password" type="password" show-password
                                    placeholder="Please input password" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="onSubmit">提交验证</el-button>
                                &nbsp;
                                &nbsp;
                                &nbsp;
                                <router-link to="/register" class="link">
                                    <p class="link-text">没用账户,点此注册</p>
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
                            <router-link to="/register" class="ltoc-ink">
                                <p>注册</p>
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
import { Login } from '@/api/user'
import { h, ref, inject, reactive } from 'vue';
import { ElMessageBox } from 'element-plus'
import { getErrorMessage } from '@/utils/enums'
export default {
    name: 'SettingCard',
    setup() {
        
        const router = useRouter();
        const changeDisplayView = inject('changeDisplayView');
        const form = reactive({
            username: '',
            password: ''
        })
        const onLoad = () => {

        };
        onLoad();
        const onSubmit = () => { 
            Login({
                username: form.username,
                password: form.password
            }).then(data => {
                if (data.success) { 
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '登录成功'), 
                        ]),
                        callback: () => {
                            localStorage.setItem("SK",data.item)
                            localStorage.setItem("Role",data.role)
                            router.push('/');
                        }
                    })
                }else{
                    var errorMessage = getErrorMessage(data.errorMessage) 
                    ElMessageBox({
                        title: '未成功',
                        message: h('p', null, [
                            h('span', null, '登录未成功,' + errorMessage),
                        ]),
                    })
                }
            });

        };
        const onCancel = () => {
            changeDisplayView.value = 'CardList';
        };
        const isShowSettingCard = ref(false);
        const isOverlayShow = ref(false);
        const showSettingCard = () => {
            isOverlayShow.value = true;
            isShowSettingCard.value = true;
        }; 
        return {
            onLoad,
            onSubmit,
            onCancel,
            form,
            showSettingCard, 
            isShowSettingCard
        };
    }
}
</script>