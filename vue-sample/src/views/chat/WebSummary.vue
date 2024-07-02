<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <div class="guide">
                    <div class="guide-left">设定：[ <el-text class="mx-1" type="primary">{{ cur_prompt.name }}</el-text> ]
                        <el-button :icon="Operation" v-show="!showPrompt" @click="handleShowPrompt(true)" /><el-button
                            :icon="CloseBold" v-show="showPrompt" @click="handleShowPrompt(false)" />
                    </div>
                    <div class="guide-right">
                        <el-dropdown @command="handleModelChange">
                            <div class="el-dropdown-link">
                                [ <el-text class="mx-1" type="warning">{{ model }}</el-text> ]&nbsp;<el-button
                                    :icon="ArrowDown" style="width: 14px; height:14px; margin-right: 8px" /></div>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item v-for="model_item, index in mainModels" v-bind:key="index"
                                        :command="model_item.id">{{ model_item.label }}</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>

                <el-input v-model="cur_prompt.prompt" maxlength="4000" placeholder="Please input" show-word-limit
                    type="textarea" :="{ minRows: 2, maxRows: 6 }" v-show="showPrompt" />
                <div style="height:20px; width:100%" />
                <el-empty description="尚无会话历史" v-if="!chatContentList || chatContentList.length <= 0">
                    <h4 style="text-align: left;">试试：</h4>
                    <ul>
                        <li v-for="msg in cur_prompt.suggestions" v-bind:key="msg" style="text-align: left;">
                            <span @click="handleSetTextArea(msg)">{{ msg }}</span>
                        </li>
                    </ul>
                </el-empty>
                <div style="height:20px; width:100%" v-if="!chatContentList || chatContentList.length <= 0"></div>
                <el-timeline v-if="chatContentList && chatContentList.length > 0">
                    <el-timeline-item center :timestamp="timestampToDate(item.gmt_create)" placement="top"
                        v-for="item, index in chatContentList" v-bind:key="item" :id="'tl' + index">
                        <div class="message-buttons">
                            <el-tooltip class="box-item" effect="dark" content="重试" placement="top">
                                <el-button type="info" :icon="Refresh" :disabled="generating"
                                    @click="handleRetryChat(item)" />
                            </el-tooltip>
                            <el-tooltip class="box-item" effect="dark" content="删除" placement="top">
                                <el-button type="info" :icon="Delete" :disabled="generating"
                                    @click="handleDeleteChat(item)" />
                            </el-tooltip>
                            <el-tooltip class="box-item" effect="dark" content="复制" placement="top">
                                <el-button type="info" :icon="DocumentCopy" :disabled="generating"
                                    @click="handleCopyChat(item)" />
                            </el-tooltip>
                        </div>
                        <div v-if="item.item_type === 'intent'">
                            <v-md-editor v-model="item.content_" mode="preview"></v-md-editor>
                        </div>
                        <el-card v-if="item.item_type === 'reply' && item.content">
                            <v-md-editor v-model="item.content" mode="preview"></v-md-editor>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>

                <div class="summary-urls">
                    <span>总结网页地址：</span>
                    <el-input v-model="urlstr" :autosize="{ minRows: 2, maxRows: 6 }" placeholder="网址，每行一个"
                        type="textarea" v-loading="showLoading" />
                </div>

                <div class="chat-button">
                    <div class="buttons">
                        <el-popconfirm title="确认删除?不能恢复的哦。" confirm-button-text="删除" cancel-button-text="再想想"
                            @confirm="handleRemoveHistories">
                            <template #reference>
                                <el-button type="danger" :icon="Delete" circle :disabled="generating" />
                            </template>
                        </el-popconfirm>
                        <el-tooltip class="box-item" effect="dark" content="存档当前会话" placement="top">
                            <el-button type="success" :icon="Finished" circle :disabled="generating"
                                @click="handleSetArchive(true)" />
                        </el-tooltip>
                        <el-tooltip class="box-item" effect="dark" content="查看会话列表" placement="top">
                            <el-button type="info" :icon="Memo" circle :disabled="generating"
                                @click="showDialogTable = true" />
                        </el-tooltip>
                    </div>
                    <div class="buttons-sender">
                        <el-text class="mx-1" type="info">ctrl+Enter</el-text>
                        <el-button type="primary" :icon="Promotion" @click="handleEnter"
                            :disabled="generating">发送</el-button>
                    </div>
                </div>
                <el-input v-model="textareaContent" maxlength="4000" :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="点我开始对话" show-word-limit type="textarea" v-loading="showLoading" />
            </div>
            <el-dialog v-model="showDialogTable" title="历史对话" width="80%">
                <el-table :data="archiveContentList">
                    <el-table-column property="topic" label="话题" />
                    <el-table-column label="日期" width="100" sortable prop="_id">
                        <template #default="props">
                            <DateInfo :pubDate="props.row.ins" />
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="100">
                        <template #default="props">
                            <el-tooltip class="box-item" effect="dark" content="设为当前会话" placement="top">
                                <el-button type="primary" :icon="Checked" circle
                                    @click="handleSetNewArchive(props.row)" />
                            </el-tooltip>
                            <el-popconfirm title="确认删除?不能恢复的哦。" confirm-button-text="删除" cancel-button-text="再想想"
                                @confirm="handleDeleteArchive(props.row)">
                                <template #reference>
                                    <el-button type="danger" :icon="Delete" circle :disabled="generating" />
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
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
import { initMessages, initBaseMessage, initSummaryMessage, initBaseChatLogSection, initMessagesWithoutSys } from '@/utils/chat_transfer'
import { useRoute, useRouter } from 'vue-router';
import { watch, ref, onMounted } from 'vue';
import DateInfo from '@/components/DateInfo.vue';
import { makeTextFileLineIterator, makeSingleChat } from '@/api/sse'
import { getModels } from '@/api/model'
import { Promotion, Delete, CloseBold, Operation, Finished, Memo, ArrowDown, Checked, Refresh, DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { timestampToDate } from '@/utils/date'
import { loadChat, saveChat } from '@/utils/browser_db'
import { getPrompts } from '@/utils/prompts'
import { getModel, getCheepModel, getMainModels } from '@/utils/models'
import { scrollToBottom, copyToClipboard } from '@/utils/page'
export default {
    name: 'BaseChat',
    components: {
        DateInfo
    },

    setup() {
        const route = useRoute();
        const router = useRouter();
        const generating = ref(false)
        const showLoading = ref(false)
        const showPrompt = ref(false)
        const showDialogTable = ref(false)
        // const markdown = ref('')
        const cur_prompt = ref({
            name: '助理',
            suggestions: [],
            prompt: ''
        })
        const model = ref("gpt-3.5-turbo-16k")
        const mainModels = ref([])
        const textareaContent = ref('')
        const chatContentList = ref([])
        const archiveContentList = ref([])
        const groupModels = ref([])
        const urlstr = ref('https://www.17k.com/chapter/3006464/38107770.html')
        const chatKey = ref('')
        const curChat = ref({
            _id: 0,
            userid: 0,
            short_cut_id: 0,
            model_id: 7
        })

        const handleSetTextArea = (txt) => {
            textareaContent.value = txt
        }

        watch(
            // 路由参数发生变化时重新加载数据
            () => route.params.id,
            (newId) => {
                curChat.value.short_cut_id = newId;
                load();
            }
        );

        onMounted(() => {
            document.addEventListener('keydown', handleKeyDown);
        });

        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'Enter') {
                handleEnter();
            }
        };

        const handleModelChange = (id) => {
            router.push(`/chat/base/${route.params.id}/${id}`);
            curChat.value.model_id = id
            model.value = getModel(id)
        }

        const handleShowPrompt = (val) => {
            showPrompt.value = val
        }

        const getChatKey = () => {
            return "u" + curChat.value.userid + "_" + curChat.value.short_cut_id
        }

        const loadArchives = () => {
            const archiveList = loadChat("u_archvie");
            const list = archiveList.filter(archive => archive.key === getChatKey());
            return list;
        };

        const resetEnabledModels = () => {
            mainModels.value = getMainModels(route.params.mid)

            if (route.params.mid == 101 || route.params.mid == 17) {
                mainModels.value = [{
                    "id": "101",
                    "label": "Midjourney"
                }, {
                    "id": "17",
                    "label": "Dalle-3"
                }]

                return
            }

            showLoading.value = true
            getModels({}).then(data => {
                groupModels.value = data.data
                mainModels.value = mainModels.value.filter(model => groupModels.value.some(models => models.id === model.label));

                if (!mainModels.value || mainModels.value == [] || mainModels.value.length < 1) {
                    mainModels.value = getMainModels(null)

                    var mainModels2 = mainModels.value.filter(model => groupModels.value.some(models => models.id === model.label));

                    if (mainModels2 != null && mainModels2.length > 1) {
                        mainModels.value = mainModels2;
                    }
                }

                showLoading.value = false
            });
        }

        const load = () => {
            if (route.params.id) {
                curChat.value.short_cut_id = route.params.id
                var prompt_data = getPrompts(route.params.id)
                cur_prompt.value = prompt_data
            }

            if (route.params.mid) {
                curChat.value.model_id = route.params.mid
            }

            model.value = getModel(route.params.mid)
            // mainModels.value = getMainModels(route.params.mid)

            resetEnabledModels();

            chatKey.value = getChatKey()
            chatContentList.value = loadChat(chatKey.value)

            archiveContentList.value = loadArchives()

            setTimeout(function () {
                scrollToBottom();
            }, 1500)
        }
        load()

        const save = () => {
            saveChat(chatKey.value, chatContentList.value)
        }

        const handleSetNewArchive = (archive) => {
            handleSetArchive(false)
            chatContentList.value = archive.items
            save()

            archiveContentList.value = loadArchives()
            ElMessage({
                type: 'success',
                message: '历史对话已激活!',
            })
        }

        const handleDeleteArchive = (archive) => {
            const archiveList = loadChat("u_archvie");
            archiveContentList.value = loadArchives()
            for (var archiveIndex in archiveList) {
                if (archiveList[archiveIndex]._id == archive._id) {
                    archiveList.splice(archiveIndex, 1);
                    break;
                }
            }

            saveChat("u_archvie", archiveList);
            archiveContentList.value = loadArchives()

            ElMessage({
                type: 'success',
                message: '选定对话已删除!',
            });
        }

        const updateArchive = (id, new_topic) => {
            if (!new_topic || new_topic == '' || new_topic == '。') {
                return;
            }

            new_topic = new_topic.replace('。', '')
            const archiveList = loadChat("u_archvie");
            archiveContentList.value = loadArchives()
            for (var archiveIndex in archiveList) {
                if (archiveList[archiveIndex]._id == id) {
                    archiveList[archiveIndex].topic = new_topic
                    break;
                }
            }

            saveChat("u_archvie", archiveList);
            archiveContentList.value = loadArchives()
        }

        const handleSetArchive = (renew_topic = false) => {
            if (!chatContentList.value || chatContentList.value.length < 1) {
                ElMessage({
                    type: 'error',
                    message: '当前会话为空!',
                })
                return;
            }
            const archvieList = loadChat("u_archvie");
            const cur_chat_id = chatContentList.value[0]._id;
            let hasItem = false;

            for (const archvieIndex in archvieList) {
                if (archvieList[archvieIndex]._id == cur_chat_id) {
                    archvieList[archvieIndex].items = chatContentList.value;
                    hasItem = true;
                    break;
                }
            }

            if (!hasItem) {
                archvieList.unshift({
                    _id: cur_chat_id,
                    ins: chatContentList.value[0].gmt_create,
                    items: chatContentList.value,
                    userid: 0,
                    key: getChatKey(),
                    short_cut_id: curChat.value.short_cut_id,
                    model_id: curChat.value.model_id,
                    topic: '新的聊天'
                });
            }

            if (renew_topic) {
                sendSingleAsync(cur_chat_id, chatContentList.value)
            }

            saveChat("u_archvie", archvieList);
            archiveContentList.value = loadArchives()
            ElMessage({
                type: 'success',
                message: '对话已存档!',
            })

            handleRemoveHistories();
        };

        const handleRemoveHistories = () => {
            chatContentList.value = []
            save()
        }

        var updateMessage = (text, finish_reason) => {
            if (text) {
                chatContentList.value[chatContentList.value.length - 1].content += text;
                // markdown.value += text
            }

            if (finish_reason === "stop") {
                showLoading.value = false;
                generating.value = false;
                scrollToBottom();
            }

            save()
        };

        const handleEnter = async () => {
            const content = textareaContent.value;

            if (!content) {
                ElMessage({
                    type: 'error',
                    message: '请输入内容',
                })
                return;
            }

            if (generating.value) {
                ElMessage({
                    type: 'error',
                    message: '会话中,请稍后再试!',
                })
                return;
            }

            chatContentList.value.push(initBaseChatLogSection("intent", content, curChat.value._id, curChat.value.userid));

            save()

            scrollToBottom();
            showLoading.value = true;
            generating.value = true;

            chatContentList.value.push(initBaseChatLogSection("reply", "", curChat.value._id, curChat.value.userid));

            await sendAsync()
        }

        const sendSingleAsync = async (chat_id, chat_list) => {
            var messages = initMessagesWithoutSys(chat_list, "用三到五个字总结以上发言，如果无法总结请回复'闲聊'")
            var cur_mode = getCheepModel(model.value)
            var params = initBaseMessage(messages, cur_mode, false)
            makeSingleChat(params).then(data => {
                try {
                    updateArchive(chat_id, data.choices[0].message.content)
                } catch (err) {
                    console.log(err)
                }
            })
        }

        const sendAsync = async () => {
            var url = '/v1/custom/web/summary'
            var messages = initMessages(chatContentList.value, cur_prompt.value.prompt)
            var urls = urlstr.value.split('\n')
            var params = initSummaryMessage(messages, urls, model.value, true)

            textareaContent.value = "";

            const lines = makeTextFileLineIterator(url, params);
            for await (let line of lines) {
                if (line == '') {
                    continue;
                }

                try {
                    let text = line;
                    if (text.indexOf("data: ") == 0) {
                        text = text.substring(6);
                    }

                    if (text.indexOf("data:") == 0) {
                        text = text.substring(5);
                    }

                    if (text == "[DONE]") {
                        updateMessage(
                            "",
                            "stop"
                        );
                    }
                    else {
                        const data = JSON.parse(text);
                        updateMessage(
                            data.choices[0].delta.content,
                            data.choices[0].finish_reason
                        );
                    }
                } catch (e) {
                    console.log(e)
                }
            }
        };

        const handleRetryChat = (item) => {
            if (item.item_type === 'intent') {
                textareaContent.value = item.content
                scrollToBottom()
                handleEnter()
                return
            }

            if (item.item_type === 'reply') {
                for (var index in chatContentList.value) {
                    if (chatContentList.value[index]._id == item._id) {
                        item = chatContentList.value[index - 2]
                        break;
                    }
                }

                textareaContent.value = item.content
                scrollToBottom()
                handleEnter()
                return
            }

            ElMessage({
                type: 'error',
                message: '会话中,请稍后再试!',
            })
        };

        const handleDeleteChat = (item) => {
            for (var index in chatContentList.value) {
                if (chatContentList.value[index]._id == item._id) {
                    chatContentList.value.splice(index, 1)
                    save()
                    ElMessage({
                        type: 'success',
                        message: '删除完成',
                    })
                    return;
                }
            }

            ElMessage({
                type: 'error',
                message: '会话中,请稍后再试!',
            })
        };

        const handleCopyChat = (item) => {
            copyToClipboard(item.content)
        };

        return {
            Delete,
            Promotion,
            Operation,
            CloseBold,
            ArrowDown,
            Finished,
            Memo,
            Checked,
            DateInfo,
            Refresh,
            DocumentCopy,
            handleEnter,
            handleShowPrompt,
            handleSetTextArea,
            handleRemoveHistories,
            handleModelChange,
            timestampToDate,
            handleKeyDown,
            handleSetArchive,
            handleSetNewArchive,
            handleDeleteArchive,
            handleRetryChat,
            handleDeleteChat,
            handleCopyChat,
            loadArchives,
            showPrompt,
            showDialogTable,
            chatContentList,
            // markdown,
            cur_prompt,
            model,
            mainModels,
            textareaContent,
            showLoading,
            generating,
            archiveContentList,
            urlstr
        };
    }
}
</script>

