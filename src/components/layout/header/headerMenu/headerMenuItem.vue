<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-09-11 09:54:24
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-11 11:51:11
 * @FilePath: \vueAdmin\src\components\layout\header\headerMenu\headerMenuItem.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-button color="#52525b" class="px-2 !ml-2 focus-visible:outline-0"
    @click="handleClick">
        <template #icon v-if="item.icon">
            <i :class="item.icon" class="text-lg"></i>
        </template>
        <template #default v-if="item.label">
            {{ item.label }}
            <slot></slot>
        </template>
    </el-button>
</template>
<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
});
const logout = inject('logout')
const handleClick = () => {
    if(props.item.component === 'logout'){
        logout()
    }
}
</script>
