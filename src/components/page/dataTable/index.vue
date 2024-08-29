<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 22:00:10
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-29 16:28:15
 * @FilePath: \vueAdmin\src\components\page\dataTable\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div class="border border-solid border-zinc-200 p-6 bg-white rounded">
        <Action
            v-if="Object.keys(currentAction).length"
            v-model="currentAction"
        />
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
                    <template #default="{ row }">
                        <el-button
                            v-for="action in actions.filter((i) =>
                                i.positions.includes('row')
                            )"
                            v-bind="action.props"
                            size="small"
                            @click="clickAction(action, row)"
                        >
                            <template #icon v-if="action.icon">
                                <i :class="action.icon"></i>
                            </template>
                            {{ action.label }}
                        </el-button>
                    </template>
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
        <pre>{{ currentAction }}</pre>
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
provide("selectedRows", selectedRows);

const rows = computed(() => {
    return fetchData.value.rows || [];
});
const columns = computed(() => {
    if (fetchData.value.columns && Array.isArray(fetchData.value.columns)) {
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
const currentAction = ref({});
provide("currentAction", currentAction);

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

// 点击操作项
const clickAction = (action, row = null) => {
    // 完善 action 对象
    action.path = `${pageConfig.value.path}/${action.key}`;

    // 赋值当前行数据
    if (row) {
        selectedRows.value = [row];
    }

    // confirm
    if (action.component === "confirm") {
        // 如果没有 message，则 message = title，title = label
        // 否则 title=title message=message
        let title = "",
            message = "";
        if (!action.confirmProps.message) {
            message = action.confirmProps?.title;
            title = action.label;
        } else {
            title = action.confirmProps?.title || action.label;
            message = action.confirmProps?.message;
        }
        const url = action.fetchUrl || action.path;
        let postData = {};
        if (Array.isArray(action.query)) {
            action.query.forEach((key) => {
                const vals = [];
                selectedRows.value.forEach((row) => {
                    vals.push(row[key]);
                });
                postData[key] = vals.join(",");
            });
        } else {
            postData = selectedRows.value
        }

        ElMessageBox.confirm(message, title, {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            beforeClose: async (action, instance, done) => {
                if (action === "confirm") {
                    instance.confirmButtonLoading = true;
                    const res = await request.post(url, postData);
                    console.log('res', res)
                    if (res.code === 200) {
                        done();
                        // reload
                    }
                } else {
                    done();
                }
            },
        });
        return;
    }

    // 打开 action 相应的对话框
    currentAction.value = action;
};

// 页面进入是否自动加载
if (pageConfig.value.autoFetch !== "false") {
    fetch();
}
</script>
