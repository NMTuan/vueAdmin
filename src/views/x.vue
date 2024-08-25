<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 17:59:05
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-25 22:20:52
 * @FilePath: \vueAdmin\src\views\x.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
  <Layout>
    <!-- 渲染当前页面约定的组件 -->
    <component :is="component"/>
  </Layout>
</template>

<script setup lang="ts">
import PageBlank from '@/components/page/blank.vue'
import PageDataTable from '@/components/page/dataTable/index.vue'

const route = useRoute()
const userStore = useUserStore()
const currentMenu = computed(() => {
  return userStore.menuFlat.find((item) => item.path === route.params.x.join('-'))
})
const componentList = {
    dataTable: PageDataTable
}
// 渲染当前页面约定的组件, 没找到则渲染blank组件
const component = computed(() => {
    return componentList[currentMenu.value.component] || PageBlank
})
</script>

<style scoped></style>
