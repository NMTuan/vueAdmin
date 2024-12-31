/*
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-12-13 11:38:24
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-12-14 18:54:43
 * @FilePath: \ProPayc:\project\vueAdmin\src\composables\utils\handleParams.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 处理api返回的key[], 从data中取出对应的值, 返回对象
// 注意, key[]中可能是string可能是object, 如果是string则从data中取出对应的值, 如果是object则直接返回
export default (
    keyArray: (string | Record<string, any>)[] | Record<string, any>,
    data: Record<string, any> | Record<string, any>[] | undefined,
) => {
    keyArray = unref(keyArray) || [];
    data = unref(data) || {};
    if (Array.isArray(keyArray)) {
        return keyArray.reduce((res: Record<string, any>, key) => {
            // 固定参数, 直接返回
            if (typeof key === "object" && key !== null) {
                return {
                    ...res,
                    ...key,
                };
            }
            // todo 动态参数的别名模式 alias [key, aliasKey]
            // 动态参数
            if (typeof key === "string") {
                // 处理多条数据
                if (Array.isArray(data)) {
                    return {
                        ...res,
                        [key]: data.map((item) => utils.getNestedValue(item, key)).join(","),
                    };
                }
                return {
                    ...res,
                    [key]: utils.getNestedValue(data, key),
                };
            }

            return res;
        }, {} as Record<string, any>);
    }
    // 如果是对象, 则不处理直接返回.
    if (typeof keyArray === "object" && keyArray !== null) {
        return keyArray;
    }
    return {};
};
