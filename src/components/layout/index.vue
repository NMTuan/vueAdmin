<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 19:59:47
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-26 15:25:48
 * @FilePath: \vueAdmin\src\components\layout\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div class="flex h-screen">
        <div class="bg-red-200 flex-shrink-0 w-280px overflow-hidden">
            <Sidebar />
        </div>
        <div class="bg-blue-200 flex-1 flex-col overflow-y-auto">
            <div class="bg-green-200 sticky top-0">header</div>
            <div class="bg-yellow-200">
                <slot />
                <div v-for="i in 100">{{ i }}</div>
            </div>
            <!-- <div class="bg-purple-200 sticky bottom-0">footer</div> -->
        </div>
    </div>
</template>
<script setup></script>
