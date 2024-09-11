<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-09-11 11:27:13
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-11 11:30:43
 * @FilePath: \vueAdmin\src\components\layout\header\headerMenu\headerMenuI18n.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <HeaderMenuDropDown :item="config" />
</template>
<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
});

const config = computed(() => {
    return {
        icon: 'ri-translate-2',
        dropDown: [
            {
                label: "简体中文[TODO]",
                value: "zh",
            },
            {
                label: "English[TODO]",
                value: "en",
            },
        ]
        // ...props.item,
    };
});


</script>
