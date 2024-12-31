<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-11-11 10:53:02
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-11-11 11:01:45
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\echo.vue
 * @Description: 调试组件, 非生产环境显示 slot 内容
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <pre v-if="!isProd"><slot/></pre>
</template>
<script setup>
const isProd = import.meta.env.PROD;
</script>