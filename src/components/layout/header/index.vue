<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-26 21:14:22
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-06 10:43:29
 * @FilePath: \vueAdmin\src\components\layout\header\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div
        class="bg-zinc-600 text-zinc-300 flex items-center justify-between sticky top-0 z-1 px-5"
    >
        <div class="flex items-center">
            <i
                class="ri-menu-fill text-lg cursor-pointer mr-5"
                hover="text-blue-300"
            >
            </i>
            <Breadcrumb />
        </div>
        <HeaderMenu />
    </div>
</template>
<script setup></script>
