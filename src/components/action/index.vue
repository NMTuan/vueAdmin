<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-28 11:18:01
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-29 21:46:02
 * @FilePath: \vueAdmin\src\components\action\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div v-if="Object.keys(modelValue).length">
        <el-dialog
            v-if="!modelValue.showType || modelValue.showType === 'dialog'"
            v-bind="thisProps"
            @closed="actionBack"
        >
            <div v-loading="loading" class="min-h-16">
                <ActionForm v-if="modelValue.component === 'form'" />
                <div v-else>没有匹配的组件</div>
            </div>
            <hr />
            <pre>{{ modelValue }}</pre>
            <hr />
            <pre>{{ rows }}</pre>
            <div v-for="i in 100">{{ i }}</div>
        </el-dialog>
    </div>
</template>
<script setup>
const route = useRoute();
const props = defineProps({
    // 操作的配置
    modelValue: {
        type: Object,
        default: () => ({}),
    },
});
const emits = defineEmits(["update:modelValue"]);
const currentAction = inject("currentAction", {});
// 注意, 这里是多条数据
const rows = inject("selectedRows");
const thisProps = computed(() => {
    const vals = props.modelValue.showTypeProps || {};
    if (vals.title === undefined) {
        vals.title = props.modelValue.label;
    }
    vals.modelValue = true;
    vals.destroyOnClose = true;
    if (
        vals.closeOnClickModal === undefined &&
        vals["close-on-click-modal"] === undefined
    ) {
        vals.closeOnClickModal = !["form"].includes(props.modelValue.component);
    }
    if (
        vals.closeOnPressEscape === undefined &&
        vals["close-on-press-escape"] === undefined
    ) {
        vals.closeOnPressEscape = !["form"].includes(
            props.modelValue.component
        );
    }
    return vals;
});
const fetchList = inject('fetchList', [])
const fetchData = ref({});
provide("fetchData", fetchData);
const loading = ref(false);

// 关闭 dialog 或者 slideover
const actionBack = (refresh = false) => {
    if(refresh === true){
        fetchList();
    }
    emits("update:modelValue", {});
};
provide("actionBack", actionBack);

// 获取数据
const fetch = async () => {
    const url = props.modelValue.fetchUrl || currentAction.value.path;
    const method = props.modelValue.fetchType || "get";
    const query = {};
    if (Array.isArray(props.modelValue.query)) {
        props.modelValue.query.forEach((key) => {
            const vals = [];
            rows.value.forEach((row) => {
                vals.push(row[key]);
            });
            query[key] = vals.join(",");
        });
    }

    loading.value = true;
    const res = await request[method](url, {
        ...query,
        ...(props.modelValue.params || {}),
    });

    loading.value = false;
    if (res.code === 200) {
        fetchData.value = res.data;
    }
};

// 自动获取
if (
    Object.keys(props.modelValue).length &&
    !props.modelValue.autoFetch !== false
) {
    fetch();
}
</script>
