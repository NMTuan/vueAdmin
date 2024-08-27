<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 19:59:47
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-26 22:44:11
 * @FilePath: \vueAdmin\src\components\layout\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div class="flex h-screen bg-zinc-100">
        <div class="bg-white flex-shrink-0 w-280px shadow overflow-hidden relative z-2">
            <Logo class="sticky top-0 z-1" />
            <el-scrollbar class="h-full">
                <Sidebar />
                <div v-for="i in 100">{{ i }}</div>
            </el-scrollbar>
        </div>
        <div class="flex-1 flex-col overflow-y-auto">
            <Header class="h-16 sticky top-0 z-1" />
            <Tabs class="h-10 overflow-hidden sticky top-16 z-1" />
            <div class="text-center p-6">
                <!-- <slot :key="key" /> -->
                <slot />
                <div v-for="i in 100">{{ i }}</div>
            </div>
            <!-- <div class="bg-purple-200 sticky bottom-0">footer</div> -->
        </div>
    </div>
</template>
<script setup></script>
