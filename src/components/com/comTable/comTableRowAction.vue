<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-11-10 11:43:44
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-11-26 13:11:16
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\com\comTable\comTableRowAction.vue
 * @Description: 表格行内操作按钮
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-button
        v-if="handleVisible()"
        v-bind="action.props"
        size="small"
        :disabled="handleDisabled()"
        @click="handleClick()"
    >
        <template
            #icon
            v-if="action.icon"
        >
            <i :class="action.icon"></i>
        </template>
        {{ action.label }}
    </el-button>
</template>
<script setup>
const parentFetch = inject("parentFetch", {});

const props = defineProps({
    // 行数据
    row: {
        type: Object,
        default: () => ({}),
    },
    // 操作配置
    action: {
        type: Object,
        default: () => ({}),
    },
});
// 当前操作配置, 用于弹窗
const currentAction = defineModel({ type: Object, default: () => {} });

// 处理操作项的禁用状态
const handleDisabled = () => {
    const rules = props.action.disabled?.row;
    if (
        !rules ||
        Object.keys(rules).length === 0 ||
        Object.keys(props.row).length === 0
    ) {
        return false;
    }
    const func = sift(rules);
    return func(props.row);
};

// 处理操作项的可见性
const handleVisible = () => {
    const rules = props.action.invisible?.row;
    if (
        !rules ||
        Object.keys(rules).length === 0 ||
        Object.keys(props.row).length === 0
    ) {
        return true;
    }
    const func = sift(rules);
    return !func(props.row);
};

// 点击操作
const handleClick = () => {
    const fetchParams = {};
    // 基于 row 和 action.query 构建 fetchParams 参数
    if (Array.isArray(props.action.fetch?.query)) {
        props.action.fetch.query.forEach((key) => {
            fetchParams[key] = props.row[key];
        });
    }
    const submitParams = {};
    if (Array.isArray(props.action.submit?.params)) {
        props.action.submit.params.forEach((key) => {
            submitParams[key] = props.row[key];
        });
    }
    const submitData = {};
    if (Array.isArray(props.action.submit?.body)) {
        props.action.submit.body.forEach((key) => {
            submitData[key] = props.row[key];
        });
    }

    currentAction.value = {
        ...props.action,
        fetch: {
            // url 规则:
            // 给定值, 或者基于父级组件注入的 baseUrl 加上当前操作的 key
            url:
                props.action.fetch?.url ||
                [parentFetch.url, props.action.key].join("/"),
            params: {
                ...parentFetch.params,
                ...props.action.fetch?.params,
                ...fetchParams,
            },
            config: {
                ...props.action.fetch?.config,
            },
        },
        submit: {
            // url 规则:
            // 给定值, 或者基于父级组件注入的 baseUrl 加上当前操作的 key
            url:
                props.action.submit?.url ||
                [parentFetch.url, props.action.key].join("/"),
            params: {
                ...parentFetch.params,
                ...props.action.submit?.params,
                ...submitParams,
            },
            data: {
                ...props.action.submit?.data,
                ...submitData,
            },
            config: {
                ...props.action.submit?.config,
            },
        },
    };
};
</script>
