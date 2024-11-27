<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-28 11:18:01
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-11-26 14:34:07
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
            <Echo>modelValue: {{ modelValue }}</Echo>
            <!-- <div class="min-h-16"> -->
            <ComTableActionForm
                ref="formEl"
                v-if="modelValue.component === 'form'"
                :fetch="modelValue.fetch"
                :submit="modelValue.submit"
            />
            <ComTable
                v-else-if="modelValue.component === 'dataTable'"
                :fetch="modelValue.fetch"
                :submit="modelValue.submit"
            />
            <ComTableActionConfirm
                v-else-if="modelValue.component === 'confirm'"
                v-bind="modelValue.confirmProps"
                :submit="modelValue.submit"
            />
            <div v-else>没有匹配的组件: {{ modelValue.component }}</div>
            <!-- </div> -->
            <template #footer>
                <template
                    v-if="['form', 'confirm'].includes(modelValue.component)"
                >
                    <el-button
                        text
                        @click="actionBack"
                        >取消</el-button
                    >
                    <el-button
                        type="primary"
                        @click="submit"
                        :loading="loading"
                    >
                        提交
                    </el-button>
                </template>
            </template>
        </ComDialogModal>
    </div>
</template>
<script setup>
const modelValue = defineModel();
// 构建对话框配置项
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
            modelValue.value.component,
        );
    }
    return vals;
});
// 刷新数据列表
const fetchList = inject("fetchList", []);
const formEl = ref(null);
const loading = ref(false);

// 提交表单
const submit = () => {
    if (modelValue.value.component === "confirm") {
        utils.submit(modelValue.value.submit, {}, loading).then((res) => {
            actionBack(true);
        });
    }
    if (modelValue.value.component === "form") {
        formEl.value.submit();
    }
};
// 关闭 dialog 或者 slideover
const actionBack = (refresh = false) => {
    if (refresh === true) {
        fetchList();
    }
    modelValue.value = {};
};
// todo 可以考虑改为传参
provide("actionBack", actionBack);
</script>
