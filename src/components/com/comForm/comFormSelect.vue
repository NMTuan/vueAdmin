<template>
    <el-select
        v-model="formData[field.key]"
        v-bind="field.props"
        class="min-w-16"
    >
        <el-option
            v-for="option in field.options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
        >
        </el-option>
    </el-select>
</template>
<script setup>
const field = inject('field', {})
const formData = inject('formData', {})
</script>