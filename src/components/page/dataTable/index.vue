<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-27 16:57:06
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-28 10:59:39
 * @FilePath: \vueAdmin\src\components\page\dataTable\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 22:00:10
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-27 21:34:55
 * @FilePath: \vueAdmin\src\components\page\dataTable\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div class="border border-solid border-zinc-200 p-6 bg-white rounded">
        <!-- 操作区域 -->
        <div
            v-if="actions.filter((i) => i.positions.includes('top')).length"
            class="mb-4"
        >
            <el-button
                v-for="action in actions.filter((i) =>
                    i.positions.includes('top')
                )"
                v-bind="action.props"
            >
                <template #icon v-if="action.icon">
                    <i :class="action.icon"></i>
                </template>
                {{ action.label }}
            </el-button>
        </div>
        <el-table
            :data="rows"
            border
            stripe
            v-loading="loading"
            :highlight-current-row="
                columns && !columns.find((i) => i.component === 'selection')
            "
            @current-change="handleCurrentChange"
            @selection-change="handleSelectChange"
            v-bind="pageConfig.props"
        >
            <template v-for="column in columns">
                <!-- 行操作项 -->
                <el-table-column v-if="column.component === 'actions'">
                    <el-button
                        v-for="action in actions.filter((i) =>
                            i.positions.includes('row')
                        )"
                        v-bind="action.props"
                        size="small"
                    >
                        <template #icon v-if="action.icon">
                            <i :class="action.icon"></i>
                        </template>
                        {{ action.label }}
                    </el-button>
                </el-table-column>
                <el-table-column
                    v-else
                    :label="column.label"
                    :prop="column.key"
                    :type="column.component"
                    v-bind="column.props"
                >
                </el-table-column>
            </template>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            background
            v-model:current-page="query.page"
            v-model:page-size="query.limit"
            :total="total"
            :layout="'prev, pager, next, total, ->, jumper, sizes'"
            class="py-6 -mb-6 sticky bottom-0 z-8 bg-white"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
        >
        </el-pagination>
    </div>
</template>

<script setup>
const pageConfig = inject("pageConfig", {});
const loading = ref(false);
const query = ref({
    page: 1,
    limit: 20,
});
const fetchData = ref({});
// const selectedRow = ref({});
const selectedRows = ref([]);
const rows = computed(() => {
    return fetchData.value.rows || [];
});
const columns = computed(() => {
    if (fetchData.value.columns && Array.isArray(fetchData.value.columns)) {
        // fetchData.value.columns.map((column) => {
        //     column.prop = column.key;
        // });
        return fetchData.value.columns || [];
    }
    // 没有返回 columns 配置的, 从第一条数据中获取
    if (Array.isArray(rows.value) && rows.value.length > 0) {
        return Object.keys(fetchData.value.rows[0]).map((item) => {
            return {
                label: item,
                prop: item,
            };
        });
    }
});
const total = computed(() => {
    return fetchData.value.total || 0;
});
const actions = computed(() => {
    return pageConfig.value.actions || [];
});

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
// 单选
const handleCurrentChange = (val) => {
    selectedRows.value = [val];
};
// 多选
const handleSelectChange = (val) => {
    selectedRows.value = val;
};

// 翻页
const handlePageChange = (page) => {
    query.value.page = page;
    fetch();
};
// 调整每页显示数量
const handleSizeChange = (size) => {
    query.value.page = 1;
    query.value.limit = size;
    fetch();
};

// 页面进入是否自动加载
if (pageConfig.value.autoFetch !== "false") {
    fetch();
}

</script>
