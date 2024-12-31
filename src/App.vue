<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 16:41:12
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-28 10:56:27
 * @FilePath: \vueAdmin\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <router-view v-slot="{ Component }">
        <keep-alive include="dataTable">
            <component :is="Component" :key="pageConfig?.name || ''" />
        </keep-alive>
    </router-view>
</template>

<script setup lang="ts">
const route = useRoute();
const userStore = useUserStore();

// 接口返回的当前页面的配置项
const pageConfig = computed(() => {
    return userStore.menuFlat.find(
        (item) => item.name === route.path.slice(1).replaceAll("/", "-")
    );
});
provide("pageConfig", pageConfig);
</script>

<style scoped></style>
