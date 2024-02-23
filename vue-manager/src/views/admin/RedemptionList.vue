<template>
    <div class="redemption-list-page ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">兑换券
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以创建不同的兑换券用于不同的用途。</p>
                </div>
                <div class="example">
                    <el-row>
                        <el-col :span="18">
                            <el-button-group class="ml-4">
                                <el-button type="primary" :icon="Edit" @click="handleNew" />
                            </el-button-group></el-col>
                        <el-col :span="6" style="text-align: right; color: #e9e9eb;">
                            管理
                            <el-switch v-model="showAdvSearchFrom" />
                        </el-col>
                    </el-row>
                    <div style="border-top: 1px solid #e9e9eb; display: block; width: 100%;margin: 10px 0 0 0;height: 1px;">
                    </div>
                    <el-table :data="tableData" style="width: 100%" v-loading="loading">
                        <el-table-column type="expand">
                            <template #default="props">
                                <div m="4">
                                    <p m="t-0 b-2">id: {{ props.row.id }}</p>
                                    <p m="t-0 b-2">名称: {{ props.row.name }}</p>
                                    <p m="t-0 b-2">Key: {{ props.row.key }}</p>
                                    <p m="t-0 b-2">状态: {{ getStatus(props.row.status) }}</p>
                                    <p m="t-0 b-2">额度: {{ (props.row.quota / 500000).toFixed(2) }}</p>
                                    <p m="t-0 b-2">创建时间: {{ getDate(props.row.createdTime) }}</p>
                                    <p m="t-0 b-2">核销时间: {{ getDate(props.row.redeemedTime) }}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="名称" />
                        <el-table-column label="状态" width="100">
                            <template #default="props">
                                <el-tooltip class="box-item" effect="dark" content="点击切换渠道禁用启用状态" placement="top">
                                    <el-button :icon="Check" type="success" circle v-if="props.row.status == 1"
                                        @click="disableRedemption(props.row.id)" />
                                    <el-button :icon="Lock" type="info" circle v-if="props.row.status == 2"
                                        @click="enableRedemption(props.row.id)" />
                                    <el-button :icon="Finished" type="info" circle v-if="props.row.status == 3" />
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="额度" width="100">
                            <template #default="props">
                                {{ (props.row.quota / 500000).toFixed(2) }}
                            </template>
                        </el-table-column>

                        <el-table-column label="创建" width="100">
                            <template #default="props">
                                <DateInfo :pubDate="props.row.createdTime" />
                            </template>
                        </el-table-column>
                        <el-table-column label="核销" width="100">
                            <template #default="props">
                                <DateInfo :pubDate="props.row.redeemedTime"
                                    v-if="props.row.redeemedTime && props.row.redeemedTime > 0" />
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="150" v-if="showAdvSearchFrom">
                            <template #default="props">
                                <el-button type="danger" :icon="Delete" circle @click="handleDelete(props.row.id)" />
                                <el-button type="primary" :icon="Edit" circle @click="handleEdit(props.row.id)" />
                                <el-tooltip class="box-item" effect="dark" content="点击复制" placement="top">
                                    <el-button :icon="CopyDocument" circle @click="copyToClipboard(props.row.key)" />
                                </el-tooltip>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div>
                        <el-pagination v-model:current-page="currentPage2" v-model:page-size="pageSize2" :small="false"
                            :disabled="false" :hide-on-single-page="true" :background="background"
                            layout="sizes, prev,  jumper, next,  ->, total" :total="totalCount" @size-change="loadList"
                            @current-change="loadList" />
                    </div>
                </div>
            </div>

            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">导航</h3>
                    <ul class="toc-items">
                        <li class="toc-item">
                            <a class="toc-link" href="/redemptions/new" title="兑换券添加">
                                <p>兑换券添加</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { getRedemptionStatus } from '@/utils/enums'
import { getRedemptions, deleteRedemption, getRedemption, updateRedemption } from '@/api/redemption'
import { CheckLogin } from '@/api/user'
import {
    Check,
    Delete,
    Edit,
    Search,
    CopyDocument,
    Lock,
    Finished
} from '@element-plus/icons-vue'
import { ref } from 'vue';
import DateInfo from '@/components/DateInfo.vue';
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
    name: 'RedemptionList',
    components: {
        DateInfo, // 注册 DateInfo 组件
    },
    setup() {
        const router = useRouter();
        const loading = ref(true)
        const currentPage2 = ref(1)
        const pageSize2 = ref(50)
        const totalCount = ref(0)
        const input3 = ref('')
        const background = ref(true)
        const showAdvSearchFrom = ref(false)
        const getStatus = (status) => {
            return getRedemptionStatus(status)
        }
        const handleNew = () => {
            router.push(`/redemptions/new`)
        }
        const handleEdit = (id) => {
            router.push(`/redemptions/${id}`)
        }

        const copyToClipboard = (content) => {
            // 创建临时的textarea元素
            var tempTextArea = document.createElement('textarea');
            tempTextArea.value = content;

            // 将textarea添加到页面中
            document.body.appendChild(tempTextArea);

            // 选择textarea中的文本
            tempTextArea.select();

            // 将文本复制到剪贴板
            document.execCommand('copy');

            // 移除临时的textarea元素
            document.body.removeChild(tempTextArea);
            ElMessage({
                type: 'success',
                message: '已复制',
            })
        }


        const enableRedemption = (id) => {
            loading.value = true
            getRedemption({
                id: id
            }).then(data => {
                data.item.status = 1
                updateRedemption(data.item).then(item => {
                    loadList()
                    console.log(item)
                    ElMessage({
                        type: 'success',
                        message: '兑换券已启用',
                    })
                });
            });
        };

        const disableRedemption = (id) => {
            loading.value = true
            getRedemption({
                id: id
            }).then(data => {
                data.item.status = 2
                updateRedemption(data.item).then(item => {
                    loadList()
                    console.log(item)
                    ElMessage({
                        type: 'success',
                        message: '兑换券已禁用',
                    })
                });
            });
        };

        const getDate = (timestamp) => {
            const date = new Date(timestamp);
            const dateString = date.toLocaleString();
            return dateString;
        }

        const handleDelete = (id) => {
            ElMessageBox.confirm(
                '直接删除兑换券，请确认?',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            )
                .then(() => {

                    loading.value = true
                    deleteRedemption({
                        id: id
                    }).then(data => {
                        console.log(data.items)
                        loadList()
                    });
                    ElMessage({
                        type: 'success',
                        message: '删除已完成',
                    })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '删除已取消',
                    })
                })
        }

        const tableData = ref([]);
        const loadList = () => {
            loading.value = true
            getRedemptions({
                limit: pageSize2.value,
                offset: (currentPage2.value - 1) * pageSize2.value,
            }).then(data => {
                if (!data.success && data.errorCode == 401) {
                    router.push('/login');
                    return;
                }

                loading.value = false
                console.log(data.items)
                tableData.value = data.items
                totalCount.value = data.total
            });
        };

        const onLoad = () => {
            CheckLogin()
            loadList()
        };
        onLoad();

        return {
            tableData,
            loading,
            input3,
            currentPage2,
            pageSize2,
            background,
            totalCount,
            copyToClipboard,
            getStatus,
            onLoad,
            handleDelete,
            loadList,
            getDate,
            handleNew,
            handleEdit,
            enableRedemption,
            disableRedemption,
            showAdvSearchFrom,
            Check,
            Edit,
            Delete,
            Search,
            CopyDocument,
            DateInfo,
            Lock,
            Finished
        };
    }
}
</script>
<style>
.el-pagination.is-background {
    margin: 20px 0 0;
}
</style>