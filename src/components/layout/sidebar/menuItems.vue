<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-26 14:40:54
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-26 16:19:16
 * @FilePath: \vueAdmin\src\components\layout\sidebar\menuItems.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <template v-for="i in children" :key="i.label">
        <el-sub-menu v-if="i.children" :key="i.label" :index="i.name || i.key">
            <template #title>
                <div class="block w-4 h-4 mr-2 overflow-hidden">
                    <i v-if="i.icon" class="block w-4 h-4 mr-2" :class="i.icon"></i>
                </div>
                {{ i.label }}
            </template>
            <MenuItems :children="i.children" />
        </el-sub-menu>
        <el-menu-item v-else :index="i.name || i.key" @click="go(i)">
            <div class="block w-4 h-4 mr-2 overflow-hidden">
                <i v-if="i.icon" class="block w-4 h-4 mr-2" :class="i.icon"></i>
            </div>
            {{ i.label }}
        </el-menu-item>
    </template>
</template>
<script setup>
const router = useRouter()
const props = defineProps({
    children: {
        type: Array,
        required: true
    }
})
const go = (item) => {
    // 从router里找, 如果存在，则直接跳转
    const exits = router.hasRoute(item.name)
    if (exits) {
        router.push({ name: item.name })
        return
    }
    // 否则统一都跳转到 x
    router.push({ name: 'x', params: { x: item.name.split('-') } })
}
</script>
