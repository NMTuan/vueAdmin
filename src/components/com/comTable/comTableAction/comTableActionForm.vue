<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-28 11:50:50
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-11-25 14:48:31
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\action\actionForm.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-alert v-if="rows.length > 1" title="批量编辑" description="不修改的请留空." :closable="false" type="warning">
    </el-alert>
    <ComForm v-loading="loading" v-model="formData" :fields="fields" />
    <Echo>formData: {{ formData }}</Echo>
    <hr />
    <Echo>fetch: {{ fetch }}</Echo>
    <hr />
    <Echo>submit: {{ submitConfig }}</Echo>

</template>
<script setup>
const rows = inject("selectedRows");
const actionBack = inject("actionBack", () => { });

const props = defineProps({
    fetch: {
        type: Object,
        default: () => ({}),
    },
    submit: {
        type: Object,
        default: () => ({
            method: "POST",
        }),
    },
});
console.log("props", props);
// 异步拉取的数据
const fetchData = ref({});
// 表单数据
const formData = ref({});
const loading = ref(false);

// 表单项
const fields = computed(() => {
    // 如果返回了, 直接用
    if (
        Array.isArray(fetchData.value.fields) &&
        fetchData.value.fields.length
    ) {
        return fetchData.value.fields;
    }
    // 否则从 formData 中获取
    return Object.keys(formData.value).map((key) => {
        return {
            key,
            label: key,
        };
    });
});

// 异步拉取表单
const fetchRequest = async () => {
    const res = await utils.fetch(props.fetch, loading);
    fetchData.value = res.data;
    if (res.data.data) {
        formData.value = res.data.data;
    }
};

// 表单提交配置
const submitConfig = computed(() => {
    return {
        ...props.fetch,
        ...props.submit,
    };
});

// 提交表单
const submit = () => {
    loading.value = true;

    // 处理formData数据类型
    fields.value.forEach((field) => {
        if (field.fieldType === "number") {
            formData.value[field.key] = Number(
                formData.value[field.key] ?? "0"
            );
        }
    });

    utils.submit(submitConfig.value, formData.value, loading).then((res) => {
        if (res.code === 200) {
            actionBack(true);
        }
    });
};

onMounted(() => {
    fetchRequest();
});

defineExpose({
    submit,
});
</script>
