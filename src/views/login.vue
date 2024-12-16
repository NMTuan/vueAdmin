<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 18:06:50
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-12-16 13:31:23
 * @FilePath: \ProPayAdmin\src\views\login.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div class="flex flex-col justify-center items-center h-screen bg-zinc-100">
        <div class="-mt-12 mb-12">
            <img
                src="/favicon-96x96.png"
                alt=""
            />
        </div>
        <div class="bg-white shadow-sm rounded p-12">
            <div class="mb-6 text-center">
                <p class="text-3xl text-zinc-800 mb-6">欢迎登录</p>
                <p class="text-zinc-500 mb-6 text-sm">
                    『零』前端开发的数据管理后台
                </p>
            </div>
            <div class="w-320px mx-auto">
                <el-form
                    ref="formRef"
                    size="large"
                    :model="formData"
                    :rules="rules"
                    @submit.prevent="login"
                >
                    <el-form-item
                        label=""
                        prop="username"
                    >
                        <el-input
                            v-model="formData.username"
                            placeholder="请输入用户名"
                        >
                            <template #prefix>
                                <i class="ri-user-line"></i>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item
                        label=""
                        prop="password"
                    >
                        <el-input
                            v-model="formData.password"
                            placeholder="请输入密码"
                            type="password"
                            show-password
                            @keyup.enter="login"
                        >
                            <template #prefix>
                                <i class="ri-lock-line"></i>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox
                            v-model="formData.remember"
                            label="记住密码"
                        >
                            记住密码
                        </el-checkbox>
                    </el-form-item>

                    <el-form-item>
                        <!-- TODO 加 loading -->
                        <el-button
                            class="w-full"
                            type="primary"
                            @click="login"
                            :loading="loading"
                        >
                            登 录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const loading = ref(false);
const formRef = ref(null);
const formData = ref({
    username: "",
    password: "",
    remember: false,
});

const rules = ref({
    username: [{ required: true, message: "请输入用户名" }],
    password: [{ required: true, message: "请输入密码" }],
});

const login = async () => {
    if (!formRef.value) {
        return;
    }
    formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            await useUserStore().login(formData.value, loading);
        }
    });
};
</script>

<style scoped></style>
