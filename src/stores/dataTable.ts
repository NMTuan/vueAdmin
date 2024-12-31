/*
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-09-05 05:57:18
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-10-28 11:06:28
 * @FilePath: \ProPayc:\project\vueAdmin\src\stores\dataTable.ts
 * @Description:
 *
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved.
 */
export const useDataTableStore = defineStore(
    "dataTable",
    () => {
        // 表格设定的表格列
        const configTableColumns = [
            {
                key: "key",
                label: "字段",
                props: {
                    // align: "right",
                },
            },
            {
                key: "hidden",
                label: "隐藏",
                props: {
                    align: "center",
                },
            },
            {
                key: "width",
                label: "宽度(px)",
                props: {
                    align: "center",
                    width: 100,
                },
            },
            {
                key: "align",
                label: "对齐方式",
                props: {
                    align: "center",
                    width: 150,
                },
            },
            {
                key: "fixed",
                label: "固定列",
                props: {
                    align: "center",
                    width: 150,
                },
            },
        ];
        // 表格设定的值
        const configTableColumnsVals = ref({});

        // 清理一些无用的值
        watch(
            configTableColumnsVals,
            (val) => {
                Object.keys(val).forEach((key) => {
                    if (
                        ["", false, undefined].includes(
                            configTableColumnsVals.value[key]
                        )
                    ) {
                        delete configTableColumnsVals.value[key];
                    }
                    if(key.split('__')[1] === 'align' && val[key] === 'left') {
                        delete configTableColumnsVals.value[key];
                    }
                });
            },
            {
                deep: true,
            }
        );
        return {
            configTableColumns,
            configTableColumnsVals,
        };
    },
    {
        persist: true,
    }
);
