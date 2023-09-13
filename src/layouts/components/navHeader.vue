<script setup lang="ts">
import { ref } from 'vue'

import dayIcon from '@/assets/svg/day.svg?component'
import darkIcon from '@/assets/svg/dark.svg?component'
import { isDark } from '@/composables'

const errorHandler = () => true

const activeIndex = ref('')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    menu-trigger="hover"
    unique-opened="true"
    router="true"
    @select="handleSelect"
    ><el-menu-item index="/">
      <template #title>
        <div class="dark:hidden flex items-center py-2">
          <img src="@/assets/images/KDLWord1.png"  class="h-8" />
          <img src="@/assets/images/KDLLogo1.png"  class="h-4 pr-5" />
          <img src="@/assets/images/ncuLogo.png"  class="h-10" />
        </div>
        <div  class="dark:visible hidden dark:flex items-center py-2">
          <img src="@/assets/images/KDLWord.png"  class="h-8" />
          <img src="@/assets/images/KDLLogo.png" class="h-4 pr-5" />
          <img src="@/assets/images/ncuLogo1.png"  class="h-10" />
        </div>
      </template>
    </el-menu-item>

    <div class="flex-grow" />
    <el-menu-item index="/image">医学影像</el-menu-item>
    <el-menu-item index="/model">算法模型</el-menu-item>
    <el-menu-item index="/patient">患者详情</el-menu-item>
    <el-sub-menu index="2">
      <template #title>设置</template>
      <el-menu-item index="2-1">关于</el-menu-item>
      <el-menu-item index="2-2">帮助</el-menu-item>
      <el-menu-item index="2-3">问题反馈</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>用户管理</template>
        <el-menu-item index="2-4-1">注销</el-menu-item>
        <el-menu-item index="2-4-2">个人中心</el-menu-item>
        <el-menu-item index="2-4-3">锁屏</el-menu-item>
      </el-sub-menu>
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
    <div class="demo-type mx-5">
      <el-avatar style="margin: auto" :size="30" src="https://empty" @error="errorHandler">
        <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
      </el-avatar>
    </div>
  </el-menu>
</template>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}

//avatar
.demo-type {
  display: flex;
}

.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>
