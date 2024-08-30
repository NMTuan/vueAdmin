<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 10:52:14
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-30 14:38:40
 * @FilePath: \vueAdmin\src\components\com\comForm\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-form :data="modelValue" v-bind="formProps">
        <el-form-item
            v-for="field in fields"
            :label="field.label"
            :key="field.key"
            :class="[formProps.labelPosition !== 'top' ? 'mb-0 !mr-3' : '']"
        >
            <el-select
                v-if="field.component === 'select'"
                v-model="modelValue[field.key]"
                v-bind="field.props"
                class="min-w-16"
            >
                <el-option
                    v-for="option in field.options"
                    :key="option.value"
                    :label="option.label"
                    :value="option.value"
                >
                </el-option>
            </el-select>
            <el-input v-else v-model="modelValue[field.key]" />
        </el-form-item>
    </el-form>
</template>
<script setup>
const props = defineProps({
    // 表单数据
    modelValue: {
        type: Object,
        default: () => ({}),
    },
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
</script>
