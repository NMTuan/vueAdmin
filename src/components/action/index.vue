<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-28 11:18:01
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-10-27 20:41:04
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\action\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div v-if="Object.keys(modelValue).length">
        <ComDialogModal
            :showType="modelValue.showType"
            :thisProps="thisProps"
            :closed="actionBack"
        >
            <div v-loading="loading" class="min-h-16">
                <ActionForm
                    ref="formEl"
                    v-if="modelValue.component === 'form'"
                    :fetchUrl="modelValue.fetchUrl"
                    :fetchParams="modelValue.fetchParams"
                />
                <ComTable
                    v-else-if="modelValue.component === 'dataTable'"
                    :fetchUrl="modelValue.fetchUrl"
                    :fetchParams="modelValue.fetchParams"
                />
                <div v-else>没有匹配的组件: {{ modelValue.component }}</div>
            </div>
            <template #footer>
                <div class="text-left">
                    <template v-if="modelValue.component === 'form'">
                        <el-button type="primary" @click="submit">
                            提交
                        </el-button>
                        <el-button text @click="actionBack">取消</el-button>
                    </template>
                </div>
            </template>
        </ComDialogModal>
    </div>
</template>
<script setup>
const modelValue = defineModel();
const thisProps = computed(() => {
    const vals = modelValue.value.showTypeProps || {};
    if (vals.title === undefined) {
        vals.title = modelValue.value.label;
    }
    vals.modelValue = true;
    vals.destroyOnClose = true;
    if (
        vals.closeOnClickModal === undefined &&
        vals["close-on-click-modal"] === undefined
    ) {
        vals.closeOnClickModal = !["form"].includes(modelValue.value.component);
    }
    if (
        vals.closeOnPressEscape === undefined &&
        vals["close-on-press-escape"] === undefined
    ) {
        vals.closeOnPressEscape = !["form"].includes(
            modelValue.value.component
        );
    }
    return vals;
});
const fetchList = inject("fetchList", []);
const fetchData = ref({});
provide("fetchData", fetchData);
const loading = ref(false);
const formEl = ref(null);

// 提交表单
const submit = () => {
    formEl.value.submit();
};
// 关闭 dialog 或者 slideover
const actionBack = (refresh = false) => {
    if (refresh === true) {
        fetchList();
    }
    modelValue.value = {};
};
provide("actionBack", actionBack);
</script>
