<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 22:14:12
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-10-28 20:27:16
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\com\comField\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div>
        <ComFieldCopy v-if="type === 'copy'"></ComFieldCopy>
        <ComFieldDetail v-else-if="type === 'detail'"></ComFieldDetail>
        <ComFieldEnum v-else-if="type === 'enum'"></ComFieldEnum>
        <ComFieldTable v-else-if="type === 'table'"></ComFieldTable>
        <template v-else> {{ type }} | {{ value }} </template>
    </div>
</template>
<script setup>
// TODO vue 升级3.5后, 结构 props, 然后 provide
const props = defineProps({
    type: {
        type: String,
        default: "",
    },
    value: {
        type: [Number, String, Boolean],
        default: "",
    },
    config: {
        type: Object,
        default: () => {},
    },
    // 辅助数据? 供 fetch query 查数据
    row: {
        type: Object,
        default: () => {},
    }
    // props: {
    //     type: Object,
    //     default: () => {},
    // },
});
provide("value", computed(() => props.value));
provide("config", computed(() => props.config));
provide("row", computed(() => props.row));
</script>
