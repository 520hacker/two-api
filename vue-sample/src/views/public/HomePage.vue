<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">Two API - DEMO
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>本站点仅用于测试和展示通过TWOAPI调用来进行的衍生应用。</p>
                    <ul>
                        <li>测试站点不保证稳定性，迭代的过程会导致停机和数据丢失。</li>
                        <li>测试站点并非法外之地，数据和内容依然处于被监管的范围。</li>
                        <li>请勿放飞自我，使用合理的数据进行测试。</li>
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
import { ElMessage } from 'element-plus'
import { ref } from 'vue';
import { getSharedToken } from '@/utils/token'
export default {
    name: 'HomePage',
    setup() {
        const key = ref('key')

        const onLoad = () => {
            if (!localStorage.getItem('CSK') || localStorage.getItem('CSK') == '') {
                localStorage.setItem('CSK', getSharedToken())
            }

            key.value = localStorage.getItem('CSK')
        }

        const setKey = () => {
            localStorage.setItem('CSK', key.value)

            ElMessage({
                type: 'success',
                message: '已更新',
            })
        }

        onLoad();

        return {
            key,
            setKey
        };
    }
}
</script>