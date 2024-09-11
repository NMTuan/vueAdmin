<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-09-11 10:57:08
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-11 11:24:56
 * @FilePath: \vueAdmin\src\components\layout\header\headerMenu\headerMenuFullScreen.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <HeaderMenuItem :item="config" @click="handleClick">
        {{ item.components }}
    </HeaderMenuItem>
</template>
<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
});
// 默认图标
const defaultIcons = computed(() => {
    return {
        unFull: props.item.icon || "ri-fullscreen-line",
        full: props.item.activeIcon || "ri-fullscreen-exit-line",
    };
});
const isFullMode = ref(false);

const config = computed(() => {
    return {
        icon: isFullMode.value
            ? defaultIcons.value.full
            : defaultIcons.value.unFull,
    };
});

// 点击切换
const handleClick = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch((e) => {
            console.error(
                `Error attempting to enable fullscreen mode: ${e.message}`
            );
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
};

// 更新状态
const updateFullscreenState = () => {
    isFullMode.value = !!document.fullscreenElement;
};

// 执行
onMounted(() => {
    document.addEventListener("fullscreenchange", updateFullscreenState);
});

// 注销
onUnmounted(() => {
    document.removeEventListener("fullscreenchange", updateFullscreenState);
});
</script>
