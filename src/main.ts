import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn';
// import {createPinia} from 'pinia'
import pinia from "@/stores/index"
import router from './router'
// SVG图标配置
import 'virtual:svg-icons-register'
// 引入svg
import gloablComponent from './components/index';
// 清除默认样式
import '@/style/index.scss'
// 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 引入鉴权文件
import '@/router/permission'
const app = createApp(App)
// 全局安装element-plus,element-plus默认支持语言英语设置为中文
app.use(ElementPlus, { locale: zhCn });
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.use(gloablComponent);
app.mount('#app')
