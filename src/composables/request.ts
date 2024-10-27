/*
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-06-18 15:56:57
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-10-27 16:49:30
 * @FilePath: \ProPayc:\project\vueAdmin\src\composables\request.ts
 * @Description:
 *
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved.
 */
export interface Res {
    code: number;
    message: string;
    data: {
        [key: string]: any;
    };
}

const errors = {
    401: {
        message: "未授权",
        description: "Status:401，未授权，请联系管理员！",
    },
    404: {
        message: "页面不存在",
        description: "Status:404，页面不存在，请联系管理员！",
    },
    500: {
        message: "服务器错误",
        description: "Status:500，服务器内部错误，请联系管理员！",
    },
};

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        // 为请求头添加token
        const useToken = config.headers.useToken ?? true;
        if (useToken) {
            const token = localStorage.getItem("vueAdminToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        // 如果返回信息有message, 则显示
        if (response.data.message && !response.headers.mute) {
            ElMessage[response.data.code === 200 ? "success" : "error"]({
                message: response.data.message,
                // description: response.data.description || ''
            });
            // notification[response.data.code === 200 ? 'success' : 'error']({
            //   message: response.data.message,
            //   description: response.data.description || ''
            // })
        }
        return response;
    },
    (error) => {
        console.log("mute1", error);
        // console.log("mute2", error.response.headers.mute);
        if (error.response && !error.response.headers.mute) {
            const err = errors[error.response.status];
            if (err) {
                ElMessage.error(err.message);
                // notification.error(err)
            } else {
                // console.log('error', error.response.data)
                // console.log('error1', error.response.data.message)
                // console.log('error2', error.response.data.statusMessage)
                ElMessage.error(
                    `${error.response.status}: ${
                        error.response.data.message ||
                        "未知错误，请联系管理员！"
                    }`
                );
                // notification.error({
                //   message: '未知错误',
                //   description: `Status:${error.response.status}，未知错误，请联系管理员！`
                // })
            }
        }
        return Promise.reject(error.response);
    }
);

const get = async (path = "", params = {}, config = {}) => {
    return await new Promise((resolve, reject) => {
        axios({
            url: path,
            method: "get",
            params,
            ...config,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// const execGet = async (path = "", params = {}, config = {}) => {
//     const loading = ref(false);
//     const data = ref({});
//     const execute = async () => {
//         loading.value = true;
//         data.value = await new Promise((resolve, reject) => {
//             axios({
//                 url: path,
//                 method: "get",
//                 params,
//                 ...config,
//             })
//                 .then((res) => {
//                     resolve(res.data);
//                 })
//                 .catch((err) => {
//                     reject(err);
//                 })
//                 .finally(() => {
//                     loading.value = false;
//                 });
//         });
//     };

//     return { data, loading, execute };
// };

const post = async (path = "", data = {}, config = {}) => {
    return await new Promise((resolve, reject) => {
        axios({
            url: path,
            method: "post",
            data: data,
            ...config,
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

// const execPost = async (path = "", params = {}, config = {}) => {
//     const loading = ref(false);
//     const data = ref({});
//     const execute = async () => {
//         data.value = await new Promise((resolve, reject) => {
//             axios({
//                 url: path,
//                 method: "post",
//                 data: params,
//                 ...config,
//             })
//                 .then((res) => {
//                     resolve(res.data);
//                 })
//                 .catch((err) => {
//                     reject(err);
//                 })
//                 .finally(() => {
//                     loading.value = false;
//                 });
//         });
//     };
//     return { data, loading, execute };
// };

export default {
    get,
    // execGet,
    post,
    // execPost
};
