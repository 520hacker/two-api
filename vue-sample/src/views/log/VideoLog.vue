<style>
.time {
    font-size: 12px;
    color: #999;
}

.el-card {
    word-break: break-all;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}

.el-image {
    display: block;
}

.el-thumbnail .el-image {
    display: inline-block;
    padding-top: 5px;
}

.image-slot span.expired {
    display: block;
    width: 100%;
    padding: 30px 0;
    text-align: center;
    color: rgba(150, 150, 150, 0.6);
    background-color: rgba(150, 150, 150, 0.2);
}

.draw-logs {
    margin-bottom: 60px;
}

.draw-pages {
    clear: both;
    width: 96%;
    margin-left: 2%;
    margin-top: 30px;
    margin-bottom: 20px;
}

span.ip {
    color: #ccc;
    font-size: 10px;
}

.el-col.el-col-8 {
    flex: 0 0 94%;
    max-width: 94%;
    margin-left: 3%;
    margin-bottom: 10px;
}

.el-col-offset-2 {
    margin-left: 3%;
    margin-right: 3%;
}

span.el-pagination__jump {
    display: none;
}

@media screen and (min-width: 480px) {
    .el-col.el-col-8 {
        flex: 0 0 29%;
        margin: 0 2% 20px 2%;
    }

    .el-col-offset-2 {
        margin-left: 8.3333333333%;
        margin-right: 0;
    }

    span.el-pagination__jump {
        display: flex;
    }
}

.el-thumbnail img {
    margin-left: 5px;
    margin-right: 0px;
    border-radius: 3px;
    width: auto;
    max-width: 50px;
}
</style>

<template>
    <div class="draw-logs">
        <div class="draw-pages">
            <el-row>
                模型：
                <el-radio-group v-model="model" @change="load">
                    <el-radio v-for="item in models" :key="item" :label="item" :value="item">{{ item }}</el-radio>
                </el-radio-group>
            </el-row>
            <el-divider border-style="dotted" style="margin: 10px 0 4px 0;" />
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :small="false"
                :disabled="false" :hide-on-single-page="true" layout="sizes, prev,  jumper, next,  ->, total"
                :total="totalCount" @size-change="load" @current-change="load" />
        </div>
        <el-row>
            <el-col v-for="(o, index) in list" :key="o" :span="8" :offset="index > 0 ? 2 : 0"
                v-show="o.images.length > 0">
                <el-card :body-style="{ padding: '0px' }">
                    <div class="el-main-image">
                        <el-image key="0"
                            :src="'https://static2oss.qiangtu.com/o?plus=w_500&url=' + filterLast(o.images)" lazy
                            :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                            :preview-src-list="addPrefix(filterLinks(o.images, 'png'), 'https://static2oss.qiangtu.com/o?plus=w_5000&url=')"
                            :initial-index="o.images.length - 1" fit="cover">
                            <template #error>
                                <div class="image-slot">
                                    <span class="expired">
                                        图片不在家
                                    </span>
                                </div>
                            </template></el-image>
                    </div>
                    <div class="el-thumbnail" v-if="o.images.length > 0">
                        <div class="video-list">
                            <ul>
                                <li v-for="(video, index) in uniqueStrings(filterLinks(o.images, 'mp4'))" :key="index"
                                    @click="playVideo(video)">
                                    <a target="_blank" style="cursor: pointer;">
                                        视频 [mp4播放 {{ index + 1 }}]
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="video-list">
                            <ul>
                                <li v-for="(video, index) in uniqueStrings(filterLinks(o.images, 'mp3'))" :key="index">
                                    <a :href="'https://static2oss.qiangtu.com/o?plus=w_5000&url=' + video"
                                        target="_blank">
                                        音乐 [mp3下载 {{ index + 1 }}]
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div style="padding: 14px">
                        <span>{{ o.content }}</span>
                        <div class="bottom">
                            <time class="time">{{ timestampToDate(o.createAt) }}</time>
                            <span class="ip">{{ o.ip }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <div class="draw-pages">
                <el-divider border-style="dotted" style="margin: 10px 0 4px 0;" />
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :small="false"
                    :disabled="false" :hide-on-single-page="true" layout="sizes, prev,  jumper, next,  ->, total"
                    :total="totalCount" @size-change="load" @current-change="load" />
            </div>
        </el-row>
        <el-dialog v-model="showVideoBox" title="Video Player" width="80%">
            <vue3-video-player @play="videoPlay" :src="videoSrc"
                style="border: 1px solid #ccc; max-width: 80%; max-height:  90%;"></vue3-video-player>
        </el-dialog>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { timestampToDate } from '@/utils/date'
import { getDrawLog } from '../../api/logs'
import { watch, ref } from 'vue';
export default {
    name: 'VideoLog',
    setup() {
        const route = useRoute();
        const list = ref([])
        const loading = ref(true)
        const currentPage = ref(1)
        const pageSize = ref(21)
        const totalCount = ref(0)
        const model = ref('mj')
        const models = ref(["pika-text-to-video", "luma-video", "domo-img-to-video", "suno-v3", "suno-v3.5"])

        watch(
            // 路由参数发生变化时重新加载数据
            () => route.params.id,
            (newId) => {
                model.value = newId;
                load();
            },
        );

        if (route.params.id && route.params.id.length > 0) {
            model.value = route.params.id
        }

        const addPrefix = (arr, prefix) => {
            return arr.map(item => prefix + item);
        }


        const filterLast = (links) => {
            console.log(links)
            return filterLinks(links, 'png')[filterLinks(links, 'png').length - 1]
        }

        const filterLinks = (links, extension) => {
            if (extension === "png") {
                const imageExtensions = ["png", "gif", "jpg", "jpeg", "webp"];
                const filteredLinks = links.filter(link => {
                    const linkExtension = link.split('.').pop();
                    return imageExtensions.includes(linkExtension);
                });
                return filteredLinks;
            } else {
                const filteredLinks = links.filter(link => link.endsWith("." + extension));
                return filteredLinks;
            }
        }


        const uniqueStrings = (arr) => {
            var unique = {};
            arr.forEach(function (i) {
                // console.log(i)
                if (i.indexOf('filesystem.site/cdn/download') < 0) {
                    // console.log('v')
                    unique[i] = true;
                }
            });
            return Object.keys(unique);
        }

        const load = () => {

            loading.value = true
            getDrawLog({
                model: model.value,
                limit: pageSize.value,
                offset: (currentPage.value - 1) * pageSize.value,
            }).then(data => {
                list.value = data.items
                formatDesc()
                loading.value = false
                totalCount.value = data.total
            });
        }

        const formatDesc = () => {
            for (var index in list.value) {
                list.value[index].content = list.value[index].prompt
                try {
                    var json = JSON.parse(list.value[index].content)
                    list.value[index].content = json[json.length - 1].content
                } catch (err) {
                    console.log(err)
                }
            }
        }
        load()

        const showVideoBox = ref(false);
        const videoSrc = ref('');
        const videoPlay = () => {

        }

        const playVideo = (video) => {
            showVideoBox.value = true;
            videoSrc.value = 'https://static2oss.qiangtu.com/o?plus=w_5000&url=' + video;
        };



        return {
            videoSrc,
            filterLast,
            showVideoBox,
            videoPlay,

            // videoPlayer,
            // videoList,
            // videoOptions,
            playVideo,
            // playPause,
            loading,
            totalCount,
            currentPage,
            pageSize,
            model,
            models,
            filterLinks,
            load,
            addPrefix,
            uniqueStrings,
            timestampToDate,
            list
        }
    }
}
</script>