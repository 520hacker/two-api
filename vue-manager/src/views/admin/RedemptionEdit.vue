<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">编辑兑换券
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处更新兑换券信息</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
                        <el-form-item label="名称">
                            <el-input v-model="form.name" placeholder="input your Redemption name" />
                        </el-form-item>
                        <el-form-item label="额度">
                            <el-input v-model="form.quota" placeholder="input your Redemption quota" />
                            <div style="padding-top:10px; color:#ccc">
                                {{ quota_label }}
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">更新兑换券</el-button>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <router-link to="/redemptions" class="link">
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
                            <router-link to="/redemptions" class="toc-link">
                                <p class="link-text">兑换券列表</p>
                            </router-link>
                        </li>
                        <li class="toc-item">
                            <router-link to="/redemptions/new" class="toc-link">
                                <p class="link-text">添加兑换券</p>
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
import { updateRedemption, getRedemption } from '@/api/redemption'
import { getErrorMessage } from '@/utils/enums'
export default {
    name: 'RedemptionEdit',
    setup() {
        const quota_label = ref("额度")
        const router = useRouter();
        const route = useRoute();
        const form = reactive({
            name: '', 
            quota: 500000, 
        })

        const onLoad = () => {
            CheckLogin()
            getRedemption({
                id: route.params.id
            }).then(data => { 
                form.name = data.item.name
                form.quota = data.item.quota 
            });

            setInterval(function () {
                if (form.quota && form.quota != '') {
                    quota_label.value = "额度" + "($" + (form.quota / 500000).toFixed(2) + ")"
                }
            }, 500)
        };
        onLoad(); 

        const onSubmit = () => {
            updateRedemption({
                id: route.params.id,
                name: form.name, 
                quota: form.quota
            }).then(data => {
                if (data.success) {
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '兑换券更新成功'),
                        ]),
                        callback: () => {
                            router.push('/redemptions');
                        }
                    })
                } else {  
                    var errorMessage = getErrorMessage(data.errorMessage) 
                    ElMessageBox({
                        title: '未成功',
                        message: h('p', null, [
                            h('span', null, '更新未成功，,' + errorMessage),
                        ]),
                    })
                }
            });
        };

        return {
            quota_label,
            onLoad,
            onSubmit,
            form
        };
    }
}
</script>