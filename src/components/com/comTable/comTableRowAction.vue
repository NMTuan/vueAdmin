<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-11-10 11:43:44
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-12-14 16:32:43
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
    const url = [parentFetch.url, props.action.key].join("/");
    const fetch = {
        url: props.action.fetch?.url || url,
        params: {
            ...parentFetch.params,
            ...utils.handleParams(props.action.fetch?.params, props.row),
        },
        config: {
            ...props.action.fetch?.config,
        },
    };
    const submit =
        props.action.submit === undefined
            ? fetch
            : {
                  url: props.action.submit?.url || url,
                  params: {
                      ...parentFetch.params,
                      ...utils.handleParams(
                          props.action.submit?.params,
                          props.row,
                      ),
                  },
                  data: {
                      ...utils.handleParams(
                          props.action.submit?.data,
                          props.row,
                      ),
                  },
                  config: {
                      ...props.action.submit?.config,
                  },
              };

    currentAction.value = {
        ...props.action,
        fetch,
        submit,
    };
};
</script>
