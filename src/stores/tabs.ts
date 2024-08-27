export const useTabsStore = defineStore("tabs", () => {
    const userStore = useUserStore();
    const route = useRoute();
    const tabs = ref([]);
    const activeName = ref("");
    // const userStore = useUserStore()

    // 添加
    const add = (name: string, switchTo: boolean = false) => {
        if (!name) {
            return;
        }
        // 切换 tabs 高亮项
        if (switchTo) {
            activeName.value = name;
        }

        // 根据 name 找 menu
        const menu = userStore.menuFlat.find((item) => item.name === name);
        if (!menu) {
            return;
        }
        // 是否存在
        const exits = tabs.value.find((item) => item.name === menu.name);
        if (exits) {
            return;
        }
        tabs.value.push(menu);
    };

    // 删除
    const remove = (name: string) => {
        // 当前关闭 tab 的 index
        const index = tabs.value.findIndex((item) => {
            return item.name === name;
        });

        // 删除
        tabs.value = tabs.value.filter((item) => {
            return item.name !== name;
        });

        // 判断关闭的 tab 是不是当前访问的页面
        if (name === route.path.slice(1).replaceAll("/", "-")) {
            // 没标签了, 打开首页
            if (tabs.value.length === 0) {
                utils.go("index");
            } else {
                // 否则去前一个
                utils.go(tabs.value[index === 0 ? 0 : index - 1].name);
            }
        }
    };

    return {
        tabs,
        activeName,

        add,
        remove,
    };
});
