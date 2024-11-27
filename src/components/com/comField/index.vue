<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 22:14:12
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-11-27 15:15:25
 * @FilePath: \vueAdmin\src\components\com\comField\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div>
        <ComFieldCopy v-if="component === 'copy'"></ComFieldCopy>
        <ComFieldDetail v-else-if="component === 'detail'"></ComFieldDetail>
        <ComFieldEnum v-else-if="component === 'enum'"></ComFieldEnum>
        <ComFieldTable v-else-if="component === 'table'"></ComFieldTable>
        <template v-else> {{ component }} | {{ value }} </template>
    </div>
</template>
<script setup>
// TODO vue 升级3.5后, 结构 props, 然后 provide
const props = defineProps({
    component: {
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
    },
    fetch: {
        type: Object,
        default: () => {},
    },
    // props: {
    //     type: Object,
    //     default: () => {},
    // },
});
provide(
    "value",
    computed(() => props.value),
);
provide(
    "config",
    computed(() => props.config),
);
provide(
    "row",
    computed(() => props.row),
);

const fetchParams = {};
if (Array.isArray(props.config.fetch?.query)) {
    props.config.fetch.query.forEach((key) => {
        fetchParams[key] = props.row[key];
    });
}

const fetch = ref({
    url: props.config.fetch?.url,
    params: fetchParams,
    config: props.config.fetch?.config,
});
provide("fetch", fetch);
</script>
