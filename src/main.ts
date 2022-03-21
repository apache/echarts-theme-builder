import { createApp } from 'vue';
import { createI18n } from 'vue-i18n'
import zh from './i18n/zh-CN';
import en from './i18n/en-US';

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';


// @ts-ignore
const locale: string = window.ECHARTS_WEBSITE_LANGUAGE;

if (typeof locale === 'undefined') {
    console.error('Can\'t find environment variable ECHARTS_WEBSITE_LANGUAGE');
}

const i18n = createI18n({
    locale,
    messages: {
        en,
        zh
    }
})

const app = createApp(App);
app.use(ElementPlus);
app.use(i18n);

app.mount('#echarts-spa-app');