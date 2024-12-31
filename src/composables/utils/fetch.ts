/*
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-11-05 15:52:08
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-12-13 13:41:26
 * @FilePath: \vueAdmin\src\composables\utils\fetchRequest.ts
 * @Description: 拉取数据
 *
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved.
 */
export default ({ url, params, config }, loading) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            return reject("fetch url is required");
        }
        const fetchMethod = "get";
        const fetchParams = { ...unref(params) };
        const fetchConfig = unref(config);
        loading.value = true;
        request[fetchMethod](url, fetchParams, fetchConfig)
            .then((res) => {
                if (res.code !== 200) {
                    return reject(res);
                }
                return resolve(res);
            })
            .catch((err) => {
                return inject(err);
            })
            .finally(() => {
                loading.value = false;
            });
    });
};
