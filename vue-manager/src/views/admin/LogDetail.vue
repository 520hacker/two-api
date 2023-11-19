<template>
    <div class="log-list-page ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">对话内容
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">{{ chatData.prompt }}</p>
                    <p>
                        <DateInfo :pubDate="chatData.createAt" />
                    </p>
                </div>
                <div class="example">
                    <span>{{ chatData.reply }}</span>
                </div>
            </div>

            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">导航</h3>
                    <ul class="toc-items">
                        <li class="toc-item">
                            <router-link to="/logs" class="toc-link">
                                <p class="link-text">日志</p>
                            </router-link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>
  
<script>

import { useRoute } from 'vue-router';
import { getLogDetail } from '@/api/log'
import { CheckLogin } from '@/api/user'
import {
    Check,
    Delete,
    Edit,
    CopyDocument
} from '@element-plus/icons-vue'
import { ref } from 'vue';
import DateInfo from '@/components/DateInfo.vue';

export default {
    name: 'LogList',
    components: {
        DateInfo, // 注册 DateInfo 组件
    },
    setup() {
        const route = useRoute();
        const loading = ref(true)
        const background = ref(true)

        const chatData = ref({});
        const loadList = () => {
            loading.value = true
            getLogDetail({
                id: route.params.id
            }).then(data => {
                loading.value = false
                console.log(data.item)
                chatData.value = data.item
            });
        };
        const onLoad = () => {
            CheckLogin()
            loadList()
        };
        onLoad();


        return {
            loading,
            background,
            chatData,
            onLoad,
            Check,
            Edit,
            Delete,
            CopyDocument,
            loadList,
            DateInfo
        };
    }
}
</script>
<style>
.el-pagination.is-background {
    margin: 20px 0 0;
}

.text-ellipsis {
    white-space: nowrap;
    /* 控制文本不换行 */
    overflow: hidden;
    /* 超出部分隐藏 */
    text-overflow: ellipsis;
    /* 超出部分显示省略号 */
    width: 200px;
    /* 你可以根据需要设置宽度 */
}
</style>