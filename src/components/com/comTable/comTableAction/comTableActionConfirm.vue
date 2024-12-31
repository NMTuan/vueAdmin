<template>
    <div class="flex items-center">
        {{ message }}
    </div>
</template>
<script setup>
const props = defineProps({
    message: {
        type: String,
        default: "",
    },
    // submit: {
    //     type: Object,
    //     default: () => ({}),
    // },
});
</script>
