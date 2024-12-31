<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 14:25:00
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-11-26 13:21:44
 * @FilePath: \vueAdmin\src\components\com\comTable\comTableAdvSearch.vue
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
            closeOnClickModal: false,
            closeOnPressEscape: false,
            destroyOnClose: true,
        }"
        :closed="() => (advSearchVisiable = false)"
    >
        <ComForm v-model="query" :fields="advSearchFields" />
        <template #footer>
            <div class="flex">
                <div class="flex-1 text-left">
                    <el-button type="primary" @click="submitAdvSarch">
                        提交
                    </el-button>
                    <el-button text @click="advSearchVisiable = false">
                        取消
                    </el-button>
                </div>
                <el-button @click="reset"> 重置 </el-button>
            </div>
        </template>
    </ComDialogModal>
</template>
<script setup>
const fetchData = defineModel("fetchData", {
    type: Object,
    default: () => ({}),
});
const query = defineModel("query", {
    type: Object,
    default: () => ({}),
});
const fetchList = inject("fetchList", () => {});
const handleReset = inject("handleReset", () => {});

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

// 重置搜索
const reset = () => {
    handleReset();
    advSearchVisiable.value = false;
};

// 打开
const open = () => {
    advSearchVisiable.value = true;
};

defineExpose({
    open,
});
</script>
