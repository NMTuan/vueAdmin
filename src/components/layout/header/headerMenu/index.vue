<template>
    <div class="flex">
        <template v-for="item in topbar">
            <HeaderMenuDropDown
                v-if="item.component === 'dropdown'"
                :item="item"
            />
            <HeaderMenuDarkMode
                v-else-if="item.component === 'darkMode'"
                :item="item"
            />
            <HeaderMenuFullScreen
                v-else-if="item.component === 'fullScreen'"
                :item="item"
            />
            <HeaderMenuI18n
                v-else-if="item.component === 'i18n'"
                :item="item"
            />
            <!-- <div v-else-if="item.component">{{ item.component }}</div> -->
            <HeaderMenuItem v-else :item="item" />
        </template>
    </div>
</template>

<script setup lang="ts">
const router = useRouter()
const userStore = useUserStore();
console.log("topbar", userStore.topbar);
const topbar = computed(() => {
    return userStore.topbar.map((item) => {
        if (typeof item === "string") {
            return {
                component: item,
            };
        } else {
            return item;
        }
    });
});
const logout = ()=>{
    ElMessageBox.confirm('您确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(() => {
        localStorage.removeItem('vueAdminToken');
        router.push('/login');
    }).catch(() => {
        console.log('取消退出');
    });
}
provide('logout', logout)
</script>
