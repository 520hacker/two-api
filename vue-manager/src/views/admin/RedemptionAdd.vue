<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">添加兑换券
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处添加兑换券</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
                        <el-form-item label="名称">
                            <el-input v-model="form.name" placeholder="input your Redemption name" />
                        </el-form-item>
                        <el-form-item :label="quota_label">
                            <el-input v-model="form.quota" placeholder="input your remain quota" />
                        </el-form-item>
                        <el-form-item label="数量">
                            <el-input v-model="form.number" placeholder="input your Redemption number" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">添加兑换券</el-button>
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
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { h, ref, reactive } from 'vue';
import { ElMessageBox } from 'element-plus'
import { CheckLogin } from '@/api/user'
import { addRedemption } from '@/api/redemption'
import { getErrorMessage } from '@/utils/enums'
import { createTxtAndDownload } from '@/utils/txt'
export default {
    name: 'RedemptionAdd',
    setup() {
        const router = useRouter();
        const quota_label = ref("额度")
        // const router = useRouter();
        const form = reactive({
            name: '',
            quota: 500000,
            number: 1
        })
        const onLoad = () => {
            CheckLogin()
            setInterval(function () {
                if (form.quota && form.quota != '') {
                    quota_label.value = "额度" + "($" + (form.quota / 500000).toFixed(2) + ")"
                }
            }, 500)
        };
        onLoad();


        const onSubmit = () => {
            addRedemption({
                name: form.name,
                quota: form.quota,
                number: form.number
            }).then(data => {
                if (data.success) {
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '新的兑换券添加成功'),
                        ]),
                        callback: () => {
                            createTxtAndDownload('output.txt', data.items.join('\n'))
                            // router.push('/redemptions');
                        }
                    })
                } else {
                    if (data.errorCode == 401) {
                        router.push('/login');
                        return;
                    }

                    var errorMessage = getErrorMessage(data.errorMessage)
                    ElMessageBox({
                        title: '未成功',
                        message: h('p', null, [
                            h('span', null, '添加未成功,' + errorMessage),
                        ]),
                    })
                }
            });
        };

        return {
            onLoad,
            onSubmit,
            form,
            quota_label
        };
    }
}
</script>