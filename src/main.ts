/*
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 16:41:12
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-26 12:20:02
 * @FilePath: \vueAdmin\src\main.ts
 * @Description:
 *
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved.
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

import App from './App.vue'
import router from './router'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
