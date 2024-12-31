<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-09-06 10:45:55
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-11 13:37:25
 * @FilePath: \vueAdmin\src\components\layout\header\breadcrumb.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-breadcrumb>
        <el-breadcrumb-item v-for="path in paths">
            {{ path.label }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup>
const route = useRoute();
const user = useUserStore();
const paths = computed(() => {
    const arr = [];
    route.path.split("/").reduce((acc, path) => {
        if (path) {
            const newPath = `${acc}/${path}`;
            const menu = user.menuFlat.find((item) => item.path === newPath);
            if (menu) {
                arr.push(menu);
            }
            return newPath;
        }
        return "";
    }, "");
    return arr;
});
</script>
<style lang="scss" scoped>
:deep() {
    .el-breadcrumb__inner {
        @apply text-zinc-100!;
    }
}
</style>
