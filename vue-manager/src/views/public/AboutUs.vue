<template>
    <div class="setting-card ">
        <div class="doc-content-wrapper">
            <div class="doc-content-container">
                <h1 id="form-表单" tabindex="-1">关于我们
                </h1>
                <div class="tip custom-block">
                    <p class="custom-block-title">TIP</p>
                    <p>欢迎垂询，以下是我们的介绍</p>
                </div>
                <div class="example" v-html="content">
                </div>
            </div>

            <aside class="toc-wrapper">
                <nav class="toc-content">
                    <h3 class="toc-content__heading">导航</h3>
                    <ul class="toc-items"> 
                        <li class="toc-item">
                            <router-link to="/" class="toc-link">
                                <p class="link-text">首页</p>
                            </router-link>
                        </li>
                        <li class="toc-item">
                            <router-link to="/howtouse" class="toc-link">
                                <p class="link-text">使用指南</p>
                            </router-link>
                        </li>
                        <li class="toc-item">
                            <router-link to="/contact" class="toc-link">
                                <p class="link-text">联系我们</p>
                            </router-link>
                        </li>
                        <li class="toc-item">
                            <router-link to="/about" class="toc-link">
                                <p class="link-text">关于我们</p>
                            </router-link>
                        </li> 
                    </ul>
                </nav>
            </aside>
        </div>
    </div>
</template>
  

<script>
import { getContent } from '@/api/public'
import { ref } from 'vue';
export default {
    name: 'AboutUs',
    setup() {
        const content = ref('loading')
        const onLoad = () => {
            getContent({
                key: 'AboutPage',
            }).then(data => {
                content.value = data.item
            });
        };
        onLoad();

        return {
            content
        };
    }
}
</script>