<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-09-03 05:23:48
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-11-27 14:52:38
 * @FilePath: \vueAdmin\src\components\com\comField\comFieldDetail.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div>
        <el-link
            v-bind="linkProps"
            @click="handleClick"
        >
            {{ value }}
        </el-link>
        <ComDialogModal
            v-if="dialogVisible"
            :showType="config.showType"
            :thisProps="dialogProps"
            :closed="() => (dialogVisible = false)"
        >
            <ComDetail
                :fields="fields"
                :row="fetchData"
                v-loading="loading"
            />
        </ComDialogModal>
    </div>
</template>
<script setup>
const value = inject("value", "");
const config = inject("config", {});
const fetch = inject("fetch", {});


// 对话框显示状态
const dialogVisible = ref(false);
const loading = ref(false);
const fetchData = ref({});
const fields = computed(() => {
    if (fetchData.value?.fields) {
        return fetchData.value.fields;
    }

    // 否则从 fetchData.data 循环拿 key
    if (!fetchData.value?.data) {
        return [];
    }
    return Object.keys(fetchData.value.data).map((key) => {
        return {
            key,
            label: key,
        };
    });
});
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
        ...config.value.showTypeProps,
        modelValue: dialogVisible.value,
    };
});

// 点击按钮
const handleClick = () => {
    dialogVisible.value = true;
    fetchRequest();
};

// 获取数据
const fetchRequest = async () => {
    const res = await utils.fetch(fetch.value, loading);
    if(res.code === 200) {
        fetchData.value = res.data;
    }
};
</script>
