<template>
    <div class="token-list-page ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">令牌
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以创建不同的令牌用于不同的用途。</p>
                </div>
                <div class="example">
                    <el-button-group class="ml-4">
                        <el-button type="primary" :icon="Edit"  @click="handleNew"/>  
                    </el-button-group>
                    <div style="border-top: 1px solid #e9e9eb; display: block; width: 100%;margin: 10px 0 0 0;height: 1px;">
                    </div>
                    <el-table :data="tableData" style="width: 100%" v-loading="loading">
                        <el-table-column type="expand">
                            <template #default="props">
                                <div m="4">
                                    <p m="t-0 b-2">id: {{ props.row.id }}</p>
                                    <p m="t-0 b-2">过期时间:
                                        <span v-if="props.row.expiredTime == -1">永不过期</span>
                                        <span v-if="props.row.expiredTime != -1">{{ getDate(props.row.expiredTime) }}</span>
                                    </p>
                                    <p m="t-0 b-2">名称: {{ props.row.name }}</p>
                                    <p m="t-0 b-2">剩余额度: {{ (props.row.remainQuota / 500000).toFixed(2) }}</p>
                                    <p m="t-0 b-2">状态: {{ getStatus(props.row.status) }}</p>
                                    <p m="t-0 b-2">不限制额度: {{ (props.row.unlimitedQuota).toFixed(2) }} </p>
                                    <p m="t-0 b-2">已使用额度: {{ (props.row.usedQuota / 500000).toFixed(2) }}</p>
                                    <p m="t-0 b-2">统计（请求次数）: {{ props.row.requestCount }}</p>
                                    <p m="t-0 b-2">用户ID: {{ props.row.userId }}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="名称"  sortable  />
                        <el-table-column label="状态" width="100" sortable prop="status">
                            <template #default="props">
                                <el-tooltip class="box-item" effect="dark" content="点击切换渠道禁用启用状态" placement="top">
                                    <el-button :icon="Check" type="success" circle v-if="props.row.status == 1"
                                        @click="disableToken(props.row.id)" />
                                    <el-button :icon="Lock" type="info" circle v-if="props.row.status == 2"
                                        @click="enableToken(props.row.id)" />
                                </el-tooltip>
                            </template>
                        </el-table-column>
                        <el-table-column label="已用" width="100" sortable prop="usedQuota">
                            <template #default="props">
                                {{ (props.row.usedQuota / 500000).toFixed(2) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="统计" width="100" sortable prop="requestCount">
                            <template #default="props">
                                {{ props.row.requestCount }}
                            </template>
                        </el-table-column>
                        <el-table-column label="剩余" width="100" sortable prop="remainQuota">
                            <template #default="props">
                                {{ (props.row.remainQuota / 500000).toFixed(2) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="过期" width="100" sortable prop="expiredTime">
                            <template #default="props">
                                <span v-if="props.row.expiredTime == -1">永不过期</span>
                                <DateInfo :pubDate="props.row.expiredTime" v-if="props.row.expiredTime != -1" />
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="150">
                            <template #default="props">
                                <el-button type="danger" :icon="Delete" circle @click="handleDelete(props.row.id)" />
                                <el-button type="primary" :icon="Edit" circle @click="handleEdit(props.row.id)" />
                                <el-tooltip class="box-item" effect="dark" content="点击复制" placement="top">
                                    <el-button :icon="CopyDocument" circle @click="copyToClipboardPopup(props.row.key)" />
                                </el-tooltip>
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
                            <a class="toc-link" href="/tokens/new" title="令牌添加">
                                <p>令牌添加</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
        <el-dialog v-model="dialogTableVisible" title="复制令牌">
            <div>
                您可以选择复制
                <div style="height: 10px; width: 100%;"></div>
                <el-button-group>
                    <el-button type="primary" :icon="ArrowLeft" @click="copyToClipboard(copyKey)">Key</el-button>
                    <el-button type="primary"  @click="copyForNextWeb()">Chat Next Web</el-button>
                    <el-button type="primary"  @click="copyForAMA()">AMA</el-button>
                    <el-button type="primary"  @click="copyForOpenCat()">
                        Open Cat<el-icon class="el-icon--right">
                            <ArrowRight />
                        </el-icon>
                    </el-button>
                </el-button-group>
            </div>
            <div style="height: 10px; width: 100%;"></div>
            <div style="pading-top:10px">
                您也可以选择直接点击进行聊天
                <div style="height: 10px; width: 100%;"></div>
                <el-button-group> 
                    <el-button type="primary" :icon="ArrowLeft"  @click="openNextWeb()">Chat Next Web</el-button>
                    <el-button type="primary"  @click="openAMA()">AMA</el-button>
                    <el-button type="primary"  @click="openOpenCat()">
                        Open Cat<el-icon class="el-icon--right">
                            <ArrowRight />
                        </el-icon>
                    </el-button>
                </el-button-group>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { getTokenStatus } from '@/utils/enums'
import { getTokens, deleteToken, getToken, updateToken } from '@/api/token'
import { CheckLogin } from '@/api/user'
import {
    Check,
    Delete,
    Edit,
    Search,
    CopyDocument,
    Lock
} from '@element-plus/icons-vue'
import { ref } from 'vue';
import DateInfo from '@/components/DateInfo.vue';
import { ElMessageBox, ElMessage } from 'element-plus'
export default {
    name: 'TokenList',
    components: {
        DateInfo, // 注册 DateInfo 组件
    },
    setup() {
        const router = useRouter();
        const loading = ref(true)
        const currentPage2 = ref(1)
        const pageSize2 = ref(20)
        const totalCount = ref(0)
        const input3 = ref('')
        const background = ref(true)
        const dialogTableVisible = ref(false)
        const copyKey = ref('')
        const getStatus = (status) => {
            return getTokenStatus(status)
        }


        const handleNew = () =>{
            router.push(`/tokens/new`) 
        }

        const handleEdit = (id) => {
            router.push(`/tokens/${id}`)
        }

        const copyToClipboardPopup = (key) => {
            dialogTableVisible.value = true;
            copyKey.value = 'sk-' + key;
        }

        const copyForNextWeb =() => {
            var str = 'https://freetalk.8ai.link/#/?settings={"key":"' + copyKey.value + '","url":"https://' + window.location.host+'"}'
            copyToClipboard(str)
        }
        const copyForAMA =() => {  
            var str = 'ama://set-api-key?server=https%3A%2F%2F' + window.location.host+'&key=' + copyKey.value
            copyToClipboard(str)
        }
        const copyForOpenCat =() => {
            var str = 'opencat://team/join?domain=https%3A%2F%2F' + window.location.host+'&token=' + copyKey.value
            copyToClipboard(str)
        }
        const openNextWeb =() => {
            var str = 'https://freetalk.8ai.link/#/?settings={"key":"' + copyKey.value + '","url":"https://' + window.location.host+'"}'
            window.open(str)
        }
        const openAMA =() => {  
            var str = 'ama://set-api-key?server=https%3A%2F%2F' + window.location.host+'&key=' + copyKey.value
            window.open(str)
        }
        const openOpenCat =() => {
            var str = 'opencat://team/join?domain=https%3A%2F%2F' + window.location.host+'&token=' + copyKey.value
            window.open(str)
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


        const enableToken = (id) => {
            loading.value = true
            getToken({
                id: id
            }).then(data => {
                data.item.status = 1
                updateToken(data.item).then(item => {
                    loadList()
                    console.log(item)
                    ElMessage({
                        type: 'success',
                        message: '令牌已启用',
                    })
                });
            });
        };

        const disableToken = (id) => {
            loading.value = true
            getToken({
                id: id
            }).then(data => {
                data.item.status = 2
                updateToken(data.item).then(item => {
                    loadList()
                    console.log(item)
                    ElMessage({
                        type: 'success',
                        message: '令牌已禁用',
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
                '直接删除令牌，请确认?',
                'Warning',
                {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                }
            )
                .then(() => {

                    loading.value = true
                    deleteToken({
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
            getTokens({
                limit: pageSize2.value,
                offset: (currentPage2.value - 1) * pageSize2.value,
            }).then(data => {
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
            copyKey,
            dialogTableVisible,
            copyToClipboardPopup,
            copyForNextWeb,
            copyForAMA,
            copyForOpenCat,
            openNextWeb,
            openAMA,
            openOpenCat,
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
            handleNew,
            handleDelete,
            loadList,
            getDate,
            handleEdit,
            enableToken,
            disableToken,
            Check,
            Edit,
            Delete,
            Search,
            CopyDocument,
            DateInfo,
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