/*
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 16:41:12
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-11 10:57:35
 * @FilePath: \vueAdmin\src\main.ts
 * @Description:
 *
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved.
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import ElementPlus from "element-plus";

import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'
import "virtual:uno.css";
import "@unocss/reset/eric-meyer.css";
import "remixicon/fonts/remixicon.css";

import App from "./App.vue";
import router from "./router";
const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
