<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 14:25:00
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-10-28 11:04:06
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\com\comTable\comTableOptions.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <ComDialogModal
        :thisProps="{
            title: '表格设定',
            modelValue: visiable,
            closeOnClickModal: true,
            closeOnPressEscape: true,
            destroyOnClose: true,
            width: 600,
        }"
        :closed="() => (visiable = false)"
    >
        <el-table :data="tableData">
            <el-table-column
                v-for="column in dataTableStore.configTableColumns"
                :label="column.label"
                :prop="column.key"
                v-bind="column.props"
            >
                <template #default="{ row, column: col, $index }">
                    <template v-if="column.key === 'key'">
                        {{ row.label || row.key || row.component }}
                    </template>
                    <template v-if="column.key === 'hidden'">
                        <el-checkbox
                            v-model="
                                dataTableStore.configTableColumnsVals[
                                    `${fetchUrl}__${column.key}__${row.key}`
                                ]
                            "
                            :disabled="
                                ['selection', 'actions'].includes(row.key)
                            "
                        ></el-checkbox>
                    </template>
                    <template v-if="column.key === 'width'">
                        <el-input
                            class="w-60px"
                            size="small"
                            v-model="
                                dataTableStore.configTableColumnsVals[
                                    `${fetchUrl}__${column.key}__${row.key}`
                                ]
                            "
                            :disabled="row.key === undefined"
                        ></el-input>
                    </template>
                    <template v-if="column.key === 'align'">
                        <el-radio-group
                            size="small"
                            v-model="
                                dataTableStore.configTableColumnsVals[
                                    `${fetchUrl}__${column.key}__${row.key}`
                                ]
                            "
                        >
                            <el-radio-button value="left">
                                <i class="ri-align-left"></i>
                            </el-radio-button>
                            <el-radio-button value="center">
                                <i class="ri-align-center"></i>
                            </el-radio-button>
                            <el-radio-button value="right">
                                <i class="ri-align-right"></i>
                            </el-radio-button>
                        </el-radio-group>
                    </template>
                    <template v-if="column.key === 'fixed'">
                        <el-radio-group
                            size="small"
                            v-model="
                                dataTableStore.configTableColumnsVals[
                                    `${fetchUrl}__${column.key}__${row.key}`
                                ]
                            "
                        >
                            <el-radio-button value="left">
                                <i class="ri-contract-left-line"></i>
                            </el-radio-button>
                            <el-radio-button value="">
                                <i class="ri-pause-line"></i>
                            </el-radio-button>
                            <el-radio-button value="right">
                                <i class="ri-contract-right-line"></i>
                            </el-radio-button>
                        </el-radio-group>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <!-- <template #footer>
            <div class="text-left">
                <el-button type="primary" @click="submit">
                    保存
                </el-button>
            </div>
        </template> -->
    </ComDialogModal>
</template>
<script setup>
const dataTableStore = useDataTableStore();
const fetchUrl = inject("fetchUrl", "");
const fetchData = inject("fetchData", {});

// 表格数据
const tableData = computed(() => {
    return fetchData.value.columns.filter((column) => {
        // 只显示有 key 的列
        return column.key;
    });
});

// 显示状态
const visiable = ref(false);

// 打开
const open = () => {
    visiable.value = true;
};
// 关闭
// const close = () => {
//     visiable.value = false;
// };
defineExpose({
    open,
    //  close
});
</script>
