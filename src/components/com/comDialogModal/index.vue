<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-30 14:49:10
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-03 06:09:52
 * @FilePath: \vueAdmin\src\components\com\comDialogModal\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div>
        <el-drawer
            v-if="['drawer', 'slideover'].includes(showType)"
            v-bind="thisProps"
            append-to-body
            @closed="closed"
        >
            <slot />
            <template #footer>
                <slot name="footer" />
            </template>
        </el-drawer>
        <el-dialog v-else v-bind="thisProps" append-to-body @closed="closed">
            <slot />
            <template #footer>
                <slot name="footer" />
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
const props = defineProps({
    showType: {
        type: String,
        default: "dialog",
    },
    thisProps: {
        type: Object,
        default: () => ({
            title: "",
            modelValue: true,
            destroyOnClose: true,
            // closeOnCLickModal: true,
            // closeOnPressEscape: true
        }),
    },
    closed: {
        type: Function,
        default: () => {},
    },
});
</script>
