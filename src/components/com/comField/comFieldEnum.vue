<template>
    <el-tag v-bind="thisProps">
        {{ showVal }}
    </el-tag>
</template>
<script setup>
const value = inject("value", "");
const config = inject("config", "");

const option = computed(() => {
    return config?.options?.find((option) => option.value.toString() === value.toString());
});

const showVal = computed(() => {
    return option.value?.label || value;
});

const thisProps = computed(() => {
    return option.value?.props || {};
});
</script>
