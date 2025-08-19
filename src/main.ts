import { createApp } from 'vue'
import './assets/style.css'
import App from './app'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import ru from 'element-plus/es/locale/lang/ru'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'

const app = createApp(App);

app
    .use(createPinia())
    .use(ElementPlus)
    .use(ElementPlus, { locale: ru });

for (const [key, component] of Object.entries(ElementPlusIconsVue))
    app.component(key, component);

app.mount('#app');
