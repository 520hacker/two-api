<template>
    <div class="model-page ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">模型
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>查看现有支持的所有模型。</p>
                </div>
                <div class="example">

                    <el-radio-group v-model="group">
                        <el-radio-button v-for="item in groups" :key="item.value" :label="item.label"  @click="checkGroupChange(item.value)">
                            {{ item.label }}
                        </el-radio-button>
                    </el-radio-group>

                    <div style="border-top: 1px solid #e9e9eb; display: block; width: 100%;margin: 10px 0 0 0;height: 1px;">
                    </div>

                    <el-table :data="tableData" style="width: 100%" v-loading="loading">
                        <el-table-column prop="model" label="模型" width="140" />
                        <el-table-column>
                            <template #default="props">
                                <span v-for="channel in props.row.channels" v-bind:key="channel.id"
                                    style="margin-right: 10px; line-height: 25px; ">
                                    [ <router-link :to="'/channels/' + channel.id" class="toc-link">
                                        {{ channel.name }}
                                    </router-link> -
                                    <el-tooltip class="box-item" effect="dark" content="点击进行更新" placement="top">
                                        <span @click="getNewResponseTime(channel.id, props.row.model)"
                                            style="cursor: pointer; text-align: center;">{{ (channel.responseTime /
                                                1000).toFixed(2) }} 秒</span>
                                    </el-tooltip> ]</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div>
                        <el-pagination v-model:current-page="currentPage2" v-model:page-size="pageSize2" :small="false"
                            :disabled="false" :hide-on-single-page="true" :background="background"
                            layout="prev,  jumper, next, ->, total" :total="totalCount" @current-change="loadList" />
                    </div>
                </div>
            </div>

            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">导航</h3>
                    <ul class="toc-items">
                        <li class="toc-item">
                            <router-link to="/channel/new" class="toc-link">
                                <p class="link-text">渠道添加</p>
                            </router-link>
                        </li>
                        <li class="toc-item">
                            <router-link to="/channels" class="toc-link">
                                <p class="link-text">渠道列表</p>
                            </router-link>
                        </li>
                        <li class="toc-item">
                            <router-link to="/models" class="toc-link">
                                <p class="link-text">模型列表</p>
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
import { getChannelResponseTime } from '@/api/channel'
import { getModels } from '@/api/model'
import { CheckLogin } from '@/api/user'
import {
    Check,
    Delete,
    Edit,
    Search,
    Lock
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue';
export default {
    name: 'ChannelList',
    setup() {
        const router = useRouter();
        const loading = ref(true)
        const currentPage2 = ref(1)
        const pageSize2 = ref(100)
        const totalCount = ref(0)
        const group = ref('default')
        const background = ref(true)

        const groups = [{
            "value": "default",
            "label": "default",
        },
        {
            "value": "vip",
            "label": "vip",
        },
        {
            "value": "svip",
            "label": "svip",
        }]

        const getDate = (timestamp) => {
            const date = new Date(timestamp);
            const dateString = date.toLocaleString();
            return dateString;
        }


        const getNewResponseTime = (id, model) => {
            loading.value = true
            getChannelResponseTime({
                id: id,
                model: model
            }).then(time => {
                loadList()
                console.log(time)
                if (time.errorMessage && time.errorMessage != '') {
                    ElMessage({
                        type: 'error',
                        message: '连接测试未成功,' + time.errorMessage,
                    })
                } else {
                    ElMessage({
                        type: 'success',
                        message: '连接测试已完成',
                    })
                }
            });
        };

        const checkGroupChange = (data) => {
            group.value = data
            loadList();
        };

        const getGroupColor = (data) => {
            switch (data) {
                case "vip":
                    return "success"
                case "svip":
                    return "danger"
                case "default":
                    return "info"
                default:
                    return "warning"
            }
        }

        const handleNew = () => {
            router.push(`/channel/new`)
        }

        const tableData = ref([]);
        const loadList = () => {
            loading.value = true
            getModels({
                group: group.value,
                limit: pageSize2.value,
                offset: (currentPage2.value - 1) * pageSize2.value,
            }).then(data => {
                if (!data.success && data.errorCode == 401) { 
                    router.push('/login');
                    return;
                }
                
                loading.value = false
                console.log(data)
                tableData.value = data.items
                totalCount.value = data.total
                // console.log(totalCount.value)
            });
        };


        const onLoad = () => {
            CheckLogin()
            loadList()
        };
        onLoad();

        return {
            group,
            groups,
            tableData,
            loading,
            currentPage2,
            pageSize2,
            background,
            totalCount,
            onLoad,
            handleNew,
            getDate,
            getGroupColor,
            checkGroupChange,
            getNewResponseTime,
            Check,
            Edit,
            Delete,
            Search,
            Lock
        };
    }
}
</script>
<style>
.el-pagination.is-background {
    margin: 20px 0 0;
}
</style>