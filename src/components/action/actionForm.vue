<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-28 11:50:50
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-10-27 20:40:36
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\action\actionForm.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-alert
        v-if="rows.length > 1"
        title="批量编辑"
        description="不修改的请留空."
        :closable="false"
        type="warning"
    >
    </el-alert>
    <ComForm v-loading="loading" v-model="formData" :fields="fields" />
    <pre>formData: {{ formData }}</pre>
</template>
<script setup>
const rows = inject("selectedRows");
const actionBack = inject("actionBack", () => {});

const props = defineProps({
    fetchUrl: {
        type: String,
        default: "",
    },
    fetchType: {
        type: String,
        default: "get",
    },
    fetchParams: {
        type: Object,
        default: () => ({}),
    },
});
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
    loading.value = true;
    const res = await request.get(props.fetchUrl, props.fetchParams || {});
    loading.value = false;
    if (res.code === 200) {
        fetchData.value = res.data;
        if (res.data.data) {
            formData.value = JSON.parse(JSON.stringify(res.data.data));
        }
    }
};

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

    request
        .post(props.fetchUrl, formData.value, {
            params: props.fetchParams || {},
        })
        .then((res) => {
            if (res.code === 200) {
                actionBack(true);
            }
        })
        .finally(() => {
            loading.value = false;
        });
};

onMounted(() => {
    fetchRequest();
});

defineExpose({
    submit,
});
</script>
