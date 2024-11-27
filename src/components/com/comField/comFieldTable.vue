<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-09-05 11:43:41
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-11-27 15:13:10
 * @FilePath: \vueAdmin\src\components\com\comField\comFieldTable.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div>
        <el-link v-bind="linkProps" @click="handleClick">
            {{ value }}
        </el-link>
        <ComDialogModal
            v-if="dialogVisible"
            :showType="config.showType"
            :thisProps="dialogProps"
            :closed="handleClosed"
        >
            <ComTable
                v-model:query="query"
                :loading="loading"
                :data="fetchData"
                :fetch="fetch"
            />
        </ComDialogModal>
    </div>
</template>
<script setup>
const route = useRoute();
const value = inject("value", "");
const config = inject("config", {
    key: "",
    showType: "dialog",
    query: [],
    props: {},
});
const fetch = inject("fetch", {});

// 对话框显示状态
const dialogVisible = ref(false);
const loading = ref(false);
const fetchData = ref({});

const query = ref({
    page: 1,
    limit: 20,
});
if (fetch.value.method === "get") {
    query.value = { ...fetch.value.query, ...query.value };
}

// 临时在这里暂存一下默认查询条件把, 懒得处理了.
// const defaultQuery = JSON.parse(JSON.stringify(query.value));
// 按钮配置项
const linkProps = computed(() => {
    return {
        type: "primary",
        ...config?.props,
    };
});
// 对话框配置
const dialogProps = computed(() => {
    return {
        destroyOnClose: true,
        ...config.value.showTypeProps,
        modelValue: dialogVisible.value,
    };
});

// 点击按钮
const handleClick = () => {
    dialogVisible.value = true;
};

const handleClosed = () => {
    // query.value = JSON.parse(JSON.stringify(defaultQuery));
    dialogVisible.value = false;
};
</script>
