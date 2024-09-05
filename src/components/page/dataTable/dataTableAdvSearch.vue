<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 14:25:00
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-04 06:23:01
 * @FilePath: \vueAdmin\src\components\page\dataTable\dataTableAdvSearch.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <ComDialogModal
        showType="slideover"
        :thisProps="{
            title: '高级搜索',
            modelValue: advSearchVisiable,
            closeOnClickModal: true,
            closeOnPressEscape: true,
            destroyOnClose: true,
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
</template>
<script setup>
const fetchData = inject("fetchData", {});
const query = inject("query", {});
const fetchList = inject("fetchList", () => {});

// 高级搜索对话框的显示状态
const advSearchVisiable = ref(false);
const advSearchFields = computed(() => {
    return fetchData.value.advSearch || null;
});

// 提交高级搜索
const submitAdvSarch = () => {
    advSearchVisiable.value = false;
    fetchList();
};

// 打开
const open = () => {
    advSearchVisiable.value = true;
};
// 关闭
// const close = () => {
//     advSearchVisiable.value = false;
// };
defineExpose({
    open,
    //  close
});
</script>
