<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-09-06 11:54:55
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-09-11 13:49:53
 * @FilePath: \vueAdmin\src\components\layout\header\headerMenu\headerMenuDropDown.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <el-dropdown>
        <HeaderMenuItem :item="item">
            <i class="ri-arrow-down-s-line ml-2"></i>
        </HeaderMenuItem>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                    v-for="menu in item.dropDown"
                    @click="handleClick(menu)"
                >
                    <i :class="menu.icon" v-if="menu.icon" class="mr-2"></i>
                    {{ menu.label }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script setup>
const router = useRouter();
const props = defineProps({
    item: Object,
    default: () => {},
});
const logout = inject("logout");
const handleClick = (item) => {
    if (item.component === "logout") {
        logout();
    } else if(item.to) {
        router.push({ path: item.to });
    }
};
</script>
