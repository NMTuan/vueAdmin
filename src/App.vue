<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 16:41:12
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-27 15:48:09
 * @FilePath: \vueAdmin\src\App.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <router-view :key="key"></router-view>
</template>

<script setup lang="ts">
const route = useRoute();
// 确保同路由组件在切换页面时可重新渲染
const key = computed(() => {
    if (route.name === "x") {
        return route.params.x.join("-");
    }
    return route.name;
});
</script>

<style scoped></style>
