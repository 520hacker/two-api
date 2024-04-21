<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">Two API - 应用演示
                </h1>
                <div class="tip custom-block">
                    <h2 style="padding-top: 10px;">个人站长参与接入测试: 一步接入AI</h2>
                    <p>只需一步，您就可以在自己的网站中免费接入TWOAPI, 复制以下脚本添加到您页面的body中
                        <br />
                        <textarea
                            style="width: 90%;height: 30px;"><script src="https://twoapi-ui.qiangtu.com/scripts/content.js"></script></textarea>
                        <br />您就能获得一个和 <a href="http://suishouji.qiangtu.com/"
                            target="_blank">http://suishouji.qiangtu.com/</a>
                        功能一模一样的AI，其功能为：
                    </p>
                    <ul>
                        <li> 页面内任意地方选取文字，都可以弹出对话框基于选择的内容进行AI互动。</li>
                        <li> 在右下角新增一个AI的对话按钮，点击之后唤起AI互动界面，支持基于AI来进行当前页面总结和任意的AI对话功能。</li>
                    </ul>
                    <h2>测试参与说明</h2>
                    <p>本站点仅用于测试和展示通过TWOAPI调用来进行的衍生应用。</p>
                    <ul>
                        <li>测试站点不保证稳定性，迭代的过程会导致停机和数据丢失。</li>
                        <li>测试站点并非法外之地，数据和内容依然处于被监管的范围。</li>
                        <li>请勿放飞自我，使用合理的数据进行测试。</li>
                        <li>没有Token或者测试碰到问题可以微信群求助
                            <br />
                            <h2><a href="http://qr61.cn/oRUvxf/qyT8mJT" target="_blank">加微信群点我</a></h2>
                        </li>
                    </ul>
                </div>

                <div class="example">
                    <p class="custom-block-title">说明</p>
                    <p>本站点是为了回答企业以下问题而创建的DEMO合集，用于测试和展示通过TWOAPI调用来进行的衍生应用。</p>
                    <ul>
                        <li>企业在AI时代如何使用AI来降本增效。</li>
                        <li>职业者如何使用AI来提升竞争力。</li>
                    </ul>
                    <p class="custom-block-title">配置令牌</p>
                    <ul>
                        <li>
                            <p>第1步： 请确认您拥有了正确的 twoapi Key。</p>
                        </li>
                        <li>
                            <p>第2步： 更新 twoapi Key <el-input v-model="key" :rows="2" type="textarea"
                                    placeholder="Please input" /></p>
                        </li>
                        <li>
                            <p>第3步： 点击 按钮 <el-button type="primary" @click="setKey">更新</el-button></p>
                        </li>
                        <li>
                            当前密钥支持以下模型:
                            <p v-loading="showLoading">
                                <span v-for="(item, index) in mainModels" :key="index">
                                    <router-link :to="getHref(item.id)">{{ item.label }}</router-link> |
                                </span>
                            </p>
                        </li>
                        <li>
                            <p>选择左侧菜单，找到对话框，输入你的问题，进入 DEMO 测试吧</p>
                        </li>
                    </ul>
                </div>
            </div>

            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">导航</h3>
                    <ul class="toc-items">
                        <li class="toc-item">
                            <router-link to="/" class="toc-link">
                                <p class="link-text">首页</p>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>

<script>
import { getMainModels } from '@/utils/models'
import { getModels } from '@/api/model'
import { ElMessage } from 'element-plus'
import { ref } from 'vue';
import { getSharedToken } from '@/utils/token'
export default {
    name: 'HomePage',
    setup() {
        const key = ref('key')
        const showLoading = ref(false)
        const groupModels = ref([])
        const mainModels = ref([])

        const onLoad = () => {
            if (!localStorage.getItem('CSK') || localStorage.getItem('CSK') == '') {
                localStorage.setItem('CSK', getSharedToken())
            }

            key.value = localStorage.getItem('CSK')

            showLoading.value = true
            getModels({}).then(data => {
                groupModels.value = data.data
                mainModels.value = mainModels.value.filter(model => groupModels.value.some(models => models.id === model.label));

                if (!mainModels.value || mainModels.value == [] || mainModels.value.length < 1) {
                    mainModels.value = getMainModels(-1)

                    var mainModels2 = mainModels.value.filter(model => groupModels.value.some(models => models.id === model.label));

                    if (mainModels2 != null && mainModels2.length > 1) {
                        mainModels.value = mainModels2;
                    }
                }

                showLoading.value = false
            });
        }

        const getHref = (id) => {
            if (id == 59 || id == 74 || id == 75) {
                return '/chat/base/0/7';
            }

            return '/chat/base/0/' + id;
        }
        
        const setKey = () => {
            localStorage.setItem('CSK', key.value)
            onLoad();
            ElMessage({
                type: 'success',
                message: '已更新',
            })
        }

        onLoad();

        return {
            key,
            setKey,
            showLoading,
            getHref,
            mainModels
        };
    }
}
</script>