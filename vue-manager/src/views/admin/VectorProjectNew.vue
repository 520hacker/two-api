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
                    <el-form :model="form" label-width="120px">
                        <el-form-item label="名称">
                            <el-input v-model="form.name" placeholder="请输入您的知识库项目标题" />
                        </el-form-item>
                        <el-form-item label="类型">
                            <el-select v-model="form.type" class="m-2" placeholder="Select" size="large">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="知识库封面图">
                            <el-upload class="avatar-uploader" v-model:file-list="form.fileList"
                                action="https://twoapi.qiangtu.com/v1/custom/file/upload" :headers="uploadHeader" :limit="1"
                                :show-file-list="false" :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">
                                    <Plus />
                                </el-icon>
                            </el-upload>
                            <el-input v-model="form.avatar" />
                        </el-form-item>
                        <el-form-item label="知识库标签">
                            <el-input v-model="form.tags" readonly="true" />
                        </el-form-item>
                        <el-form-item label="知识库说明">
                            <el-input v-model="form.description" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSubmit">添加令牌</el-button>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <router-link to="/vector/projects" class="link">
                                <p class="link-text">返回列表</p>
                            </router-link>
                        </el-form-item>
                    </el-form>

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
import { h, ref, reactive } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus'
import { CheckLogin } from '@/api/user'
import { addVectorProject } from '@/api/vector'
import { getErrorMessage } from '@/utils/enums'
import { Plus } from '@element-plus/icons-vue'

export default {
    name: 'VectorProjectNew',
    setup() {
        const router = useRouter();
        const form = reactive({
            name: '',
            type: '',
            avatar: '',
            tags: [],
            fileList: [],
            description: ''
        })
        const options = ref([{
            "lable": "默认",
            "value": "default"
        }])
        const imageUrl = ref('')

        const handleAvatarSuccess = (
            //   uploadFile
        ) => {
            try {
                imageUrl.value = form.fileList.value[0]
            } catch (err) {
                console.log(err)
            }
            //   imageUrl.value = URL.createObjectURL(uploadFile.raw!)
        }

        const beforeAvatarUpload = (rawFile) => {
            if (rawFile.type !== 'image/jpeg') {
                ElMessage.error('Avatar picture must be JPG format!')
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error('Avatar picture size can not exceed 2MB!')
                return false
            }
            return true
        }
        const uploadHeader = ref({
            'Authorization': `Bearer ${localStorage.getItem('CSK')}`
        })

        const onLoad = () => {
            CheckLogin()
        };
        onLoad();

        const onSubmit = () => {
            addVectorProject({
                name: form.name,
            }).then(data => {
                if (data.success) {
                    ElMessageBox({
                        title: '成功',
                        message: h('p', null, [
                            h('span', null, '新的令牌添加成功'),
                        ]),
                        callback: () => {
                            router.push('/tokens');
                        }
                    })
                } else {
                    if (data.errorCode == 401) {
                        router.push('/login');
                        return;
                    }

                    var errorMessage = getErrorMessage(data.errorMessage)
                    ElMessageBox({
                        title: '未成功',
                        message: h('p', null, [
                            h('span', null, '添加未成功,' + errorMessage),
                        ]),
                    })
                }
            });
        };

        return {
            form,
            Plus,
            options,
            uploadHeader,
            handleAvatarSuccess,
            beforeAvatarUpload,
            onSubmit
        };
    }
}
</script>