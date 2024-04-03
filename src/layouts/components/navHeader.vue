<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

import dayIcon from '@/assets/svg/day.svg?component'
import darkIcon from '@/assets/svg/dark.svg?component'
import { isDark } from '@/composables'
import login from './user/login.vue'
import rolePermission from '@/components/rolePermission.vue'
import { isLoggedIn, checkAuthStatus } from '@/utils/auth'
import { useUserStoreHook } from '@/store/modules/user'

const errorHandler = () => true
const activeIndex = ref('')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const centerDialogVisible = ref(false)
onBeforeMount(() => {
  checkAuthStatus()
})
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    :ellipsis="false"
    menu-trigger="hover"
    :unique-opened="true"
    :router="true"
    @select="handleSelect"
    ><el-menu-item index="/">
      <template #title>
        <div class="flex items-center py-2 dark:hidden">
          <img src="@/assets/images/KDLWord1.png" class="h-8" />
          <img src="@/assets/images/KDLLogo1.png" class="h-4 pr-5" />
          <img src="@/assets/images/ncuLogo.png" class="h-10" />
        </div>
        <div class="items-center hidden py-2 dark:visible dark:flex">
          <img src="@/assets/images/KDLWord.png" class="h-8" />
          <img src="@/assets/images/KDLLogo.png" class="h-4 pr-5" />
          <img src="@/assets/images/ncuLogo1.png" class="h-10" />
        </div>
      </template>
    </el-menu-item>

    <div class="flex-grow" />
    <role-permission :value="['doctor']">
      <el-menu-item index="/image">医学影像</el-menu-item>
    </role-permission>
    <role-permission :value="['doctor']"
      ><el-menu-item index="/model">算法模型</el-menu-item></role-permission
    >
    <role-permission :value="['doctor']">
      <el-menu-item index="/patient">患者详情</el-menu-item></role-permission
    >
    <el-sub-menu index="2">
      <template #title>设置</template>
      <el-menu-item index="2-1">关于</el-menu-item>
      <el-menu-item index="2-2">帮助</el-menu-item>
      <el-menu-item index="2-3">问题反馈</el-menu-item>
    </el-sub-menu>

    <div style="display: flex" class="mx-5">
      <el-switch
        style="margin: auto"
        v-model="isDark"
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
      />
    </div>

    <el-sub-menu index="3" v-if="isLoggedIn === true">
      <template #title
        ><el-avatar style="margin: auto" :size="30" src="https://empty" @error="errorHandler">
          <img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
          /> </el-avatar
      ></template>
      <el-menu-item index="/user">个人中心</el-menu-item>
      <el-menu-item index="3-2">锁定屏幕</el-menu-item>
      <el-menu-item index="3-3" @click="useUserStoreHook().logOut">退出登录</el-menu-item>
    </el-sub-menu>
    <div v-else class="flex items-center mx-5">
      <div @click="centerDialogVisible = true">
        <el-button type="primary">登录</el-button>
      </div>
    </div>
    
  </el-menu>
  <login
    :login-window-open="centerDialogVisible"
    @login-window-close="centerDialogVisible = false"
  ></login>
</template>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
