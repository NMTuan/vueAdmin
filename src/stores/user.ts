import type { Res } from "@/composables/request";

export const useUserStore = defineStore("user", () => {
    const router = useRouter();
    const user = ref({
        id: "",
        name: "",
        menu: [],
        topbar: [],
        notice: "",
        site: {
            title: "",
            logo: "",
        },
    });
    const site = computed(() => {
        return user.value.site;
    });
    const token = ref("");
    if (localStorage.getItem("vueAdminToken")) {
        token.value = localStorage.getItem("vueAdminToken") as string;
    }

    // 不需要权限的路由
    const noAuthlist = ref(["login", "404"]);

    // {label, key, icon, children, component, actions}
    const menu = computed(() => {
        return user.value.menu || [];
    });

    // {path, name,
    // label, key, icon, children, component, actions}
    const menuFlat = computed(() => {
        const flat = (arr: any, name: string = "") => {
            if (
                Array.isArray(arr) ||
                (arr &&
                    typeof arr === "object" &&
                    "value" in arr &&
                    Array.isArray(arr.value))
            ) {
                const targetArr = Array.isArray(arr) ? arr : arr.value;
                return targetArr.reduce(
                    (acc: any[], curr: any, index: number) => {
                        // curr.x = name ? `${name}-${clone.key}` : clone.key
                        const clone = JSON.parse(JSON.stringify(curr));
                        delete clone.children;
                        clone.name = name ? `${name}-${clone.key}` : clone.key;
                        clone.path = `/${clone.name.replaceAll("-", "/")}`;
                        // 给原始 menu item 也增加 name, 方便查找
                        arr[index].name = clone.name;
                        acc.push(clone);
                        if (curr.children) {
                            acc.push(...flat(curr.children, clone.name));
                        }
                        return acc;
                    },
                    [],
                );
            }
            return [];
        };
        return flat(menu.value);
    });

    // 登录
    const login = async (formData: any, loading: Ref<boolean>) => {
        loading.value = true;
        const res = (await request.post("/auth/login", formData, {
            headers: {
                useToken: false,
            },
        })) as Res;
        if (res.code !== 200) {
            loading.value = false;
            return;
        }
        token.value = res.data.token;
        localStorage.setItem("vueAdminToken", token.value);
        if (token.value) {
            const res = (await checkUserInfo(false)) as Res;
            if (!res) {
                return;
            }
            router.push("/");
        }
    };

    // 异步拉取用户信息
    const checkUserInfo = async (mute: boolean = true) => {
        if (!token.value) {
            return false;
        }
        return new Promise((resolve, reject) => {
            if (user.value.id || user.value.name || user.value.menu.length) {
                resolve(true);
                return;
            }
            request
                .get(
                    "/auth/info",
                    {},
                    {
                        headers: {
                            mute: mute,
                        },
                    },
                )
                .then((res) => {
                    user.value = res.data;
                    resolve(true);
                })
                .catch((err) => {
                    resolve(false);
                });
        });
    };

    // 比对是否有权限
    const checkAuth = (path: string) => {
        if (noAuthlist.value.includes(path)) {
            return true;
        }
        return menuFlat.value.some((item: any) => item.name === path);
    };

    // topbar
    const topbar = computed(() => {
        return user.value.topbar || [];
    });
    return {
        user,
        site,
        menu,
        menuFlat,
        topbar,
        login,
        checkAuth,
        checkUserInfo,
    };
});
