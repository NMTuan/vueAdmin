<template>
    <el-form
        :data="formData"
        label-width="auto"
        class="p-4"
    >
        <el-form-item
            v-for="field in fields"
            :label="field.label"
            :key="field.key"
        >
            <el-input v-model="formData[field.key]" />
        </el-form-item>
        <el-form-item label=" ">
            <el-button :loading="loading" type="primary" @click="submit">提交</el-button>
            <el-button text @click="actionBack">取消</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup>
const pageConfig = inject("pageConfig", {});
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
            actionBack();
        } else {
        }
    });
};

// 监听 formData 变化, clone 一份给本地
watch(fetchData, (newVal) => {
    formData.value = JSON.parse(JSON.stringify(newVal.data));
});
</script>
