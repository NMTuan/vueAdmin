<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 14:25:00
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-11-06 15:37:39
 * @FilePath: \vueAdmin\src\components\com\comTable\comTableSearch.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div class="flex items-center ml-3">
        <!-- 搜索 -->
        <template v-if="Array.isArray(fetchData.search) && fetchData.search.length">
            <ComForm
                v-model="query"
                :fields="fetchData.search"
                :formProps="{
                    labelPosition: 'left',
                    inline: true,
                }"
            ></ComForm>
            <el-button type="primary" @click="handleSearch"> 搜索 </el-button>
        </template>
        <!-- 更多操作 -->
        <el-dropdown class="ml-3" trigger="click" placement="bottom-end">
            <el-button>
                <template #icon>
                    <i class="ri-more-2-fill"></i>
                </template>
            </el-button>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="fetchList">
                        <i class="ri-refresh-line"></i>
                        刷新列表
                    </el-dropdown-item>
                    <el-dropdown-item
                        @click="() => advSearchRef.open()"
                        v-if="
                            Array.isArray(fetchData.advSearch) &&
                            fetchData.advSearch.length
                        "
                    >
                        <i class="ri-search-line"></i>
                        高级搜索
                    </el-dropdown-item>
                    <el-dropdown-item
                        @click="handleReset"
                        v-if="
                            Array.isArray(fetchData.search) && fetchData.search.length
                        "
                    >
                        <i class="ri-reset-left-line"></i>
                        重置搜索
                    </el-dropdown-item>
                    <el-dropdown-item
                        divided
                        @click="() => tableOptionsRef.open()"
                    >
                        <i class="ri-settings-line"></i>
                        表格设定
                    </el-dropdown-item>
                    <el-dropdown-item divided disabled>
                        <i class="ri-filter-line"></i>
                        条件过滤
                    </el-dropdown-item>
                    <el-dropdown-item disabled>
                        <i class="ri-download-line"></i>
                        导出搜索结果
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <ComTableAdvSearch
            ref="advSearchRef"
            v-if="
                Array.isArray(fetchData.advSearch) && fetchData.advSearch.length
            "
            v-model:query="query"
            v-model:fetchData="fetchData"
        />
        <ComTableOptions ref="tableOptionsRef" />
    </div>
</template>
<script setup>
const fetchData = defineModel("fetchData", {
    type: Object,
    default: () => {},
});
const query = defineModel("query", {
    type: Object,
    default: () => {},
});
// 暂存一下查询条件, 供 reset 使用
const defaultQuery = JSON.stringify(query.value);
const fetchList = inject("fetchList", () => {});

// 高级搜索 ref
const advSearchRef = ref(null);

// 表格设置 ref
const tableOptionsRef = ref(null);

// 点击搜索
const handleSearch = () => {
    query.page = 1;
    // 清掉空值的key
    Object.keys(query.value).forEach((key) => {
        if (query.value[key] === "") {
            delete query.value[key];
        }
    })
    fetchList();
};
// 重置搜索
const handleReset = () => {
    query.value = JSON.parse(defaultQuery);
    fetchList();
};
provide("handleReset", handleReset);
</script>
<style lang="scss" scoped>
:deep() {
    .el-button-group {
        @apply flex;
    }
}
</style>
