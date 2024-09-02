<template>
    <div class="flex items-center">
        <el-button
            v-if="!props?.position || props?.position === 'before'"
            link
            :type="type"
            @click="handleClick"
        >
            <template #icon>
                <i class="mr-3 text-lg" :class="icon"></i>
            </template>
        </el-button>
        {{ value }}
        <el-button
            v-if="props?.position === 'after'"
            link
            :type="type"
            @click="handleClick"
        >
            <template #icon>
                <i class="ml-3 text-lg" :class="icon"></i>
            </template>
        </el-button>
    </div>
</template>
<script setup>
const value = inject("value", "");
const props = inject("props", {});
const xx = inject("props", {});
const state = ref(false);
const type = computed(() => {
    if (state.value) {
        return "success";
    } else {
        return "info";
    }
});
const icon = computed(() => {
    if (state.value) {
        return "ri-check-line";
    } else {
        return "ri-file-copy-line";
    }
});
let dt;

const handleClick = () => {
    clearTimeout(dt);
    navigator.clipboard.writeText(value);
    state.value = true;
    dt = setTimeout(() => {
        state.value = false;
    }, 500);
};
</script>
