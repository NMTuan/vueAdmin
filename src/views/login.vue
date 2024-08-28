<!--
 * @Author: nmtuan nmtuan@qq.com
 * @Date: 2024-08-25 18:06:50
 * @LastEditors: nmtuan nmtuan@qq.com
 * @LastEditTime: 2024-08-25 22:46:35
 * @FilePath: \vueAdmin\src\views\login.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by nmtuan@qq.com, All Rights Reserved. 
-->
<template>
    <div>
        <el-form
            ref="formRef"
            :model="formData"
            :rules="rules"
            @submit.prevent="login"
        >
            <el-form-item label="用户名" prop="username">
                <el-input
                    v-model="formData.username"
                    placeholder="请输入用户名"
                />
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input
                    v-model="formData.password"
                    placeholder="请输入密码"
                    type="password"
                    @keyup.enter="login"
                />
            </el-form-item>

            <el-form-item>
                <!-- TODO 加 loading -->
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
const formRef = ref(null);
const formData = ref({
    username: "111111",
    password: "222222",
});

const rules = ref({
    username: [
        { required: true, message: "请输入用户名" },
        { min: 6, max: 18, message: "用户名长度在6到18个字符" },
    ],
    password: [
        { required: true, message: "请输入密码" },
        { min: 6, max: 18, message: "密码长度在6到18个字符" },
    ],
});

const login = async () => {
    console.log("login", formData.value);
    if (!formRef.value) {
        return;
    }
    formRef.value.validate(async (valid: boolean) => {
        if (valid) {
            await useUserStore().login(formData.value);
        }
    });
};
</script>

<style scoped></style>
