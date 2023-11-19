<template>
    <div class="user-list-page ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">用户列表
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>查看用户的列表并进行管理</p>
                </div>
                <div class="example">
                    <el-table :data="tableData" style="width: 100%" v-loading="loading">
                        <el-table-column type="expand">
                            <template #default="props">
                                <div m="4">
                                    <p m="t-0 b-2">id: {{ props.row.id }}</p>
                                    <p m="t-0 b-2">用户: {{ props.row.username }}</p>
                                    <p m="t-0 b-2">昵称: {{ props.row.displayName }}</p>
                                    <p m="t-0 b-2">分组: {{ props.row.group }}</p>
                                    <p m="t-0 b-2">统计: {{ props.row.requestCount }}</p>
                                    <p m="t-0 b-2">已用: {{ (props.row.usedQuota / 500000).toFixed(2) }}</p>
                                    <p m="t-0 b-2">剩余: {{ (props.row.quota / 500000).toFixed(2) }}</p>
                                    <p m="t-0 b-2">分享码: {{ props.row.affCode }}</p>
                                    <p m="t-0 b-2">邮件: {{ props.row.email }}</p>
                                    <p m="t-0 b-2">角色: {{ props.row.role == 1 ? '管理' : '用户' }}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="displayName" label="名称" sortable />
                        <el-table-column label="状态" width="100" sortable prop="status">
                            <template #default="props">
                                <el-tooltip class="box-item" effect="dark" content="点击切换渠道禁用启用状态" placement="top">
                                    <el-button :icon="Check" type="success" circle v-if="props.row.status == 1"
                                        @click="disableUser(props.row.id)" />
                                    <el-button :icon="Lock" type="info" circle v-if="props.row.status == 2"
                                        @click="enableUser(props.row.id)" />
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="分组" width="160" sortable prop="group">
                            <template #default="props">
                                <el-button :type="getGroupColor(props.row.group)" plain>{{ props.row.group }}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="requestCount" label="统计" width="100" sortable />
                        <el-table-column label="已用" width="100" sortable prop="usedQuota">
                            <template #default="props">
                                ${{ (props.row.usedQuota / 500000).toFixed(2) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="剩余" width="100" sortable prop="quota">
                            <template #default="props">
                                ${{ (props.row.quota / 500000).toFixed(2) }}
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100">
                            <template #default="props">
                                <el-button type="danger" :icon="Delete" circle @click="handleDelete(props.row.id)" />
                                <el-button type="primary" :icon="Edit" circle @click="handleEdit(props.row.id)" />
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
                            <a class="toc-link" href="#用户配置" title="用户配置">
                                <p>用户配置</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>
  
 
<script>
import { getErrorMessage } from '@/utils/enums'
import { useRouter } from 'vue-router';
import { getUsers, CheckLogin, deleteUser, getUser, updateUser } from '@/api/user'
import {
    Check,
    Delete,
    Edit,
    Search,
    CopyDocument,
    Lock
} from '@element-plus/icons-vue'
import { h, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
    name: 'UserList',
    setup() {
        const router = useRouter();
        const loading = ref(true)
        const currentPage2 = ref(1)
        const pageSize2 = ref(20)
        const totalCount = ref(0)
        const input3 = ref('')
        const background = ref(true)

        const handleClick = () => {
            console.log('click')
        }

        const getGroupColor = (group) => {
            switch (group) {
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

        const tableData = ref([]);
        const loadList = () => {
            loading.value = true
            getUsers({
                limit: pageSize2.value,
                offset: (currentPage2.value - 1) * pageSize2.value,
            }).then(data => {
                loading.value = false
                console.log(data.items)
                tableData.value = data.items
                totalCount.value = data.total
            });
        };
        const enableUser = (id) => {
            loading.value = true
            getUser({
                id: id
            }).then(data => {
                data.item.status = 1
                updateUser(data.item).then(item => {
                    loadList()
                    console.log(item)
                    ElMessage({
                        type: 'success',
                        message: '用户已启用',
                    })
                });
            });
        };

        const disableUser = (id) => {
            loading.value = true
            getUser({
                id: id
            }).then(data => {
                data.item.status = 2
                updateUser(data.item).then(item => {
                    loadList()

                    if (item.success) {
                        ElMessageBox({
                            title: '成功',
                            message: h('p', null, [
                                h('span', null, '操作成功'),
                            ])
                        })
                    } else {
                        var errorMessage = getErrorMessage(data.errorMessage)
                        ElMessageBox({
                            title: '未成功',
                            message: h('p', null, [
                                h('span', null, '操作未成功,' + errorMessage),
                            ]),
                        })
                    }
                });
            });
        };

        const handleDelete = (id) => {
            ElMessageBox.confirm(
                '直接删除用户，请确认?',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            )
                .then(() => {
                    loading.value = true
                    deleteUser({
                        id: id
                    }).then(data => {
                        if (data.success) {
                            ElMessage({
                                type: 'success',
                                message: '删除已完成',
                            })
                        } else {
                            var errorMessage = "请确认操作是否正确。"
                            switch (data.errorMessage) {
                                case "InvalidId":
                                    errorMessage = "请指定用户"
                                    break;
                                case "AccessDenied":
                                    errorMessage = "请检查登录"
                                    break;
                                case "InvalidUserAccessUser":
                                    errorMessage = "请检查权限"
                                    break;
                                case "DeleteSelfError":
                                    errorMessage = "您不能删除自己"
                                    break;
                                default:
                                    break;
                            }
                            ElMessage({
                                type: 'info',
                                message: '删除已取消,' + errorMessage,
                            })
                        }
                        loadList()
                    });
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '删除已取消',
                    })
                })
        }

        const handleEdit = (id) => {
            router.push(`/users/${id}`)
        }
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
            getGroupColor,
            onLoad,
            handleClick,
            handleDelete,
            loadList,
            handleEdit,
            disableUser,
            enableUser,
            Check,
            Edit,
            Delete,
            Search,
            CopyDocument,
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