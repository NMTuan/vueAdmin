<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-09-05 11:05:25
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-11-27 13:53:09
 * @FilePath: \vueAdmin\src\components\com\comDetail\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-descriptions
        :column="1"
        border
    >
        <el-descriptions-item
            v-for="field in fields"
            :label="field.label"
            :key="field.key"
        >
            <ComField
                v-if="field.component"
                :component="field.component"
                :value="row.data[field.key]"
                :fetch="handleFieldFetch({ column: field, row: row.data })"
                :config="field"
                :row="row.data"
            />
            <template v-else>
                {{ row.data[field.key] }}
            </template>
        </el-descriptions-item>
    </el-descriptions>
</template>
<script setup>
const props = defineProps({
    // 展示的字段
    fields: {
        type: Array,
        default: () => [],
    },
    // 展示的数据
    row: {
        type: Object,
        default: () => {},
    },
});
const handleFieldFetch = ({ column, row }) => {
    if (!column.fetch) {
        return {};
    }
    const params = {};
    if (column.fetch?.query) {
        column.fetch.query.forEach((key) => {
            params[key] = row[key];
        });
    }
    return {
        url: column.fetch?.url,
        params,
    };
};
</script>
