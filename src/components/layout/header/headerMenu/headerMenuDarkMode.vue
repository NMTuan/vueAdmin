<template>
    <HeaderMenuItem :item="config" @click="handleClick">
        {{ item.components }}
    </HeaderMenuItem>
</template>
<script setup>
const props = defineProps({
    item: {
        type: Object,
        default: () => ({}),
    },
});
// 默认图标
const defaultIcons = computed(()=>{
    return {
        light: props.item.icon || "ri-sun-line",
        dark: props.item.activeIcon || "ri-moon-line",
    }
})
const isDarkMode = ref(false);

const config = computed(() => {
    return {
        icon: isDarkMode.value
            ? defaultIcons.value.dark
            : defaultIcons.value.light,
        // ...props.item,
    };
});

// 检查本地模式
const checkDarkMode = () => {
    const userSet = localStorage.getItem("vueAdminDarkMode");
    if(userSet !== null){
        return userSet === "true";
    }
    // 返回浏览器设定的模式
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

// 点击切换
const handleClick = () => {
    localStorage.setItem("vueAdminDarkMode", !isDarkMode.value);
    isDarkMode.value = !isDarkMode.value;
};

// 执行
isDarkMode.value = checkDarkMode();

// 监听
watch(isDarkMode, (newVal) => {
    document.documentElement.classList.toggle("dark", newVal);
    document.documentElement.setAttribute("data-theme", newVal ? "dark" : "");
}, {
    immediate: true,
});
</script>
