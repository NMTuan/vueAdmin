<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-26 13:43:50
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-26 15:30:10
 * @FilePath: \vueAdmin\src\components\layout\sidebar\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-menu v-if="userStore.menu" :default-active="defaultActive">
        <MenuItems :children="userStore.menu" />
    </el-menu>
</template>

<script setup lang="ts">
const route = useRoute()
const userStore = useUserStore()
const defaultActive = computed(() => {
    if (route.name === 'x') {
        return route.params.x.join('-')
    } else {
        return route.path.replace('/', '').replaceAll('-', '')
    }
})

console.log('userStore.menu', userStore.menu)
</script>
