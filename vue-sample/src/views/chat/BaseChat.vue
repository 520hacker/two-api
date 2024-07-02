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
                            <el-tooltip class="box-item" effect="dark" content="朗读" placement="top">
                                <el-button type="info" :icon="Microphone" :disabled="generating"
                                    @click="handleSpeakOut(item)" />
                            </el-tooltip>
                        </div>
                        <div v-if="item.item_type === 'intent'">
                            <v-md-editor v-model="item.content_" mode="preview"></v-md-editor>
                        </div>
                        <el-card v-if="item.item_type === 'reply' && item.content">
                            <v-md-editor v-model="item.content" mode="preview"
                                @image-click="handlePreviewImageClick"></v-md-editor>
                            <div class="el-main-image" v-if="model == 'mj-chat' && !generating">
                                <el-image v-for="item, index in uniqueStrings(extractImageUrls(item.content))"
                                    :key="item" :src="'https://static2oss.qiangtu.com/o?plus=w_500&url=' + item" lazy
                                    :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :initial-index="index" fit="cover">
                                    <template #error>
                                        <span></span>
                                    </template>
                                </el-image>
                            </div>
                            <div v-if="item.content != null && item.content != '' && IsVideo(item.content)">
                                <video controls style="width: 99%;">
                                    <source :src="GetVideo(item.content)" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
                <div class="uploader" v-show="showImageUploader">
                    <el-upload v-model:file-list="fileList" class="upload-demo"
                        action="https://twoapi.qiangtu.com/v1/custom/file/upload" :headers="uploadHeader"
                        :limit="upLimit" list-type="picture">
                        <el-button type="primary">点击上传</el-button>

                        <template #tip>
                            <div class="el-upload__tip">
                                如果文件过大，可能会导致上传失败且仍然扣除积分。
                            </div>
                        </template>
                    </el-upload>
                </div>
                <div class="uploader" v-show="showDocUploader">
                    <el-upload v-model:file-list="fileList" class="upload-demo"
                        action="https://twoapi.qiangtu.com/v1/custom/file/upload" :headers="uploadHeader"
                        :limit="upLimit">
                        <el-button type="primary">点击上传</el-button>

                        <template #tip>
                            <div class="el-upload__tip">
                                如果文件过大，可能会导致上传失败且仍然扣除积分。
                            </div>
                        </template>
                    </el-upload>
                </div>
                <el-alert v-if="chatContentList.length > 5" title="试试下方的绿色按钮和灰色按钮? 用好它们,你能方便的在你的多个会话中切换哦!" type="warning" />
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
                        <el-button type="success" :icon="Microphone" @click="showAudioRecorder = true"
                            :disabled="generating" />
                        <el-button type="primary" :icon="Promotion" @click="handleEnter"
                            :disabled="generating">发送</el-button>
                    </div>
                </div>
                <el-input v-model="textareaContent" maxlength="4000" :autosize="{ minRows: 2, maxRows: 6 }"
                    placeholder="点我开始对话" show-word-limit type="textarea" v-loading="showLoading" />
            </div>
            <div class="audio-recorder-frame" v-show="showAudioRecorder">
                <div class="audio-recorder-close">
                    <el-button :icon="CloseBold" @click="showAudioRecorder = false" />
                </div>
                <div class="audio-recorder-main">
                    <div class="audio-recorder-app">
                        <textarea class="audio-logs" id="audioLogs" ref="textarea" v-model="audioLogs"></textarea>
                        <div class="audio-main-controls">
                            <div class="audio-main-button">
                                <el-button :icon="Microphone" @click="startAudioRecording" :disabled="generating"
                                    v-show="!audioRecording" />
                                <el-button :icon="Mute" @click="stopAudioRecording" v-show="audioRecording" />
                            </div>
                            <div class="audio-timer" style="clear: both;" v-if="audioRecording">{{ audioElapsedTime }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="vhidden">
                <el-image id="previewImage" :src="preivewImageUrl" :zoom-rate="1.2" :max-scale="7"
                    :preview-src-list="preivewImageList" lazy />
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
import {
    initMessages, initBaseMessage, initBaseChatLogSection, initMessagesWithoutSys,
    getRequestContent, getDefaultVersionParam
} from '@/utils/chat_transfer'
import { useRoute, useRouter } from 'vue-router';
import { watch, ref, onMounted, nextTick } from 'vue';
import DateInfo from '@/components/DateInfo.vue';
import { getModels } from '@/api/model'
import { makeTextFileLineIterator, makeTextToSpeech, makeSingleChat, makeSpeechToText } from '@/api/sse'
import { Promotion, Delete, CloseBold, Operation, Mute, Finished, Memo, ArrowDown, Checked, Refresh, Microphone, DocumentCopy } from '@element-plus/icons-vue'
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
        // const showPreivewImage = ref(false)
        const preivewImageUrl = ref('https://memosfile.qiangtu.com/memos2504/assets/2023/09/17/1694919163_done.png')
        const preivewImageList = ref([])

        const audioLogs = ref('点击麦克风，即刻开始语音对话')
        const stream = ref(false)
        const audioDevice = ref(null);
        const audioRecorder = ref(null);
        const items = ref([]);
        const audioUrl = ref(null);
        const audioFileName = ref(null);
        const audioRecording = ref(false);
        const audioElapsedTime = ref("00:00");
        const audioTimerInterval = ref(null);
        const showAudioRecorder = ref(false)
        const upLimit = ref(1)

        const showImageUploader = ref(false)
        const showDocUploader = ref(false)
        const fileList = ref([])
        const route = useRoute();
        const router = useRouter();
        const generating = ref(false)
        const showLoading = ref(false)
        const showPrompt = ref(false)
        const showDialogTable = ref(false)
        const skey = ref('')
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
        const chatKey = ref('')
        const curChat = ref({
            _id: 0,
            userid: 0,
            short_cut_id: 0,
            model_id: 7
        })
        const uploadHeader = ref({
            'Authorization': `Bearer ${localStorage.getItem('CSK')}`
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
            },
            () => route.params.mid,
            (newmId) => {
                curChat.value.model_id = newmId;
                load();
            },
            () => route.params.skey,
            (new_skey) => {
                skey.value = new_skey;
                load();
            }
        );
        const newAudioLog = (msg) => {
            audioLogs.value += '\n ' + msg
            nextTick(() => {
                try {
                    var audioLogsBox = document.getElementById("audioLogs");
                    audioLogsBox.scrollTop = audioLogsBox.scrollHeight;
                } catch (err) {
                    console.log(err)
                }
            });
        }

        const addPrefixToItems = (arr, prefix) => {
            return arr.map(item => prefix + item);
        }

        const extractImageUrls = (markdown) => {
            // 正则表达式匹配Markdown中的图片语法
            const regex = /!\[.*?\]\((.*?)\)/g;

            // 用于存储提取出的图片URL
            const imageUrls = [];

            // 使用正则表达式查找所有匹配项
            let match;
            while ((match = regex.exec(markdown)) !== null) {
                // 将匹配到的URL添加到数组中
                imageUrls.push(match[1]);
            }

            return imageUrls;
        }
        const startAudioRecording = () => {
            newAudioLog("您开始了一段新的语音")
            audioDevice.value = navigator.mediaDevices.getUserMedia({ audio: true });
            audioDevice.value.then((stream) => {
                audioRecorder.value = new MediaRecorder(stream);
                audioRecorder.value.ondataavailable = (e) => {
                    items.value.push(e.data);
                };
                audioRecorder.value.start(100);
                audioRecorder.value.onstart = () => {
                    audioRecording.value = true;
                    let startTime = Date.now();

                    audioTimerInterval.value = setInterval(() => {
                        let elapsedMilliseconds = Date.now() - startTime;
                        let elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
                        let minutes = Math.floor(elapsedSeconds / 60).toString().padStart(2, "0");
                        let seconds = (elapsedSeconds % 60).toString().padStart(2, "0");
                        audioElapsedTime.value = `${minutes}:${seconds}`;
                    }, 1000);
                };
            });
        };

        const stopAudioRecording = () => {
            newAudioLog("您终止了语音录制；正在发送您的语音消息；请稍等...")
            if (audioRecorder.value && audioRecorder.value.state === "recording") {
                audioRecorder.value.stop();
                audioRecorder.value.onstop = () => {
                    var blob = new Blob(items.value, { type: "audio/wav" });
                    prepareGetText(blob);
                    // Clear the items array for the next recording
                    items.value = [];
                    audioRecording.value = false;
                    clearInterval(audioTimerInterval.value);

                    // Stop the audio stream
                    if (stream.value) {
                        stream.value.getTracks().forEach((track) => track.stop());
                        stream.value = null;
                    }
                };
            } else {
                console.warn("audioRecorder is not currently recording or is inactive.");
            }
        };

        const prepareGetText = (blob) => {
            audioUrl.value = URL.createObjectURL(blob);
            audioFileName.value = `recorded_audio_${Date.now()}.wav`;

            // Save the file to the server
            saveAudioFile(blob);
        };

        const saveAudioFile = async (blob) => {
            const formData = new FormData();
            formData.append("file", blob, audioFileName.value);
            formData.append("response_format", "json")
            formData.append("language", "zh")
            formData.append("filename", audioFileName.value)
            formData.append("model", "whisper-1")

            generating.value = true
            showLoading.value = true

            try {
                makeSpeechToText(formData).then(data => {
                    newAudioLog("您说：" + data.text)
                    textareaContent.value = data.text
                    showAudioRecorder.value = false
                    generating.value = false
                    showLoading.value = false
                    handleEnter()
                })
            } catch (error) {
                console.error('Error saving audio file', error);
            }
        };

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

            for (const item in list) {
                if (list[item].item_type === "intent") {
                    list[item].content_ = getRequestContent(list[item].content);
                }
            }

            return list;
        };

        const load = () => {
            if (route.params.id) {
                curChat.value.short_cut_id = route.params.id
                var prompt_data = getPrompts(route.params.id)
                cur_prompt.value = prompt_data
            }

            if (route.params.mid) {
                curChat.value.model_id = route.params.mid
            }

            if (route.params.skey) {
                skey.value = route.params.skey
            }

            model.value = getModel(route.params.mid)
            if (model.value == 'gpt-4-v' ||
                model.value == 'domo-img-to-video' ||
                model.value == 'gpt-4-vision-preview' ||
                model.value.indexOf('vision') > 0 ||
                model.value.indexOf('claude-3') > -1) {
                showImageUploader.value = true;
            } else {
                showImageUploader.value = false;
            }

            if (model.value == 'gpt-4-all' || model.value == "gpt-4o" || model.value == "gpt-4o-all" || model.value == "luma-video") {
                showDocUploader.value = true;
                if (model.value == "luma-video") {
                    upLimit.value = 2
                }
            } else {
                showDocUploader.value = false;
            }

            resetEnabledModels();


            chatKey.value = getChatKey()
            chatContentList.value = loadChat(chatKey.value)

            archiveContentList.value = loadArchives()

            setTimeout(function () {
                scrollToBottom();
            }, 1500)
        }

        const uniqueStrings = (arr) => {
            var unique = {};
            arr.forEach(function (i) {
                if (i.indexOf('filesystem.site/cdn/download') < 0) {
                    unique[i] = true;
                }
            });
            return Object.keys(unique);
        }

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

            if (!groupModels.value || groupModels.value.length < 1) {
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

        const handleSpeakOut = (item) => {
            var params = {
                "model": "tts-1-hd",
                "input": item.content,
                "voice": "alloy",
                "speed": 1.2
            }
            showLoading.value = true
            generating.value = true
            makeTextToSpeech(params).then(data => {
                console.log(data);
                const audio = new Audio(data.item);
                try {
                    audio.addEventListener('ended', () => {
                        showLoading.value = false
                        generating.value = false
                        console.log(data.item);
                        console.log('音频播放完成');
                        audio.removeEventListener('ended', () => { });
                    });
                    audio.play();
                } catch (e) {
                    showLoading.value = false
                    generating.value = false
                }
                console.log('音频播放开始');
            })
        };

        const updateMessage = (text, finish_reason) => {
            if (text) {
                chatContentList.value[chatContentList.value.length - 1].content += text;
            }

            if (finish_reason === "stop") {
                showLoading.value = false;
                generating.value = false;
                scrollToBottom();
            }

            save()
        };

        const handleEnter = async () => {
            var content = textareaContent.value;

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

            try {
                var uploadFile = '';
                if (fileList.value && fileList.value.length > 0) {
                    if (fileList.value.length > 1 && model.value == "luma-video") {
                        uploadFile = fileList.value[0].response.item + " " + fileList.value[1].response.item
                    }
                    else {
                        uploadFile = fileList.value[0].response.item
                    }
                }

                if ((
                    model.value == 'domo-img-to-video' ||
                    model.value == 'gpt-4-v' ||
                    model.value == 'gpt-4-all' ||
                    // model.value == "luma-video" ||
                    model.value.indexOf('vision') > 0) &&
                    (!uploadFile || uploadFile == '') &&
                    content.indexOf("http") != 0
                ) {
                    ElMessage({
                        type: 'error',
                        message: '请上传文件',
                    })
                    return;
                }

                if (
                    uploadFile != '' && (
                        model.value == 'domo-img-to-video' ||
                        model.value == 'gpt-4-v' ||
                        model.value == 'gpt-4-all' ||
                        model.value == "gpt-4o" ||
                        model.value == "gpt-4o-all" ||
                        model.value == "luma-video" ||
                        model.value.indexOf('vision') > 0 ||
                        model.value.indexOf('claude-3') > -1)) {
                    content = uploadFile + " " + content
                }

                if (model.value == 'gpt-4-vision-preview') {
                    content = getDefaultVersionParam(content, uploadFile)
                }
            }
            catch (err) {
                console.log(err)
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
            var messages = initMessagesWithoutSys(chat_list, "为对话取一个标题")

            for (var index in messages) {
                if (typeof messages[index].content !== 'string') {
                    messages[index].content = JSON.stringify(messages[index].content)
                }
            }

            var cur_mode = getCheepModel(model.value)
            var params = initBaseMessage(messages, cur_mode, false)
            makeSingleChat(params).then(data => {
                try {
                    updateArchive(chat_id, data.choices[0].message.content)
                } catch (err) {
                    console.log(err)
                    console.log(data)
                }
            })
        }

        const getModelBySkey = () => {
            var smodel = model.value
            if (route.params.mid == '77' && skey.value && skey.value != '') {
                smodel = model.value + "-" + skey.value
            }

            return smodel
        }

        const sendAsync = async () => {
            var url = '/v1/chat/completions'

            var messages = initMessages(chatContentList.value, cur_prompt.value.prompt)
            var model = getModelBySkey()
            var params = initBaseMessage(messages, model, true)

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
                }
                catch (e) {
                    // ElMessage({
                    //     type: 'error',
                    //     message: '消息解析失败',
                    // })
                    console.log('消息解析失败:' + line);
                    console.log('错误:' + e)

                    showLoading.value = false;
                    generating.value = false;
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

        const handleCopyCodeSuccess = (item) => {
            copyToClipboard(item.content)
        }

        const setShowLoading = (val) => {
            generating.value = val
            showLoading.value = val
        }

        const handlePreviewImageClick = (val) => {
            val = val.filter(function (item) {
                return item != 'https://memosfile.qiangtu.com/memos2504/assets/2023/09/17/1694919163_done.png'
            })
            preivewImageUrl.value = val[0]
            preivewImageList.value = val

            setTimeout(function () {
                var previewImage = document.getElementById("previewImage");
                previewImage.dispatchEvent(new Event("click"));
            }, 200)
        }

        // Function to check if the markdown string contains a video link that starts with 'http' and ends with '.mp4'
        const IsVideo = (markdownStr) => {
            return /http(s)?:\/\/[^"\s]*\.mp4/.test(markdownStr);
        }

        // Function to extract the video link that starts with 'http' and ends with '.mp4' from the markdown string
        const GetVideo = (markdownStr) => {
            const matches = markdownStr.match(/https?:\/\/[^"\s]*\.mp4/g);
            let src = matches ? matches[matches.length - 1] : ''; // Returns the last match or null if no match is found
            return "https://static2oss.qiangtu.com/o?plus=w_500&url=" + src;
        }

        return {
            IsVideo,
            GetVideo,
            audioDevice,
            audioRecorder,
            audioUrl,
            audioFileName,
            audioRecording,
            audioElapsedTime,
            audioTimerInterval,
            audioLogs,
            upLimit,
            startAudioRecording,
            stopAudioRecording,
            uniqueStrings,

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
            Microphone,
            Mute,
            addPrefixToItems,
            extractImageUrls,
            handlePreviewImageClick,
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
            handleCopyCodeSuccess,
            handleSpeakOut,
            loadArchives,
            getRequestContent,
            setShowLoading,

            uploadHeader,
            preivewImageList,
            preivewImageUrl,
            // showPreivewImage,
            showAudioRecorder,
            showPrompt,
            showDialogTable,
            showImageUploader,
            showDocUploader,
            chatContentList,
            fileList,
            cur_prompt,
            model,
            mainModels,
            textareaContent,
            showLoading,
            generating,
            archiveContentList
        };
    }
}
</script>

<style>
#previewImage {
    opacity: 0;
    z-index: -1;
    width: 1px;
    height: 1px;
}

.uploader {
    padding-bottom: 10px;
}

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

.el-button+.el-button {
    margin-left: 3px;
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

.audio-recorder-frame {
    display: block;
    width: 100%;
    position: fixed;
    top: 0px;
    background: #f2f2f2;
    z-index: 998;
    left: 0px;
    height: 100%;
    padding-top: 30px;
}

.audio-recorder-close {
    position: absolute;
    right: 20px;
    top: 20px
}

.v-md-editor--preview {
    background: none;
}

.audio-logs {
    margin-top: 40px;
    color: #666;
    padding: 5%;
    line-height: 20px;
    font-size: 12px;
    height: 300px;
    width: 90%;
    margin-left: 5%;
    margin-bottom: 30px;
    border: 1px dotted #333;
    background-color: #fff;
}

.audio audio {
    outline: none;
}

.audio-timer {
    display: block;
    clear: both;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.audio-main-controls {
    display: block;
    text-align: center;
    margin-bottom: 20px;
}

.record-btn,
.stop-btn {
    background-color: #007bff;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.record-btn:hover,
.stop-btn:hover {
    background-color: #0056b3;
}

.download-link {
    text-align: center;
}

.audio-main-button {
    text-align: center;
    height: 170px;
    width: 100%;
    display: block;
}

.audio-main-button button {
    width: 150px;
    height: 150px;
    font-size: 75px;
    border-radius: 50%;
    box-shadow: 3px 3px 3px #ccc;
}

.el-timeline-item {
    padding: 0px;
}

.github-markdown-body p {
    margin-bottom: 5px;
}

.el-timeline .el-timeline-item__center .el-timeline-item__wrapper {
    margin-bottom: 20px;
}
</style>