// 提交操作
// params 是 get 参数, 同 axios
// data 是 post 参数, 同 axios
// submitData 是提交的数据
export default ({ url, params, data, config }, submitData, loading) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            return reject("submit url is required");
        }
        const fetchMethod = "post";
        const fetchQuery = {
            ...unref(params),
        };
        const fetchBody = {
            ...unref(data),
            ...unref(submitData),
        };
        const fetchConfig = { params: fetchQuery, ...unref(config) };
        loading.value = true;
        request[fetchMethod](url, fetchBody, fetchConfig)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            })
            .finally(() => {
                loading.value = false;
            });
    });
};
