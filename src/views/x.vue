<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 17:59:05
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-27 16:32:28
 * @FilePath: \vueAdmin\src\views\x.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 17:59:05
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-26 12:00:57
 * @FilePath: \vueAdmin\src\views\x.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
  <Layout>
    test currentMenu: {{ currentMenu }}
    <!-- 渲染当前页面约定的组件 -->
    <div class="p-10 bg-red-500">
        <component :is="component" />
    </div>
  </Layout>
</template>

<script setup lang="ts">
import PageBlank from '@/components/page/blank.vue'
import PageDataTable from '@/components/page/dataTable/index.vue'
import PageIndex from '@/components/page/index.vue'

const route = useRoute()
const userStore = useUserStore()
const currentMenu = computed(() => {
  if (!Array.isArray(route.params.x)) {
    return false
  }
  return userStore.menuFlat.find((item) => item.name === route.params.x.join('-'))
})
const componentList = {
  dataTable: PageDataTable,
  index: PageIndex
}
// 渲染当前页面约定的组件, 没找到则渲染blank组件
const component = computed(() => {
  return currentMenu.value?.component ? componentList[currentMenu.value.component] : PageBlank
})
</script>

<style scoped></style>
