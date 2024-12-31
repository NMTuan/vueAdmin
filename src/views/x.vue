<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 17:59:05
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-26 12:00:57
 * @FilePath: \vueAdmin\src\views\x.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <Layout>
        <!-- 渲染当前页面约定的组件 -->
        <Page v-if="pageConfig?.component === 'index'" />
        <DataTable v-else-if="pageConfig?.component === 'dataTable'" />
        <Blank v-else />
    </Layout>
</template>

<script setup lang="ts">
const pageConfig = inject("pageConfig", {});
</script>

<style scoped></style>
