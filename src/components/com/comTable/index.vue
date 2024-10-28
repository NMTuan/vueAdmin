<template>
    <div class="border border-solid border-zinc-200 p-6 bg-white rounded">
        fetchParams: {{ fetchParams }}
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
            <ComTableSearch />
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
                        <!-- <slot :name="`column_${column.key}`"> -->
                        <ComField
                            v-if="column.component"
                            :type="column.component"
                            :value="handleShowContent({ column, row })"
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
    </div>
</template>
<script setup>
const route = useRoute();
const dataTableStore = useDataTableStore();
const props = defineProps({
    fetchUrl: {
        type: String,
        default: "",
    },
    fetchType: {
        type: String,
        default: "get",
    },
    fetchParams: {
        type: Object,
        default: () => {},
    },
});
const loading = ref(false);
const fetchUrl = computed(() => {
    return props.fetchUrl || route.path;
});
provide("fetchUrl", fetchUrl);
const fetchData = ref({});
provide("fetchData", fetchData);

const query = ref({
    ...props.fetchParams,
    page: 1,
    limit: 10,
});
provide("query", query);

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
    // TODO 由于有弹窗 table, 可能跟当前页面table冲突
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

// 点击操作项
const clickAction = (action, row = null) => {
    // 完善 action 对象
    action.path = `${props.fetchUrl || route.path}/${action.key}`;
    console.log("route", route);
    console.log("action", JSON.parse(JSON.stringify(action)));

    // 赋值当前行数据
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
        const url = action.fetch?.url || action.path;
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
                        await fetchList();
                    }
                } else {
                    done();
                }
            },
        });
        return;
    }

    const params = {};
    if (Array.isArray(action.query)) {
        action.query.forEach((key) => {
            const vals = [];
            selectedRows.value.forEach((row) => {
                vals.push(row[key]);
            });
            params[key] = vals.join(",");
        });
    }

    // 打开 action 相应的对话框
    currentAction.value = {
        key: action.key,
        label: action.label,
        component: action.component,
        showType: action.showType,
        showTypeProps: action.showTypeProps,
        fetchUrl:
            action.fetchUrl || `${props.fetchUrl || route.path}/${action.key}`,
        fetchType: action.fetchTtype || "get",
        fetchParams: {
            ...(props.fetchParams || {}),
            ...params,
        },
    };
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
            `${fetchUrl.value}__width__${column.key}`
        ],
        align: dataTableStore.configTableColumnsVals[
            `${fetchUrl.value}__align__${column.key}`
        ],
        fixed: dataTableStore.configTableColumnsVals[
            `${fetchUrl.value}__fixed__${column.key}`
        ],
    };
};

// 获取数据
const fetchRequest = async () => {
    // 数据获取地址: 给定值或当前路由
    if (!fetchUrl.value) {
        return;
    }
    const method = props.fetchType?.toLowerCase() || "get";
    loading.value = true;
    const res = await request[method](fetchUrl.value, query.value);
    loading.value = false;
    if (res.code === 200) {
        fetchData.value = res.data;
    }
};

const fetchList = async () => {
    await fetchRequest();
    // 每次刷新, 清除选中的内容
    selectedRows.value = [];
};
provide("fetchList", fetchList);

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
    fetchRequest();
};
// 调整每页显示数量
const handleSizeChange = (size) => {
    query.value.page = 1;
    query.value.limit = size;
    fetchRequest();
};

// 单元格内显示的内容, 支持 parent.child.child 这种方式取json中的值
const handleShowContent = ({ column, row }) => {
    // row[column.key]
    return column.key.split(".").reduce((total, item) => total[item], row);
};

onMounted(() => {
    fetchList();
});
</script>
