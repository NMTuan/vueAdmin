<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 22:00:10
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-06 05:42:28
 * @FilePath: \vueAdmin\src\components\page\dataTable\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <ComTable
    v-model:query="query"
    :loading="loading"
    :data="fetchData"
    :fetch="fetch"
    />
</template>

<script setup>
const route = useRoute();
const pageConfig = inject("pageConfig", {});
provide(
    "parentUrl",
    computed(() => {
        return pageConfig.value.fetchUrl || route.path;
    })
);
console.log('pageConfig', pageConfig)
const loading = ref(false);
const query = ref({
    page: 1,
    limit: 20,
});
const fetchData = ref({});

// 异步拉去数据
const fetch = async () => {
    const url = pageConfig.value.fetchUrl || pageConfig.value.path;
    const method = pageConfig.value.fetchType || "get";
    loading.value = true;
    const res = await request[method](url, query.value);
    loading.value = false;
    if (res.code === 200) {
        fetchData.value = res.data;
    }
};

// 页面进入是否自动加载
if (pageConfig.value.autoFetch !== "false") {
    fetch();
}
</script>
