<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-09-06 05:58:10
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-06 06:28:07
 * @FilePath: \vueAdmin\src\components\com\comForm\comFormItem.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <ComFormSelect v-if="field.component === 'select'" />
    <ComFormDate v-else-if="field.component === 'date'" />
    <!-- 其它组件都用 input, 注意 input.type = field.component -->
    <ComFormInput v-else />
</template>
<script setup>
const props = defineProps({
    field: {
        type: Object,
        default: () => ({}),
    },
});
const field = computed(() => {
    return props.field;
});
provide("field", field);
</script>
