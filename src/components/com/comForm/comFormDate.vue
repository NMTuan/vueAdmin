<template>
    <el-date-picker
        class="!w-full"
        v-model="formData[field.key]"
        type="date"
        placeholder="Pick a day"
        v-bind="field.props"
    />
</template>
<script setup>
const field = inject("field", {});
const formData = inject("formData", {});

</script>
