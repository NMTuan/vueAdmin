<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-26 21:31:14
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-26 22:53:33
 * @FilePath: \vueAdmin\src\components\layout\tabs\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div class="bg-white shadow">
        <el-tabs
            class="w-full mb-0"
            v-model="tabsStore.activeName"
            @tab-click="handleClick"
        >
            <el-tab-pane
                v-for="item in tabsStore.tabs"
                :label="item.label"
                :name="item.name"
            >
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script setup>
const tabsStore = useTabsStore();
const router = useRouter();
const route = useRoute()

const handleClick = (item) => {
    go({ name: item.paneName });
};

watch(route, (val)=>{
   console.log('watch route', val) 
})

// TODO 抽离
const go = (item) => {
    // 从router里找, 如果存在，则直接跳转
    const exits = router.hasRoute(item.name);
    if (exits) {
        router.push({ name: item.name });
        return;
    }
    // 否则统一都跳转到 x
    router.push({ name: "x", params: { x: item.name.split("-") } });
};
</script>
<style lang="scss" scoped>
:deep(.el-tabs) {
    @apply;
    .el-tabs__header {
        @apply mb-0;
    }
    .el-tabs__nav-wrap {
        &:after {
            @apply w-0;
        }
    }
    .el-tabs__item {
        @apply p-0 mx-5;
    }
}
</style>
