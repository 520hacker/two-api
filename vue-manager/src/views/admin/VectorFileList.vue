<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">知识库
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>您可以在此创建和管理您的企业、个人知识库</p>
                </div>
                <div class="example">
                    <el-table :data="tableData" style="width: 100%" v-loading="loading">
                        <el-table-column type="expand">
                            <template #default="props">
                                <div m="4">
                                    <p m="t-0 b-2">Id: {{ props.row.id }}</p>
                                </div>
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
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>
  

<script>
import { useRouter } from 'vue-router';
import { getVectorFiles } from '@/api/vector'
import { ref } from 'vue';
export default {
    name: 'VectorFileList',
    setup() {
        const loading = ref(true)
        const currentPage2 = ref(1)
        const pageSize2 = ref(50)
        const totalCount = ref(0)
        const background = ref(true)
        const tableData = ref([]);
        const router = useRouter();
        const onLoad = () => {
            loadList();
        };
        onLoad();

        const loadList = () => {
            loading.value = true

            getVectorFiles({
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

        return {
            loading,
            currentPage2,
            pageSize2,
            totalCount,
            background,
            tableData
        };
    }
}
</script>@/api/vector