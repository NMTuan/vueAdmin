<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 22:23:33
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-10-27 19:48:16
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\com\comField\comFieldCopy.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div>
        <el-button
            v-if="!thisProps?.position || thisProps?.position === 'before'"
            link
            :type="type"
            @click="handleClick"
        >
            <template #icon>
                <i class="mr-3 text-lg" :class="icon"></i>
            </template>
        </el-button>
        {{ value }}
        <el-button
            v-if="thisProps?.position === 'after'"
            link
            :type="type"
            @click="handleClick"
        >
            <template #icon>
                <i class="ml-3 text-lg" :class="icon"></i>
            </template>
        </el-button>
    </div>
</template>
<script setup>
const value = inject("value", "");
const config = inject("config", {
    props: {},
});
const thisProps = computed(() => {
    return config.value?.props || {};
});
const state = ref(false);
const type = computed(() => {
    if (state.value) {
        return "success";
    } else {
        return "info";
    }
});
const icon = computed(() => {
    if (state.value) {
        return "ri-check-line";
    } else {
        return "ri-file-copy-line";
    }
});
let dt;

const handleClick = () => {
    clearTimeout(dt);
    navigator.clipboard.writeText(value.value);
    state.value = true;
    dt = setTimeout(() => {
        state.value = false;
    }, 500);
};
</script>
