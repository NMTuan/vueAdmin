<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 22:00:10
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-05 10:01:22
 * @FilePath: \vueAdmin\src\components\page\dataTable\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div class="border border-solid border-zinc-200 p-6 bg-white rounded">
        <!-- 头部 -->
        <div class="flex items-center justify-between mb-4">
            <!-- 操作区域 -->
            <div
                v-if="actions.filter((i) => i.positions.includes('top')).length"
                class="flex-1"
            >
                <div class="flex">
                    <el-button
                        v-for="action in actions.filter((i) =>
                            i.positions.includes('top')
                        )"
                        v-bind="action.props"
                        @click="clickAction(action)"
                        :disabled="
                            handleTopActionDisabled(action.disabled?.top)
                        "
                    >
                        <template #icon v-if="action.icon">
                            <i :class="action.icon"></i>
                        </template>
                        {{ action.label }}
                    </el-button>
                </div>
            </div>
            <!-- 搜索及其它操作 -->
            <DataTableSearch />
        </div>

        <el-table
            :data="rows"
            stripe
            v-loading="loading"
            :highlight-current-row="!multipleMode"
            @current-change="handleCurrentChange"
            @selection-change="handleSelectChange"
            v-bind="pageConfig.props"
        >
            <template v-for="(column, index) in columns">
                <!-- 行操作列 -->
                <el-table-column
                    v-if="column.component === 'actions'"
                    :label="column.label"
                    :prop="column.key"
                    :type="column.component"
                    v-bind="columnProps(column)"
                >
                    <template #default="{ row }">
                        <el-button
                            v-for="(action, j) in actions.filter((i) =>
                                i.positions.includes('row')
                            )"
                            v-bind="action.props"
                            size="small"
                            @click="clickAction(action, row)"
                            :disabled="
                                handleRowActionDisabled(
                                    action.disabled?.row,
                                    row,
                                    action
                                )
                            "
                        >
                            <template #icon v-if="action.icon">
                                <i :class="action.icon"></i>
                            </template>
                            {{ action.label }}
                        </el-button>
                    </template>
                </el-table-column>
                <!-- element plus 内置特殊列, 不做处理 -->
                <el-table-column
                    v-else-if="['selection'].includes(column.component)"
                    :label="column.label"
                    :prop="column.key"
                    :type="column.component"
                    v-bind="columnProps(column)"
                >
                </el-table-column>
                <!-- 其它列 -->
                <el-table-column
                    v-else
                    :label="column.label"
                    :prop="column.key"
                    :type="column.component"
                    v-bind="columnProps(column)"
                >
                    <template #default="{ row, column: col, $index }">
                        <slot :name="`column_${column.key}`">
                            <ComField
                                v-if="column.component"
                                :type="column.component"
                                :value="row[column.key]"
                                :config="column"
                                :row="row"
                            />
                            <template v-else>
                                {{ row[column.key] }}
                            </template>
                        </slot>
                    </template>
                </el-table-column>
                <!-- 其它列 -->
                <!-- <el-table-column
                    v-else
                    :label="column.label"
                    :prop="column.key"
                    :type="column.component"
                    v-bind="column.props"
                >
                    <template #default="{ row, column, $index }">
                        <slot :name="`column_${column.key}`">
                            {{ row[column.property] }}
                        </slot>
                    </template>
                </el-table-column> -->
            </template>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            background
            v-model:current-page="query.page"
            v-model:page-size="query.limit"
            :total="total"
            :layout="'prev, pager, next, ->, total, sizes'"
            class="py-6 -mb-6 sticky bottom-0 z-8 bg-white"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
        >
        </el-pagination>
        <!-- 操作项的弹窗 -->
        <Action
            v-if="Object.keys(currentAction).length"
            v-model="currentAction"
        />
        <pre>{{ currentAction }}</pre>
    </div>
</template>

<script setup>
const route = useRoute();
const dataTableStore = useDataTableStore();
const pageConfig = inject("pageConfig", {});
const loading = ref(false);
const query = ref({
    page: 1,
    limit: 20,
});
provide("query", query);
const fetchData = ref({});
provide("fetchData", fetchData);
// 是否为多选模式
const multipleMode = computed(() => {
    return (
        Array.isArray(columns.value) &&
        columns.value.some((i) => i.component === "selection")
    );
});

// 选中的行
const selectedRows = ref([]);
provide("selectedRows", selectedRows);

// 从 fetchData 中找到 行数据
const rows = computed(() => {
    return fetchData.value.rows || [];
});

// 从 fetchData 中找到 列数据
const columns = computed(() => {
    let cols = [];
    if (fetchData.value.columns && Array.isArray(fetchData.value.columns)) {
        cols = fetchData.value.columns || [];
    }
    // 没有返回 columns 配置的, 从第一条数据中获取
    else if (Array.isArray(rows.value) && rows.value.length > 0) {
        cols = Object.keys(fetchData.value.rows[0]).map((item) => {
            return {
                label: item,
                prop: item,
            };
        });
    }

    // 按照配置, 隐藏不必要的列
    return cols.filter((col) => {
        return (
            dataTableStore.configTableColumnsVals[
                `${route.path}__hidden__${col.key}`
            ] !== true
        );
    });
});

// 从 fetchData 中找到 数据总条数
const total = computed(() => {
    return fetchData.value.total || 0;
});

// 从页面配置中找到操作项的配置
const actions = computed(() => {
    return pageConfig.value.actions || [];
});

// 当前操作项, 主要用于打开 dialog 等对话框, 并传递数据.
// 有值则打开 dialog / slideover
const currentAction = ref({});
provide("currentAction", currentAction);

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
provide("fetchList", fetch);

// 单选 记录选中数据
const handleCurrentChange = (val) => {
    if (multipleMode.value) {
        return;
    }
    selectedRows.value = [val];
};
// 多选 记录选中数据
const handleSelectChange = (val) => {
    if (!multipleMode.value) {
        return;
    }
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
    // const rows = row ? [row]: selectedRows.value
    if (row) {
        selectedRows.value = [row];
    }

    // 二次确认, 一般用于删除操作
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
        // 整理发送的数据, 从row[]中找query[], 用逗号分割
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
            postData = selectedRows.value;
        }

        ElMessageBox.confirm(message, title, {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            beforeClose: async (action, instance, done) => {
                if (action === "confirm") {
                    instance.confirmButtonLoading = true;
                    const res = await request.post(url, postData);
                    if (res.code === 200) {
                        done();
                        // reload
                        fetch();
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

// 处理行内操作的禁用状态
// 这里是比对 row 中的 key/value
const handleRowActionDisabled = (rules, row = {}) => {
    if (
        !rules ||
        Object.keys(rules).length === 0 ||
        Object.keys(row).length === 0
    ) {
        return;
    }
    const func = sift(rules);
    return func(row);
};

// 处理头部操作的禁用状态
// 这里是比对 选中行数量
const handleTopActionDisabled = (rules) => {
    if (!rules || Object.keys(rules).length === 0) {
        return;
    }
    const func = sift(rules);
    return func(selectedRows.value.length);
};

// 处理列配置项
const columnProps = (column) => {
    return {
        ...column.props,
        width: dataTableStore.configTableColumnsVals[
            `${route.path}__width__${column.key}`
        ],
        align: dataTableStore.configTableColumnsVals[
            `${route.path}__align__${column.key}`
        ],
        fixed: dataTableStore.configTableColumnsVals[
            `${route.path}__fixed__${column.key}`
        ],
    };
};

// 页面进入是否自动加载
if (pageConfig.value.autoFetch !== "false") {
    fetch();
}
</script>
