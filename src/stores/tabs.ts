export const useTabsStore = defineStore("tabs", () => {
    const userStore = useUserStore();
    const router = useRouter();
    const tabs = ref([]);
    const activeName = ref("");
    // const userStore = useUserStore()

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

    return {
        tabs,
        activeName,

        add,
    };
});
