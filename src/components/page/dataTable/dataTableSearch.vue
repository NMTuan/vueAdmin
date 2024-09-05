<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 14:25:00
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-05 10:16:23
 * @FilePath: \vueAdmin\src\components\page\dataTable\dataTableSearch.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div class="flex items-center">
        <!-- 搜索 -->
        <template v-if="Array.isArray(searchFields) && searchFields.length">
            <ComForm
                v-model="query"
                :fields="searchFields"
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
                    <el-dropdown-item
                        @click="fetchList"
                        v-if="
                            Array.isArray(searchFields) && searchFields.length
                        "
                    >
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
                            Array.isArray(searchFields) && searchFields.length
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
        <DataTableAdvSearch
            ref="advSearchRef"
            v-if="
                Array.isArray(fetchData.advSearch) && fetchData.advSearch.length
            "
        />
        <DataTableOptions ref="tableOptionsRef" />
    </div>
</template>
<script setup>
const fetchData = inject("fetchData", {});
const query = inject("query", {});
// 暂存一下查询条件, 供 reset 使用
const defaultQuery = JSON.parse(JSON.stringify(query.value));
const fetchList = inject("fetchList", () => {});
const searchFields = computed(() => {
    return fetchData.value.search || null;
});

// 高级搜索 ref
const advSearchRef = ref(null);

// 表格设置 ref
const tableOptionsRef = ref(null);

// 点击搜索
const handleSearch = () => {
    query.page = 1;
    fetchList();
};
// 重置搜索
const handleReset = () => {
    query.value = defaultQuery;
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
