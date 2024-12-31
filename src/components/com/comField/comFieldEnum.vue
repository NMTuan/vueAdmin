<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-10-18 13:07:22
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-10-30 13:39:30
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\com\comField\comFieldEnum.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-tag v-bind="thisProps">
        {{ showVal }}
    </el-tag>
</template>
<script setup>
const value = inject("value", "");
const config = inject("config", "");

const option = computed(() => {
    return config.value?.options?.find(
        (option) => option.value.toString() === value.value.toString()
    );
});

const showVal = computed(() => {
    return option.value?.label || value;
});

const thisProps = computed(() => {
    return option.value?.props || {
        type: 'info'
    };
});
</script>
