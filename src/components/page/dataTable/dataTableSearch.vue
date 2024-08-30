<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 14:25:00
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-30 21:40:07
 * @FilePath: \vueAdmin\src\components\page\dataTable\dataTableSearch.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div class="flex items-center">
        <!-- 搜索 -->
        <ComForm
            v-if="Array.isArray(searchFields) && searchFields.length"
            v-model="query"
            :fields="searchFields"
            :formProps="{
                labelPosition: 'left',
                inline: true,
            }"
        ></ComForm>
        <!-- 操作 -->
        <el-dropdown split-button type="primary" @click="handleSearch">
            搜索
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="handleReset">
                        重置搜索
                    </el-dropdown-item>
                    <el-dropdown-item @click="advSearchVisiable = true">
                        高级搜索
                    </el-dropdown-item>
                    <el-dropdown-item divided>表格设定</el-dropdown-item>
                    <el-dropdown-item>条件过滤</el-dropdown-item>
                    <el-dropdown-item>导出搜索结果</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- <el-button class="ml-3">
            <template #icon>
                <i class="ri-refresh-line" @click="fetchList"></i>
            </template>
        </el-button> -->
        <ComDialogModal
            showType="slideover"
            :thisProps="{
                title: '高级搜索',
                modelValue: advSearchVisiable,
                closeOnClickModal: true,
                closeOnPressEscape: true,
                destroyOnClose: true
            }"
            :closed="() => (advSearchVisiable = false)"
        >
            <ComForm v-model="query" :fields="advSearchFields" />
            <template #footer>
                <div class="text-left">
                    <el-button type="primary" @click="submitAdvSarch">
                        提交
                    </el-button>
                    <el-button text @click="advSearchVisiable = false">
                        取消
                    </el-button>
                </div>
            </template>
        </ComDialogModal>
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

// 高级搜索对话框的显示状态
const advSearchVisiable = ref(false);
const advSearchFields = computed(() => {
    return fetchData.value.advSearch || null;
});

// 点击搜索
const handleSearch = () => {
    fetchList();
};
// 重置搜索
const handleReset = () => {
    query.value = defaultQuery;
    fetchList();
};

// 提交高级搜索
const submitAdvSarch = () => {
    advSearchVisiable.value = false;
    fetchList();
};
</script>
