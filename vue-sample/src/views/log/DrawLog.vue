<style>
.time {
    font-size: 12px;
    color: #999;
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

.el-col-8 {
    flex: 0 0 29%;
    margin: 0 2% 20px 2%;
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
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :small="false" :disabled="false"
                :hide-on-single-page="true" layout="sizes, prev,  jumper, next,  ->, total" :total="totalCount"
                @size-change="load" @current-change="load" />
        </div>
        <el-row>
            <el-col v-for="(o, index) in list" :key="o" :span="8" :offset="index > 0 ? 2 : 0" v-show="o.images.length > 0">
                <el-card :body-style="{ padding: '0px' }">
                    <el-image :key="o.images[o.images.length-1]" :src="o.images[o.images.length-1]" lazy :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
                        :preview-src-list="o.images" :initial-index="4" fit="cover" />
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
import { watch, ref } from 'vue';
export default {
    name: 'DrawLog',
    setup() {
        const route = useRoute();
        const list = ref([])
        const loading = ref(true)
        const currentPage = ref(1)
        const pageSize = ref(21)
        const totalCount = ref(0)
        const model = ref('mj')
        const models = ref(['mj', 'gpt-4-dalle'])

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
        return {
            loading,
            totalCount,
            currentPage,
            pageSize,
            model,
            models,
            load,
            timestampToDate,
            list
        }
    }
}
</script>