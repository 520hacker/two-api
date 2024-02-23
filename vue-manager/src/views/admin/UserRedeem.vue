<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">兑换券兑换
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在此将兑换券中的余额充值到您的账户中,当前账户余额{{ form.quota }}</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px"> 
                        <el-form-item label="充值卡秘钥">
                            <el-input v-model="form.key" placeholder="input redemption key" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">充值</el-button> 
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
import { useRouter } from 'vue-router';
import { h,  reactive } from 'vue';
import { ElMessageBox } from 'element-plus' 
import { redeem, CheckLogin, getProfile } from '@/api/user'
import { getErrorMessage } from '@/utils/enums'
export default {
    name: 'RedeemView',
    setup() { 
        const router = useRouter();
        const form = reactive({
            key: '' ,
            quota: 0
        })

        const onLoad = () => {
            CheckLogin()
            getProfile({
            }).then(data => {  
                if (!data.success && data.errorCode == 401) { 
                    router.push('/login');
                    return;
                }

                form.key = ''
                form.quota = data.quota
            }); 
        };
        onLoad();

        const onSubmit = () => {
            redeem({
                key: form.key, 
            }).then(data => {
                if (data.success) {
                    form.key = ''
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '兑换成功'),
                        ])
                    })
                } else {
                    var errorMessage = getErrorMessage(data.errorMessage) 
                    ElMessageBox({
                        title: '未成功',
                        message: h('p', null, [
                            h('span', null, '兑换未成功,' + errorMessage),
                        ]),
                    })
                }
            });
        };

        return { 
            onLoad,
            onSubmit,
            form,
        };
    }
}
</script>