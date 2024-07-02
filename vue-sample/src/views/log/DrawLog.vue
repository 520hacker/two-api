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
    max-height: 50px;
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
                        <el-image :key="o.images[o.images.length - 1]"
                            :src="'https://static2oss.qiangtu.com/o?plus=w_500&url=' + encodeURIComponent(o.images[o.images.length - 1])"
                            lazy :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                            :preview-src-list="addPrefixToItems(o.images, 'https://static2oss.qiangtu.com/o?plus=w_5000&url=')"
                            :initial-index="o.images.length - 1" fit="cover" @load="onImageLoad(this, index)"
                            :ref="`image${index}`">
                            <template #error>
                                <div class="image-slot">
                                    <span class="expired">
                                        CDN 转存失败,原图:
                                        <el-image :src="o.images[o.images.length - 1]" alt="图片不在家"
                                            style="max-width: 100%;" :preview-src-list="o.images" />
                                    </span>
                                </div>
                            </template>
                        </el-image>
                    </div>
                    <div class="el-thumbnail" v-if="model == 'mj' && previewLoaded[index] == true">
                        <el-image v-for="item, index2 in splitedImages[index]" :key="item" :src="item" lazy
                            :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="splitedImages[index]"
                            :initial-index="index2" fit="cover">
                            <template #error>
                                <span></span>
                            </template>
                        </el-image>
                    </div>
                    <div class="el-thumbnail" v-if="uniqueStrings(o.images).length > 1">
                        <el-image v-for="item, index in uniqueStrings(o.images)" :key="item"
                            :src="'https://static2oss.qiangtu.com/o?plus=w_50&url=' + item" lazy :zoom-rate="1.2"
                            :max-scale="7" :min-scale="0.2"
                            :preview-src-list="addPrefixToItems(o.images, 'https://static2oss.qiangtu.com/o?plus=w_5000&url=')"
                            :initial-index="index" fit="cover">
                            <template #error>
                                <span></span>
                            </template>
                        </el-image>
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
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { timestampToDate } from '@/utils/date'
import { getDrawLog } from '../../api/logs'
import { watch, ref, onMounted } from 'vue';
export default {
    name: 'DrawLog',
    setup() {
        const route = useRoute();
        const list = ref([])
        const previewLoaded = ref([])
        const splitedImages = ref([])
        const elImage = ref([])
        // const elImage1 = ref(null)
        const loading = ref(true)
        const currentPage = ref(1)
        const pageSize = ref(21)
        const totalCount = ref(0)
        const model = ref('mj')
        const models = ref(['mj', 'gpt-4-dalle', 'gpt-4-v', 'gpt-4-all', 'gpt-4o', 'gpt-4-gizmo-g'])

        watch(
            // 路由参数发生变化时重新加载数据
            () => route.params.id,
            (newId) => {
                model.value = newId;
                load();
            },
        );

        onMounted(() => {
            // console.log(elImage1.value)
        })

        if (route.params.id && route.params.id.length > 0) {
            model.value = route.params.id
        }

        const addPrefixToItems = (arr, prefix) => {
            return arr.map(item => prefix + item);
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

        const onImageLoad = (e, index) => {
            const imageComponent = e.$refs[`image${index}`][0].$el.querySelector('img');
            elImage.value[index] = imageComponent
            previewLoaded.value[index] = true
            splitImage(index)
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

        const splitImage = (index) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = elImage.value[index].src.replace('w_500', 'w_5000');
            img.onerror = function (err) {
                console.log('图片加载失败' + index);
                console.log(err);
            };
            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const partWidth = img.width / 2;
                const partHeight = img.height / 2;
                canvas.width = partWidth;
                canvas.height = partHeight;

                const positions = [
                    [0, 0],
                    [partWidth, 0],
                    [0, partHeight],
                    [partWidth, partHeight]
                ];

                splitedImages.value[index] = []
                positions.forEach((pos, index3) => {
                    ctx.clearRect(0, 0, partWidth, partHeight)
                    ctx.drawImage(img, pos[0], pos[1], partWidth, partHeight, 0, 0, partWidth, partHeight)

                    try {
                        canvas.toBlob(blob => {
                            let newUrl = URL.createObjectURL(blob)
                            console.log(newUrl)
                            splitedImages.value[index][index3] = newUrl
                        });
                    } catch (e) {
                        console.log(e)
                    }
                });
            }
        };

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
        return {
            splitImage,
            splitedImages,
            onImageLoad,
            previewLoaded,
            elImage,
            // elImage1,
            loading,
            totalCount,
            currentPage,
            pageSize,
            model,
            models,
            load,
            addPrefixToItems,
            uniqueStrings,
            timestampToDate,
            list
        }
    }
}
</script>