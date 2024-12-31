<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-10-18 13:07:22
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-12-14 18:53:48
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\com\comTable\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div class="border border-solid border-zinc-200 p-6 bg-white rounded">
        <Echo>fetchQuery: {{ fetchQuery }}</Echo>
        <Echo>fetch: {{ fetch }}</Echo>
        <Echo>fetchQuery: {{ fetchQuery }}</Echo>
        
        <!-- 头部 -->
        <div class="flex items-center justify-between mb-4">
            <!-- 操作区域 -->
            <div class="flex-1">
                <div
                    v-if="
                        actions.filter((i) => i.positions.includes('top'))
                            .length
                    "
                    class="flex"
                >
                    <ComTableTopAction
                        v-for="action in actions.filter((i) =>
                            i.positions.includes('top'),
                        )"
                        :action="action"
                        :rows="selectedRows"
                        v-model="currentAction"
                    />
                </div>
            </div>
            <!-- 搜索及其它操作 -->
            <ComTableSearch
                v-model:query="fetchQuery"
                v-model:fetchData="fetchData"
            />
        </div>
        <el-table
            :data="rows"
            stripe
            v-loading="loading"
            :highlight-current-row="!multipleMode"
            @current-change="handleCurrentChange"
            @selection-change="handleSelectChange"
        >
            <!-- v-bind="pageConfig?.props" -->
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
                        <ComTableRowAction
                            v-for="(action, j) in actions.filter((i) =>
                                i.positions.includes('row'),
                            )"
                            :row="row"
                            :action="action"
                            v-model="currentAction"
                        />
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
                        <!-- <slot :name="`column_${column.key}`"> -->
                        <ComField
                            v-if="column.component"
                            :component="column.component"
                            :value="handleShowContent({ column, row })"
                            :fetch="
                                handleFieldFetch({
                                    column,
                                    row,
                                })
                            "
                            :config="column"
                            :row="row"
                        />
                        <template v-else>
                            {{ handleShowContent({ column, row }) }}
                        </template>
                        <!-- </slot> -->
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <!-- 分页 -->
        <el-pagination
            background
            v-model:current-page="fetchQuery.page"
            v-model:page-size="fetchQuery.limit"
            :total="total"
            :layout="'prev, pager, next, ->, total, sizes'"
            class="py-6 -mb-6 sticky bottom-0 z-8 bg-white"
            @size-change="handleSizeChange"
            @current-change="handlePageChange"
        >
        </el-pagination>
        <!-- 操作项的弹窗 -->
        <comTableAction
            v-if="Object.keys(currentAction).length"
            v-model="currentAction"
        />
    </div>
</template>
<script setup>
const dataTableStore = useDataTableStore();
const props = defineProps({
    fetch: {
        type: Object,
        default: () => ({
            url: "",
            params: {},
            config: {},
        }),
    },
});
const fetchUrl = computed(() => {
    return props.fetch.url;
});
provide("baseUrl", fetchUrl);
provide("parentFetch", props.fetch);
const fetchData = ref({});
provide("fetchData", fetchData);
const fetchQuery = ref({
    ...utils.handleParams(props.fetch.params),
    page: 1,
    limit: 10,
});
const loading = ref(false);

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
                `${fetchUrl.value}__hidden__${col.key}`
            ] !== true
        );
    });
});
// 从 fetchData 中找到 数据总条数
const total = computed(() => {
    return fetchData.value.total || 0;
});
// 是否为多选模式
const multipleMode = computed(() => {
    return (
        Array.isArray(columns.value) &&
        columns.value.some((i) => i.component === "selection")
    );
});
// 从页面配置中找到操作项的配置
const actions = computed(() => {
    return fetchData.value.actions || [];
});
// 当前操作项, 主要用于打开 dialog 等对话框, 并传递数据.
// 有值则打开 dialog / slideover
const currentAction = ref({});
provide("currentAction", currentAction);

// 处理列配置项
const columnProps = (column) => {
    return {
        ...column.props,
        width:
            column.props?.width ||
            dataTableStore.configTableColumnsVals[
                `${fetchUrl.value}__width__${column.key}`
            ],
        align:
            column.props?.align ||
            dataTableStore.configTableColumnsVals[
                `${fetchUrl.value}__align__${column.key}`
            ],
        fixed:
            column.props?.fixed ||
            dataTableStore.configTableColumnsVals[
                `${fetchUrl.value}__fixed__${column.key}`
            ],
    };
};

// 获取数据
const fetchRequest = async () => {
    const res = await utils.fetch(
        {
            ...props.fetch,
            url: fetchUrl.value,
            params: fetchQuery.value,
        },
        loading,
    );
    fetchData.value = res.data;
    // 清除掉选中的行
    selectedRows.value = [];
};
provide("fetchList", fetchRequest);

// 单选 记录选中数据
const handleCurrentChange = (val) => {
    if (multipleMode.value) {
        return;
    }
    if (val) {
        selectedRows.value = [val];
    }
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
    fetchQuery.value.page = page;
    fetchRequest();
};
// 调整每页显示数量
const handleSizeChange = (size) => {
    fetchQuery.value.page = 1;
    fetchQuery.value.limit = size;
    fetchRequest();
};

// 单元格内显示的内容, 支持 parent.child.child 这种方式取json中的值
const handleShowContent = ({ column, row }) => {
    // row[column.key]
    return utils.getNestedValue(row, column.key);
};

// 单元格内的 fetch 请求配置
const handleFieldFetch = ({ column, row }) => {
    if (!column.fetch) {
        return {};
    }
    const params = {};
    if (column.fetch?.query) {
        column.fetch.query.forEach((key) => {
            params[key] = row[key];
        });
    }
    return {
        url: column.url,
        params,
    };
};

onMounted(() => {
    fetchRequest();
});
</script>
