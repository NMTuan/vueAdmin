<template>
    <el-select
        v-model="formData[field.key]"
        v-bind="field.props"
        class="min-w-16 flex-1"
        :suffix-icon="SuffixIcon"
        :disabled="loading"
    >
        <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
        >
        </el-option>
    </el-select>
</template>
<script setup>
import { ArrowDown } from "@element-plus/icons-vue";

const field = inject("field", {});
const formData = inject("formData", {});

const options = ref([]);

const loading = ref(false);
const fetchOptions = async () => {
    if (!field.value.fetchOptions.url) {
        return;
    }

    // 处理查询参数
    let query = {};
    let body = {};
    // params参数 固定写死的参数, 会同时合并到 get 和 body 参数中
    if (field.value.fetchOptions.params) {
        query = {
            ...query,
            ...field.value.fetchOptions.params,
        };
        if (field.value.fetchOptions?.method.toLowerCase() === "post") {
            body = {
                ...body,
                ...field.value.fetchOptions.params,
            };
        }
    }
    // TODO 处理传递过来的参数 query body
    // query参数 key[] 去 formData中找value, get参数
    // body参数 key[] 去 formData中找value, post参数
    // 注意, 如果是formData中找参数, 需要增加watch处理, 当参数改变时重新发起请求
    // if (
    //     Array.isArray(field.value.fetchOptions.query) &&
    //     field.value.fetchOptions.query.length
    // ) {
    //     field.value.fetchOptions.query.forEach((key) => {
    //         params[key] = formData.value[key];
    //     });
    // }

    loading.value = true;
    const res = await request[
        field.value.fetchOptions?.method.toLowerCase() || "get"
    ](
        field.value.fetchOptions.url,
        {},
        {
            params: query,
            body,
        }
    );
    loading.value = false;
    if (res.code === 200 && Array.isArray(res.data.rows)) {
        res.data.rows.map((row) => {
            options.value.push({
                value: row[field.value.fetchOptions.valueKey || "value"],
                label: row[field.value.fetchOptions.labelKey || "label"],
            });
        });
    }
};

// 图标
const SuffixIcon = computed(() => {
    if (loading.value) {
        return h("div", { class: "ri-loader-line animate-spin" });
    } else {
        return ArrowDown;
    }
});

onMounted(async () => {
    // 已经设定的 options
    if (Array.isArray(field.value.options)) {
        options.value = [...options.value, ...field.value.options];
    }

    // 需要异步拉取 options
    if (field.value.fetchOptions?.url) {
        await fetchOptions();
    }
});
</script>
