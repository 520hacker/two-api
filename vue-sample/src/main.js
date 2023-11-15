import { createApp } from 'vue'
import ElementPlus from 'element-plus'
// import mitt from 'mitt'
// import { VueMasonryPlugin } from "vue-masonry";
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router/index';


import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
// import hljs from 'highlight.js';
// VMdPreview.use(githubTheme, {
//   Hljs: hljs,
// });

// highlightjs 核心代码
import hljs from 'highlight.js/lib/core';
// 按需引入语言包
import json from 'highlight.js/lib/languages/json';

hljs.registerLanguage('json', json);

VMdPreview.use(githubTheme, {
  Hljs: hljs,
});

// const emitter = mitt()
let app = createApp(App)
// app.config.globalProperties.emitter = emitter

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

createApp(App)
  .use(router)
  .use(ElementPlus)
  .use(VMdPreview)
  // .use(VueMasonryPlugin)
  .mount('#app')
