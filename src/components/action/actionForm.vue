<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-28 11:50:50
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-30 11:18:11
 * @FilePath: \vueAdmin\src\components\action\actionForm.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-28 11:50:50
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-30 10:09:00
 * @FilePath: \vueAdmin\src\components\action\actionForm.vue
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
    <ComForm v-model="formData" :fields="fields" />
    <pre>formData: {{formData}}</pre>
</template>
<script setup>
const pageConfig = inject("pageConfig", {});
const rows = inject("selectedRows");
const currentAction = inject("currentAction", {});
const fetchData = inject("fetchData", {});
const actionBack = inject("actionBack", () => {});
const loading = ref(false);
const formData = ref({});
const fields = computed(() => {
    if (
        Array.isArray(fetchData.value.fields) &&
        fetchData.value.fields.length
    ) {
        return fetchData.value.fields;
    }
    // 从 formData 中获取
    return Object.keys(formData.value).map((key) => {
        return {
            key,
            label: key,
        };
    });
});

// 提交表单
const submit = () => {
    loading.value = true;
    const url = pageConfig.value.submitUrl || currentAction.value.path;
    request.post(url, formData.value).then((res) => {
        loading.value = false;
        if (res.code === 200) {
            ElMessage.success("操作成功");
            actionBack(true);
        } else {
            ElMessage.error(res.message);
        }
    });
};

// 监听 formData 变化, clone 一份给本地
watch(fetchData, (newVal) => {
    formData.value = JSON.parse(JSON.stringify(newVal.data));
});

defineExpose({
    submit
})
</script>
