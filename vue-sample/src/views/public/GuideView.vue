<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">程序员
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>当前页面试图通过根据程序员的日常工作，来挖掘AI能为工作提供帮助的能力。</p>
                </div>
                <div class="example">
                    <p>汇报</p>
                    <ul>
                        <li>日报工具</li>
                        <li>周报工具</li>
                        <li>月报工具</li>
                    </ul>
                    <p>计划</p>
                    <ul>
                        <li>头脑风暴</li>
                    </ul>
                    <p>文档</p>
                    <ul>
                        <li>文档</li>
                    </ul>
                    <p>开发</p>
                    <ul>
                        <li>优化、压缩</li>
                        <li>改写</li>
                        <li>注释</li>
                        <li>重构</li>
                        <li>发布</li>
                    </ul>
                    <p>测试</p>
                    <ul> 
                        <li>用例</li>
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