<style>
.guide {
    text-align: left;
    font-size: 14px;
    line-height: 26px;
    display: block;
    width: 100%;
    height: 35px;
    position: relative;
}

.guide .el-dropdown {
    line-height: 26px;
}

.guide .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.guide-left {
    float: left;
    text-align: left;
}

.guide .el-button {
    padding: 1px;
    height: 16px;
    margin: 0;
}

.guide-right {
    float: right;
    text-align: right;
}

.message-buttons {
    position: absolute;
    right: 10px;
    top: -5px;
}

.message-buttons button {
    border: 0;
    margin: 0;
    padding: 0;
    height: 14px;
    background: none;
    color: #CCCCCC;
}

.el-empty li span {
    cursor: pointer;
}

.el-textarea__inner {
    height: 90px;
    min-height: 60px !important;
}

.chat-button {
    height: 30px;
    width: 100%;
    position: relative;
    z-index: 29;
}

.chat-button .buttons {
    position: absolute;
    left: 0px;
    bottom: 4px;
}

.chat-button .buttons-sender {
    position: absolute;
    right: 0px;
    bottom: 0px;
}

.buttons-sender .mx-1 {
    display: none;
}

@media screen and (min-width: 480px) {
    .buttons-sender .mx-1 {
        display: inline-block;
        padding-right: 5px;
    }
}

.chat-button .buttons-sender button {
    border-radius: 5px 5px 0 0;
}


#app .github-markdown-body {
    padding: 12px 22px 0px;
}

#app .el-timeline {
    padding-left: 10px;
}

.summary-urls {
    margin-bottom: 20px;
}
</style>