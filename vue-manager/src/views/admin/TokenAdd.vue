<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">添加令牌
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在本处添加令牌</p>
                </div>
                <div class="example">
                    <el-form :model="form" label-width="120px">
                        <el-form-item label="名称">
                            <el-input v-model="form.name" placeholder="input your Token name" />
                        </el-form-item>
                        <el-form-item label="过期时间">
                            <el-switch v-model="form.unlimitedTime" class="ml-2" inline-prompt
                                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="不限时间"
                                inactive-text="限时间" /> &nbsp; &nbsp; &nbsp;
                            <el-date-picker v-model="form.expiredTime" type="datetime" placeholder="Pick a day"
                                :disabled-date="disabledDate" :shortcuts="shortcuts" size="default"
                                :disabled="form.unlimitedTime" />
                        </el-form-item>
                        <el-form-item label="限额">
                            <el-switch v-model="form.unlimitedQuota" class="ml-2" inline-prompt
                                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" active-text="不限额度"
                                inactive-text="限额" />
                        </el-form-item>
                        <el-form-item :label="quota_label">
                            <el-input v-model="form.remainQuota" placeholder="input your remain quota"
                                :disabled="form.unlimitedQuota" />
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">添加令牌</el-button>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <router-link to="/tokens" class="link">
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
                            <router-link to="/tokens" class="toc-link">
                                <p class="link-text">令牌列表</p>
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
import { addToken } from '@/api/token'
import { getErrorMessage } from '@/utils/enums'
export default {
    name: 'TokenAdd',
    setup() {
        const quota_label = ref("额度")
        const router = useRouter();
        const form = reactive({
            name: '',
            expiredTime: new Date('2099-01-01'),
            remainQuota: 500000,
            unlimitedQuota: false,
            unlimitedTime: false
        })
        const onLoad = () => {
            CheckLogin()
            setInterval(function () {
                if (form.remainQuota && form.remainQuota != '') {
                    quota_label.value = "额度" + "($" + (form.remainQuota / 500000).toFixed(2) + ")"
                }
            }, 500)
        };
        onLoad();

        const shortcuts = [
            {
                text: '1天',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24)
                    return date
                },
            },
            {
                text: '一周',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
                    return date
                },
            },
            {
                text: '30天',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 30)
                    return date
                },
            },
            {
                text: '365天',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 365)
                    return date
                },
            },
            {
                text: '无限',
                value: () => {
                    const date = new Date()
                    date.setTime(date.getTime() + 3600 * 1000 * 24 * 3650 * 5)
                    return date
                },
            },
        ]

        const onSubmit = () => {
            addToken({
                name: form.name,
                expiredTime: form.unlimitedTime ? -1 : form.expiredTime.getTime(),
                remainQuota: form.remainQuota,
                unlimitedQuota: form.unlimitedQuota ? 1 : 2
            }).then(data => {
                if (data.success) {
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '新的令牌添加成功'),
                        ]),
                        callback: () => {
                            router.push('/tokens');
                        }
                    })
                } else {
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
            shortcuts,
            quota_label
        };
    }
}
</script>