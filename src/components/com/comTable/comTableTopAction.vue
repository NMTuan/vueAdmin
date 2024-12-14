<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-11-10 11:43:44
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-12-14 16:11:22
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\com\comTable\comTableTopAction .vue
 * @Description: 表格头部操作按钮
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-button
        v-if="handleVisible()"
        v-bind="action.props"
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
    // 多选数据
    rows: {
        type: Object,
        default: () => {
            return [];
        },
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
    const rules = props.action?.disabled?.top;
    if (!rules) {
        return false;
    }
    const func = sift(rules);
    return func(props.rows?.length);
};

// 处理操作项的可见性
const handleVisible = () => {
    const rules = props.action.invisible?.top;
    if (!rules) {
        return true;
    }
    const func = sift(rules);
    return !func(props.rows?.length);
};

// 点击操作
const handleClick = () => {
    const url = [parentFetch.url, props.action.key].join("/");

    // 请求配置
    const fetch = {
        url: props.action.fetch?.url || url,
        params: {
            ...parentFetch.params,
            ...utils.handleParams(props.action.fetch?.params, props.rows),
        },
        config: {
            ...props.action.fetch?.config,
        },
    };
    // 提交配置, 如果没有配置submit, 则使用fetch的配置
    const submit =
        props.action.submit === undefined
            ? fetch
            : {
                  url: props.action.submit?.url || url,
                  params: {
                      ...parentFetch.params,
                      ...utils.handleParams(
                          props.action.submit?.params,
                          props.rows,
                      ),
                  },
                  data: {
                      ...utils.handleParams(
                          props.action.submit?.data,
                          props.rows,
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
