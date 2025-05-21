import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入中文语言包
import zhCn from 'element-plus/dist/locale/zh-cn.mjs' 


import * as ElementPlusIconsVue from '@element-plus/icons-vue'


 
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties.$axios = axios;
// 使用 Element Plus并且设置语言包为中文
app.use(ElementPlus, {
  locale: zhCn, 
})
app.use(store).use(router).mount('#app')
