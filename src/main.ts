import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import ru from 'element-plus/es/locale/lang/ru'
import 'element-plus/dist/index.css'

const app = createApp(App);

app
    .use(ElementPlus)
    .use(ElementPlus, { locale: ru });

for (const [key, component] of Object.entries(ElementPlusIconsVue))
    app.component(key, component);

app.mount('#app');
