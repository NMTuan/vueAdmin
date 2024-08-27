/*
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-27 13:48:37
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-27 14:49:32
 * @FilePath: \vueAdmin\src\composables\utils\go.ts
 * @Description:
 *
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved.
 */
import router from "@/router";
export default (name: string) => {
    // 从router里找, 如果存在，则直接跳转
    const exits = router.hasRoute(name);
    if (exits) {
        router.push({ name });
        return;
    }
    // 否则统一都跳转到 x
    router.push({ name: "x", params: { x: name.split("-") } });
};
