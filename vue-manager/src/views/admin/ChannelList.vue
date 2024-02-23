<template>
    <div class="channel-page ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">渠道
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以设置多个渠道用以优化访问策略。</p>
                </div>
                <div class="example">
                    <el-row>
                        <el-col :span="20">
                            <el-button-group class="ml-4">
                                <el-tooltip class="box-item" effect="dark" content="新建频道" placement="top">
                                    <el-button type="primary" :icon="Edit" @click="handleNew" />
                                </el-tooltip>
                                <el-tooltip class="box-item" effect="dark" content="查看模型清单" placement="top">
                                    <el-button type="primary" :icon="Grid" @click="goModels" />
                                </el-tooltip>
                                <el-tooltip class="box-item" effect="dark" content="刷新本页频道余额" placement="top">
                                    <el-button type="primary" :icon="Money" @click="handleRefreshBalanceAll" />
                                </el-tooltip>
                                <el-tooltip class="box-item" effect="dark" content="测试本页频道速率" placement="top">
                                    <el-button type="primary" :icon="Refresh" @click="handleTestAll" />
                                </el-tooltip>
                                <el-tooltip class="box-item" effect="dark" content="删除本页已禁用频道" placement="top">
                                    <el-button type="primary" :icon="FolderDelete" @click="handleDeleteDisabled" />
                                </el-tooltip>
                            </el-button-group>
                        </el-col>
                        <el-col :span="4" style="text-align: right; color: #e9e9eb;">
                            管理
                            <el-switch v-model="showAdvSearchFrom" />
                        </el-col>
                    </el-row>
                    <div v-show="showAdvSearchFrom">
                        <div style="clear: both;  display: block; width: 100%;margin: 10px 0 0px 0;height: 1px;">
                        </div>
                        <div class="mt-4">
                            <el-input v-model="searchForm.baseUrl" placeholder="请输入代理地址" class="input-with-select"
                                @keydown.enter="loadList">
                                <template #prepend>
                                    <el-select v-model="searchForm.status" placeholder="Select" style="width: 115px">
                                        <el-option label="不限状态" :value="-2" />
                                        <el-option label="回收站" value="-1" />
                                        <el-option label="启用" value="1" />
                                        <el-option label="禁用" value="2" />
                                    </el-select>
                                </template>
                            </el-input>
                        </div>
                        <el-divider border-style="dotted" style="margin: 10px 0 0 0;" />
                        <div class="mt-4">
                            <el-input v-model="searchForm.model" placeholder="请输入模型名 model" class="input-with-select"
                                @keydown.enter="loadList">
                                <template #prepend>
                                    <el-select v-model="searchForm.type" placeholder="Select" style="width: 115px">
                                        <el-option label="不限类型" :value="-1" />
                                        <el-option v-for="item in types" v-bind:key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </template>
                            </el-input>
                        </div>
                        <el-divider border-style="dotted" style="margin: 10px 0 0 0;" />
                        <div class="mt-4">
                            <el-input v-model="searchForm.keyword" placeholder="请输入名称关键词 keyword" class="input-with-select"
                                @keydown.enter="loadList">
                                <template #prepend>
                                    <el-select v-model="searchForm.group" placeholder="Select" style="width: 115px">
                                        <el-option label="不限分组" value="all" />
                                        <el-option label="default" value="default" />
                                        <el-option label="vip" value="vip" />
                                        <el-option label="svip" value="svip" />
                                    </el-select>
                                </template>
                                <template #append>
                                    <el-button :icon="Search" @click="loadList" />
                                </template>
                            </el-input>
                        </div>
                        <div class="mt-4">
                            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :small="false"
                                :disabled="false" :hide-on-single-page="true" :background="background"
                                layout="prev,  jumper, next, ->, total" :total="totalCount" @current-change="loadList" />
                        </div>
                    </div>
                    <el-divider border-style="dotted" style="margin: 10px 0 4px 0;" />
                    <el-table :data="tableData" style="width: 100%" v-loading="loading">
                        <el-table-column type="expand">
                            <template #default="props">
                                <div m="4">
                                    <p m="t-0 b-2">id: {{ props.row.id }}</p>
                                    <p m="t-0 b-2">分类: {{ getType(props.row.type) }}</p>
                                    <p m="t-0 b-2">状态: {{ getStatus(props.row.status) }}</p>
                                    <p m="t-0 b-2">名称: {{ props.row.name }}</p>
                                    <p m="t-0 b-2">响应时间: {{ props.row.responseTime }}</p>
                                    <p m="t-0 b-2">代理: {{ props.row.baseUrl }}</p>
                                    <p m="t-0 b-2">余额: {{ props.row.balance }}</p>
                                    <p m="t-0 b-2">模型: {{ props.row.models }}</p>
                                    <p m="t-0 b-2">分组: {{ props.row.group }}</p>
                                    <p m="t-0 b-2">权重: {{ props.row.weight }}</p>
                                    <p m="t-0 b-2">已消耗: {{ props.row.usedQuota }}</p>
                                    <p m="t-0 b-2">创建时间: {{ getDate(props.row.createdTime) }} </p>
                                    <p m="t-0 b-2">测试时间: {{ getDate(props.row.testTime) }}</p>
                                    <p m="t-0 b-2">余额更新时间: {{ getDate(props.row.balanceUpdatedTime) }}
                                    </p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="名称" sortable prop="name">
                            <template #default="props">
                                <router-link :to="'/channels/' + props.row.id" class="toc-link">
                                    {{ props.row.name }}
                                </router-link>
                            </template>
                        </el-table-column>
                        <el-table-column label="分组" width="160" sortable prop="group">
                            <template #default="props">
                                <div v-for="group in props.row.group.split(',')" :key="group">
                                    <el-tag class="tag-2" type="info" v-if="group == 'default'">{{ group }}</el-tag>
                                    <el-tag class="tag-2" type="success" v-if="group == 'vip'">{{ group }}</el-tag>
                                    <el-tag class="tag-2" type="danger" v-if="group == 'svip'">{{ group }}</el-tag>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="状态" width="100" sortable prop="status">
                            <template #default="props">
                                <el-tooltip class="box-item" effect="dark" content="点击切换渠道禁用启用状态" placement="top">
                                    <el-button :icon="Check" type="success" circle v-if="props.row.status == 1"
                                        @click="disableChannel(props.row.id)" />
                                    <el-button :icon="Lock" type="info" circle v-if="props.row.status == 2"
                                        @click="enableChannel(props.row.id)" />
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="类型" width="100" sortable prop="type">
                            <template #default="props">
                                <div m="4">
                                    <p m="t-0 b-2">{{ getType(props.row.type) }}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="权重" width="80" sortable prop="weight" v-if="!showAdvSearchFrom">
                            <template #default="props">
                                {{ props.row.weight }}
                            </template>
                        </el-table-column>
                        <el-table-column label="响应" width="100" sortable prop="responseTime">
                            <template #default="props">
                                <div m="4">
                                    <el-tooltip class="box-item" effect="dark" content="点击进行更新" placement="top">
                                        <p m="t-0 b-2" @click="getNewResponseTime(props.row.id)"
                                            style="cursor: pointer; text-align: center;">{{
                                                (props.row.responseTime / 1000).toFixed(2) }} 秒</p>
                                    </el-tooltip>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="余额" width="100" sortable prop="balance">
                            <template #default="props">
                                <div m="4">
                                    <el-tooltip class="box-item" effect="dark" content="点击进行更新" placement="top"
                                        v-if="(props.row.baseUrl && props.row.baseUrl != '') || props.row.key.indexOf('sess') == 0">
                                        <p m="t-0 b-2" @click="getNewChannelBalance(props.row.id)"
                                            style="cursor: pointer; text-align: center;">${{ props.row.balance.toFixed(2) }}
                                        </p>
                                    </el-tooltip>
                                    <el-text class="mx-1" type="primary" v-if="(!props.row.baseUrl || props.row.baseUrl == '') &&
                                        (props.row.key.indexOf('sess') != 0)">官key</el-text>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" v-if="showAdvSearchFrom">
                            <template #default="props">
                                <el-button type="primary" :icon="Edit" circle @click="handleEdit(props.row.id)" />
                                <el-button type="danger" :icon="Delete" circle @click="handleDelete(props.row.id)" />
                            </template>
                        </el-table-column>
                    </el-table>
                    <div>
                        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :small="false"
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
import { getChannels, getChannelResponseTime, getChannelBalance, deleteChannel, updateChannel, getChannel } from '@/api/channel'
import { CheckLogin } from '@/api/user'
import { getAllModels, getActivatedChannelTypes, getChannelStatus, getChannelType } from '@/utils/enums'
import {
    Check,
    Delete,
    Edit,
    Search,
    Refresh,
    FolderDelete,
    Grid,
    Lock,
    Money
} from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { ref } from 'vue';
export default {
    name: 'ChannelList',
    setup() {
        const router = useRouter();
        const loading = ref(true)
        const currentPage = ref(1)
        const pageSize = ref(50)
        const totalCount = ref(0)
        const input3 = ref('')
        const models = ref([])
        const types = ref([])
        const background = ref(true)
        const showAdvSearchFrom = ref(false)
        // const showChangeColum = ref(false)
        const searchForm = ref({
            "type": -1,
            "model": "",
            "keyword": "",
            "group": "all",
            "status": -2,
            "baseUrl": ""
        })

        const getDate = (timestamp) => {
            const date = new Date(timestamp);
            const dateString = date.toLocaleString();
            return dateString;
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

        const goModels = () => {
            router.push(`/models`)
        }

        const handleNew = () => {
            router.push(`/channel/new`)
        }

        const handleEdit = (id) => {
            router.push(`/channels/${id}`)
        }
        const enableChannel = (id) => {
            loading.value = true
            getChannel({
                id: id
            }).then(data => {
                data.item.status = 1
                updateChannel(data.item).then(item => {
                    loadList()
                    console.log(item)
                    ElMessage({
                        type: 'success',
                        message: '渠道已启用',
                    })
                });
            });
        };
        const disableChannel = (id) => {
            loading.value = true
            getChannel({
                id: id
            }).then(data => {
                data.item.status = 2
                updateChannel(data.item).then(item => {
                    loadList()
                    console.log(item)
                    ElMessage({
                        type: 'success',
                        message: '渠道已禁用',
                    })
                });
            });
        };
        const handleDeleteAction = (id) => {
            loading.value = true
            deleteChannel({
                id: id
            }).then(data => {
                console.log(data.items)
                loading.value = false
                loadList()
            });
            ElMessage({
                type: 'success',
                message: '删除已完成',
            })
        }

        const handleDelete = (id) => {
            ElMessageBox.confirm(
                '直接删除渠道，请确认?',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            )
                .then(() => {
                    handleDeleteAction(id)
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '删除已取消',
                    })
                })
        }

        const getStatus = (status) => {
            return getChannelStatus(status)
        }
        const getType = (type) => {
            return getChannelType(type)
        }

        const getNewChannelBalance = (id) => {
            loading.value = true
            getChannelBalance({
                id: id
            }).then(wallet => {
                loadList()
                // console.log(wallet) 
                ElMessage({
                    type: 'success',
                    message: `余额已更新【${wallet.item.toFixed(2)}】`,
                })
            });
        };

        const getItemChannelBalance = (id, name) => {
            loading.value = true
            getChannelBalance({
                id: id
            }).then(wallet => {
                // console.log(wallet) 
                if (wallet && wallet.item) {
                    ElMessage({
                        type: 'success',
                        message: `${name}余额已更新【${wallet.item.toFixed(2)}】`,
                    })
                }
            });
        };

        const handleTestAll = () => {
            ElMessage({
                type: 'success',
                message: '速率测试会逐一完成，请耐心等待',
            })

            for (var rowIndex in tableData.value) {
                var row = tableData.value[rowIndex]
                if ((row.status == 1 && row.key && row.key.indexOf('sess') > -1) ||
                    (row.status == 1 && row.baseUrl && row.baseUrl != '')) {
                    getItemResponseTime(row.id, row.name)
                }
            }

            setTimeout(function () {
                loadList()
            }, 10000)

            setTimeout(function () {
                loadList()
            }, 20000)
        };

        const handleDeleteDisabled = () => {
            var disabledRows = tableData.value.filter(function (item) {
                return item.status == 2
            })

            if (!disabledRows || disabledRows.length < 1) {
                ElMessage({
                    type: 'info',
                    message: '本页没有需要删除的内容',
                })
                return;
            }

            ElMessageBox.confirm(
                '您选择了一次删除本页所有的已禁用频道，请确认?',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            ).then(() => {

                for (var rowIndex in disabledRows) {
                    var row = disabledRows[rowIndex]
                    handleDeleteAction(row.id)
                }

                setTimeout(function () {
                    loadList()
                }, 10000)
            })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '删除已取消',
                    })
                })
        }

        const handleRefreshBalanceAll = () => {
            ElMessage({
                type: 'success',
                message: '余额刷新会逐一完成，请耐心等待',
            })

            var aliveRows = tableData.value.filter(function (item) {
                return item.status == 1
            })

            for (var rowIndex in aliveRows) {
                var row = aliveRows[rowIndex]
                getItemChannelBalance(row.id, row.name)
            }

            setTimeout(function () {
                loadList()
            }, 10000)

            setTimeout(function () {
                loadList()
            }, 20000)
        }

        const getItemResponseTime = (id, name) => {
            loading.value = true
            getChannelResponseTime({
                id: id
            }).then(data => {
                ElMessage({
                    type: 'success',
                    message: `连接${name}测试已完成【${(data.item / 1000).toFixed(2)}秒】`,
                })
            });
        };

        const getNewResponseTime = (id) => {
            loading.value = true
            getChannelResponseTime({
                id: id
            }).then(time => {
                loadList()
                // console.log(time)
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

        const tableData = ref([]);
        const loadList = () => {
            loading.value = true
            getChannels({
                type: searchForm.value.type == -1 ? null : searchForm.value.type,
                model: searchForm.value.model == 'all' ? '' : searchForm.value.model,
                keyword: searchForm.value.keyword,
                group: searchForm.value.group == 'all' ? '' : searchForm.value.group,
                limit: pageSize.value,
                offset: (currentPage.value - 1) * pageSize.value,
                status: searchForm.value.status,
                baseUrl: searchForm.value.baseUrl
            }).then(data => {
                if (!data.success && data.errorCode == 401) {
                    router.push('/login');
                    return;
                }

                loading.value = false
                console.log(data)
                tableData.value = data.items
                totalCount.value = data.total
                console.log(totalCount.value)
            });
        };


        const onLoad = () => {
            models.value = getAllModels(1)
            types.value = getActivatedChannelTypes().filter(function (item) {
                return item.value != 0
            })
            CheckLogin()
            loadList()
        };
        onLoad();

        return {
            tableData,
            loading,
            input3,
            currentPage,
            pageSize,
            background,
            totalCount,
            searchForm,
            showAdvSearchFrom,
            models,
            types,
            onLoad,
            handleTestAll,
            handleDeleteDisabled,
            handleRefreshBalanceAll,
            handleNew,
            handleEdit,
            handleDelete,
            enableChannel,
            disableChannel,
            goModels,
            loadList,
            getStatus,
            getType,
            getDate,
            getNewChannelBalance,
            getNewResponseTime,
            getGroupColor,
            // DateInfo,
            Check,
            Edit,
            Delete,
            Search,
            Lock,
            Grid,
            Refresh,
            FolderDelete,
            Money
        };
    }
}
</script>
<style>
.el-pagination.is-background {
    margin: 20px 0 0;
}

.tag-2 {
    /* display: block; */
    float: left;
    margin-right: 3px;
    margin-bottom: 3px;
}
</style>