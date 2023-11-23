// import './assets/main.css'

import { createApp } from 'vue'
import { setupStore } from "@/store";
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/styles/tailwind.css'

//dark mode
import '@/styles/index.scss'



const app = createApp(App)

setupStore(app);
app.use(router)
app.use(ElementPlus)

app.mount('#app')

// 全局注册`@iconify/vue`图标�?
import { IconifyIconOffline, IconifyIconOnline, FontIcon } from './components/ReIcon'
app.component('IconifyIconOffline', IconifyIconOffline)
app.component('IconifyIconOnline', IconifyIconOnline)
app.component('FontIcon', FontIcon)
