<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 10:52:14
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-06 06:16:17
 * @FilePath: \vueAdmin\src\components\com\comForm\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-form :data="formData" v-bind="formProps">
        <el-form-item
            v-for="field in fields"
            :label="field.label"
            :key="field.key"
            :class="[formProps.labelPosition !== 'top' ? 'mb-0 !mr-3' : '']"
        >
            <ComFormItem :field="field" />
        </el-form-item>
    </el-form>
</template>
<script setup>
const props = defineProps({
    // 表单数据
    // modelValue: {
    //     type: Object,
    //     default: () => ({}),
    // },
    // 表单字段
    fields: {
        type: Array,
        default: () => [],
    },
    // el-form 的配置
    formProps: {
        type: Object,
        default: () => ({
            labelPosition: "top",
            labelWidth: "auto",
        }),
    },
});

const formData = defineModel();
provide("formData", formData);
</script>
