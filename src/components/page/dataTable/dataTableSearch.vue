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
                    <el-dropdown-item @click="handleReset">重置搜索</el-dropdown-item>
                    <el-dropdown-item @click="handleAdvSearch">高级搜索</el-dropdown-item>
                    <el-dropdown-item>条件过滤</el-dropdown-item>
                    <el-dropdown-item>表格设定</el-dropdown-item>
                    <el-dropdown-item>导出搜索结果</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <!-- <el-button class="ml-3">
            <template #icon>
                <i class="ri-refresh-line" @click="fetchList"></i>
            </template>
        </el-button> -->
    </div>
</template>
<script setup>
const fetchData = inject("fetchData", {});
const query = inject("query", {});
const defaultQuery = JSON.parse(JSON.stringify(query.value))
const fetchList = inject("fetchList", () => {});
const searchFields = computed(() => {
    return fetchData.value.search || null;
});

// 点击搜索
const handleSearch = () => {
    fetchList()
};
// 重置搜索
const handleReset = ()=>{
    query.value = defaultQuery
    fetchList()
}

// 高级搜索
const handleAdvSearch = ()=>{
    
}
</script>
