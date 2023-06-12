<script setup lang='ts'>
import { toggleDark } from "@/composables";
import { ref } from 'vue';
// import dayIcon from "@/assets/svg/day.svg";
// import darkIcon from "@/assets/svg/dark.svg";
import Dark from './dark.vue';

defineOptions({
    name: ''
})


const activeIndex = ref('1')
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
    @select="handleSelect"
  >
    <el-menu-item index="0">LOGO</el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-menu-item h="full" @click="toggleDark()">
      <el-switch
        
        inline-prompt
        :active-icon="dayIcon"
        :inactive-icon="darkIcon"
        @change="toggleDark"
      />
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
      
    </el-sub-menu>
  </el-menu>

</template>

<style lang='scss' scoped>
.flex-grow {
  flex-grow: 1;
}


</style>
