import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import moment from "moment"
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { createPinia } from 'pinia'
import '@/assets/css/app.scss' // 全局 less

const app = createApp(App);
// 实例化 Pinia
const pinia = createPinia()
// moment
app.config.globalProperties.$moment = moment

app.use(ElementPlus).use(router).use(pinia).mount('#app')

//全局注册图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
