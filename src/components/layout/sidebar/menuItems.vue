<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-26 14:40:54
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-27 14:45:03
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
                    <i v-if="i.icon" class="w-4 h-4 mr-2" :class="i.icon"></i>
                </div>
                {{ i.label }}
            </template>
            <MenuItems :children="i.children" />
        </el-sub-menu>
        <el-menu-item v-else :index="i.name || i.key" @click="handleClick(i)">
            <div class="block w-4 h-4 mr-2 overflow-hidden">
                <i v-if="i.icon" class="w-4 h-4 mr-2" :class="i.icon"></i>
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
const handleClick = (item) => {
    utils.go(item.name)
}
</script>
