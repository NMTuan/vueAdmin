<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-09-05 11:43:41
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-06 05:23:29
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
    // fetchUrl: ''
    fetchType: "get",
    query: [],
    props: {},
});
const row = inject("row", {});
const parentUrl = inject('parentUrl')
console.log('parentUrl', parentUrl)

// 一层层把自己当前的 url 注入下去
const fetchUrl = computed(()=>{
    return config.fetchUrl || parentUrl.value + "/" + config.key;
})
provide('parentUrl', fetchUrl)

// 对话框显示状态
const dialogVisible = ref(false);
const loading = ref(false);
const fetchData = ref({});

const q = config.query.reduce((acc, item) => {
    acc[item] = row?.[item];
    return acc;
}, {});
const query = ref({
    page: 1,
    limit: 20,
});
query.value = { ...q, ...query.value };

// 临时在这里暂存一下默认查询条件把, 懒得处理了.
const defaultQuery = JSON.parse(JSON.stringify(query.value));
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
        ...config.showTypeProps,
        modelValue: dialogVisible.value,
    };
});

// 点击按钮
const handleClick = () => {
    dialogVisible.value = true;
    fetch();
};

// 获取数据
const fetch = async () => {
    const method = config.fetchType || "get";

    loading.value = true;
    const res = await request[method](fetchUrl.value, query.value);
    loading.value = false;
    if (res.code === 200) {
        fetchData.value = res.data;
    }
};

const handleClosed = ()=>{
    query.value = JSON.parse(JSON.stringify(defaultQuery));
    dialogVisible.value = false;
}
</script>
