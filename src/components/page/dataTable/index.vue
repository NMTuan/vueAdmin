<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 22:00:10
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-11-06 13:53:57
 * @FilePath: \vueAdmin\src\components\page\dataTable\index.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <ComTable :fetch="fetch" />
</template>

<script setup>
const pageConfig = inject('pageConfig', {})
const fetch = ref({
    url: pageConfig.value.path,
})
</script>
