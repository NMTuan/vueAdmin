<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-27 16:57:06
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-12-17 13:49:27
 * @FilePath: \ProPayc:\project\vueAdmin\src\components\layout\logo.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 -->
<template>
    <div
        class="bg-white h-16 text-center text-xl font-bold flex items-center justify-center"
    >
        <img
            v-if="userStore.site.logo"
            :src="userStore.site.logo"
            alt=""
            class="w-10 h-10"
        />
        <span
            v-if="userStore.site.title"
            class="ml-2"
        >
            {{ userStore.site.title }}
        </span>
    </div>
</template>
<script setup>
const userStore = useUserStore();
</script>
