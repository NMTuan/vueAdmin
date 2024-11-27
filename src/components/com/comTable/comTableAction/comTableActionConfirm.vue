<template>
        <div class="flex items-center">
            <!-- <div class="mr-1" :class="icon"></div> -->
            {{ message }}
            </div>
</template>
<script setup>
const props = defineProps({
    message: {
        type: String,
        default: "",
    },
    // icon: {
    //     type: String,
    //     default: "",
    // },
    submit: {
        type: Object,
        default: () => ({}),
    },
});
</script>
