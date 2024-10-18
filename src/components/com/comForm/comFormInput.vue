<template>
    <el-input :type="field.component" v-model="formData[field.key]" />
</template>
<script setup>
const field = inject("field", {});
const formData = inject("formData", {});
</script>
