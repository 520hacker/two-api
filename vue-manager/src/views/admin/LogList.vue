<template>
    <div class="log-list-page ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">日志
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>查看所有的通信日志</p>
                </div>
                <div class="example">
                    <div>
                        <div style="float:right; padding-right:30px; text-align: right; color: #e9e9eb;">
                            搜索
                            <el-switch v-model="showAdvSearchFrom" />
                        </div>
                        <div
                            style="clear: both;  display: block; width: 100%;margin: 10px 0 0px 0;height: 1px; border-bottom: 1px  dotted #ddd  ;">
                        </div>
                    </div>
                    <div v-show="showAdvSearchFrom">
                        <div style="clear: both;  display: block; width: 100%;margin: 10px 0 0px 0;height: 1px;">
                        </div>
                        <div class="mt-4">排除Token:
                            <el-checkbox-group v-model="exclude_tokens">
                                <el-checkbox label="system" key="system"/>
                                <el-checkbox :label="token.name" :key="token.name" v-for="token in tokens" />
                            </el-checkbox-group>
                        </div>
                        <div style="clear: both;  display: block; width: 100%;margin: 10px 0 0px 0;height: 1px;">
                        </div>
                        <div class="mt-4">
                            <el-input v-model="searchForm.keyword" placeholder="Please input keyword"
                                class="input-with-select" @keydown.enter="loadList">
                                <template #prepend>
                                    <el-select v-model="searchForm.type" placeholder="Select" style="width: 115px">
                                        <el-option label="不限类型" :value="-2" />
                                        <el-option v-for="item in types" v-bind:key="item.value" :label="item.label"
                                            :value="item.value" />
                                    </el-select>
                                </template>
                            </el-input>
                        </div>
                        <div style="clear: both;  display: block; width: 100%;margin: 10px 0 0px 0;height: 1px;">
                        </div>
                        <div class="mt-4">
                            <el-input v-model="searchForm.tokenname" placeholder="Please input token name"
                                class="input-with-select" @keydown.enter="loadList">
                                <template #prepend>
                                    <el-select v-model="searchForm.model" placeholder="Select" style="width: 115px">
                                        <el-option label="不限模型" value="" />
                                        <el-option v-for="model in models" v-bind:key="model" :label="model"
                                            :value="model" />
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
                    <el-table :data="tableData" style="width: 100%" v-loading="loading">
                        <el-table-column type="expand">
                            <template #default="props">
                                <div m="4">
                                    <p m="t-0 b-2">Id: {{ props.row.id }}</p>
                                    <p m="t-0 b-2">用户: {{ props.row.username }}</p>
                                    <p m="t-0 b-2">渠道: {{ props.row.channelName }}</p>
                                    <p m="t-0 b-2">令牌: {{ props.row.tokenName }}</p>
                                    <p m="t-0 b-2">类型: {{ getLogType(props.row.type) }}</p>
                                    <p m="t-0 b-2">模型: {{ props.row.modelName }}</p>
                                    <p m="t-0 b-2">提示: {{ props.row.promptTokens }}</p>
                                    <p m="t-0 b-2">补全: {{ props.row.completionTokens }}</p>
                                    <p m="t-0 b-2">消耗: {{ (props.row.quota / 500000).toFixed(4) }}</p>
                                    <p m="t-0 b-2">详情: {{ props.row.content }}
                                        【
                                        <router-link :to="'/logs/' + props.row.id" class="toc-link">
                                            更多
                                        </router-link> 】
                                    </p>
                                    <p m="t-0 b-2">连接速率: {{ (props.row.responseTime / 1000).toFixed(2) }} 秒</p>
                                    <hr />
                                    <p m="t-0 b-2">
                                        <DateInfo :pubDate="props.row.createAt" />
                                    </p>
                                </div>
                            </template>
                        </el-table-column>

                        <el-table-column label="创建" width="100" sortable prop="createAt">
                            <template #default="props">
                                <DateInfo :pubDate="props.row.createAt" />
                            </template>
                        </el-table-column>
                        <el-table-column label="用户-渠道-令牌" sortable prop="tokenName">
                            <template #default="props">
                                {{ props.row.username }}-<el-tooltip class="box-item" effect="dark" content="点击编辑渠道信息"
                                    placement="top"><router-link :to="'/channels/' + props.row.channelId" class="toc-link"
                                        v-show="props.row.channelName != 'Deleted'">{{ props.row.channelName
                                        }}</router-link></el-tooltip><span
                                    v-show="props.row.channelName == 'Deleted'">已删除</span>-{{
                                        props.row.tokenName }}
                            </template>
                        </el-table-column>
                        <el-table-column label="用户提问" width="180">
                            <template #default="props">
                                <div style="overflow: hidden;  height: 48px;  display: block;  width: 100%;">
                                    <span
                                        v-if="props.row.content == '使用四到五个字直接返回这句话的简要主题，不要解释、不要标点、不要语气词、不要多余文本，如果没有主题，请直接返回“闲聊”'">为对话取一个标题</span>
                                    <router-link :to="'/logs/' + props.row.id" target="_blank" class="toc-link"
                                        v-if="props.row.content != '使用四到五个字直接返回这句话的简要主题，不要解释、不要标点、不要语气词、不要多余文本，如果没有主题，请直接返回“闲聊”'">{{
                                            props.row.content }}</router-link>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="类型" width="80" sortable prop="type">
                            <template #default="props">
                                {{ getLogType(props.row.type) }}
                            </template>
                        </el-table-column>
                        <el-table-column label="秒" width="80" sortable prop="responseTime">
                            <template #default="props">
                                {{ (props.row.responseTime / 1000).toFixed(2) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="modelName" label="模型" width="150" sortable />
                        <el-table-column label="消耗" width="80" sortable prop="quota">
                            <template #default="props">
                                <span v-show="props.row.type == 2">
                                    {{ (props.row.quota / 500000).toFixed(4) }}
                                </span>
                                <span v-show="props.row.type != 2">-</span>
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
                        <li class="toc-item"><a class="toc-link" href="#日志" title="日志">
                                <p>日志</p>
                            </a></li>
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>
  
<script>
import { useRouter } from 'vue-router';
import { getLogs } from '@/api/log'
import { getTokens } from '@/api/token'
import { CheckLogin } from '@/api/user'
import {
    Search,
    Check,
    Delete,
    Edit,
    CopyDocument
} from '@element-plus/icons-vue'
import { ref } from 'vue';
import DateInfo from '@/components/DateInfo.vue';
import { getAllLogTypes, getAllModels } from '@/utils/enums'
export default {
    name: 'LogList',
    components: {
        DateInfo, // 注册 DateInfo 组件
    },
    setup() {
        const router = useRouter();
        const models = ref(['gpt-3.5-turbo'])
        const loading = ref(true)
        const currentPage2 = ref(1)
        const pageSize2 = ref(50)
        const totalCount = ref(0)
        const background = ref(true)
        const showAdvSearchFrom = ref(false)
        const types = ref([])
        const exclude_tokens = ref(["status"])
        const tokens = ref([])
        const searchForm = ref({
            "type": -2,
            "model": "",
            "username": "",
            "keyword": "",
            "tokenname": ""
        })

        const handleClick = () => {
            console.log('click')
        }

        const getLogType = (typeId) => {
            switch (typeId) {
                case 2:
                    return "消费";
                case 4:
                    return "更新文档";
                case 8:
                    return "充值";
                case 16:
                    return "配置";
                case 32:
                    return "禁用频道";
                case 128:
                    return "频道降权";
                default:
                    return "默认";
            }
        };

        const tableData = ref([]);
        const loadList = () => {
            types.value = getAllLogTypes();
            models.value = getAllModels(1);
            loading.value = true

            getLogs({
                limit: pageSize2.value,
                offset: (currentPage2.value - 1) * pageSize2.value,
                model: searchForm.value.model,
                type: searchForm.value.type,
                username: searchForm.value.username,
                tokenName: searchForm.value.tokenname,
                keyword: searchForm.value.keyword,
                excludeTokens: exclude_tokens.value.join(',')
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

            getTokens({
                limit: 100,
                offset: 0,
            }).then(data => {
                console.log(data.items)
                tokens.value = data.items
            });
        };
        const onLoad = () => {
            CheckLogin()
            loadList()

            setInterval(() => {
                loadList()
            }, 300000);
        };
        onLoad();


        return {
            models,
            loading,
            currentPage2,
            pageSize2,
            totalCount,
            background,
            tokens,
            exclude_tokens,
            tableData,
            types,
            searchForm,
            showAdvSearchFrom,
            onLoad,
            handleClick,
            Search,
            Check,
            Edit,
            Delete,
            CopyDocument,
            loadList,
            getLogType,
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