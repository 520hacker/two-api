<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">数据库初始化、升级</h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>数据库即将进行以下更改，请在备份之后进行确认更改！</p>
                </div>
                <div class="example">
                    <el-form-item label="密钥（环境变量UPGRADE_TOKEN）">
                        <el-input v-model="form.upgradeToken" v-loading="loading" placeholder="input your Token"
                            :disabled="form.unlimitedQuota" /></el-form-item>
                    <div v-show="ready">
                        <p>数据库将要更新以下内容</p>
                        <el-input v-model="form.changes" :rows="10" v-loading="loading" type="textarea" readonly="true"
                            placeholder="Please input" />
                    </div>
                    <div style="height: 20px;"></div>
                    <el-form :model="form" label-width="20px">
                        <el-form-item>
                            <el-button type="primary" @click="verifyToken" v-show="!ready">检查密钥</el-button>
                            <el-button type="primary" @click="onSubmit" v-show="ready && !loading && !done">更新系统</el-button>
                            <el-button type="primary" @click="goHome" v-show="ready && done">开始使用系统</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { h, ref, reactive } from 'vue';
import { ElMessageBox } from 'element-plus'
import { getUpgradeStatus, installOrUpgrade } from '@/api/public'
import { getErrorMessage } from '@/utils/enums'
export default {
    name: 'UserEdit',
    setup() {
        const router = useRouter();
        const loading = ref(false)
        const done = ref(false)
        const ready = ref(false)
        const form = reactive({
            upgradeToken: "",
            changes: "您即将开始安装一个全新的站点，请确认您已经尽可能的完成了备份和数据保护工作。\n确认之后，点击开始吧。"
        })


        const verifyToken = () => {
            loading.value = true;
            getUpgradeStatus({
                upgradeToken: form.upgradeToken
            }).then(data => {
                if (data.errorMessage && data.errorMessage != '') {
                    var errorMessage = getErrorMessage(data.errorMessage)
                    ElMessageBox({
                        title: '未成功',
                        message: h('p', null, [
                            h('span', null, '检查未成功，' + errorMessage),
                        ]),
                    })
                } else {
                    ready.value = true
                }

                form.changes = data.item;
                console.log(data.item)
                loading.value = false;
            });
        }

        const onLoad = () => {
            verifyToken()
        };
        onLoad();
        const goHome = () => {
            router.push('/');
        }

        const onSubmit = () => {
            loading.value = true;
            installOrUpgrade({
                upgradeToken: form.upgradeToken
            }).then(data => {
                loading.value = false;
                if (data.success) {
                    form.changes = data.item
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '系统更新成功'),
                        ]),
                        callback: () => {
                            done.value = true
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
            onLoad,
            onSubmit,
            verifyToken,
            goHome,
            loading,
            ready,
            done,
            form,
        };
    }
}
</script>