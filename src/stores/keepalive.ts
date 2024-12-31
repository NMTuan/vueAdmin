/*
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-27 16:25:30
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-27 16:26:02
 * @FilePath: \vueAdmin\src\stores\keepalive.ts
 * @Description: 
 * 
 * TODO 由于使用 /:x* 捕获, 动态缓存可能不好实现, 后期再说.
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
 */
export const useKeepaliveStore = defineStore("keepalive", () => {
    const keepalive = ref([]);
    return {
        keepalive,
    };
});
