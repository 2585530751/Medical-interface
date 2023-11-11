<script setup lang="ts">
import biTextIndentLeft from '@/assets/svg/BiTextIndentLeft.svg?component'
import commonTools from '@/layouts/components/imageOperation/commonTools.vue'
import { ref, shallowRef } from 'vue'
import arrowLeft from '@iconify-icons/ep/arrow-left'

var currentComp = shallowRef(commonTools)
var display = ref(true)

// 切换组件
const compChange = () => {
  if (currentComp.value == commonTools) {
    currentComp.value = commonTools
  } else {
    currentComp.value = commonTools
  }
}
</script>

<template>
  <div v-show="display" class="divide-double divide-y-4 w-[15.8rem] divide-slate-400/25 divide-x-0">
    <div
      class="flex flex-wrap justify-between items-center bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <div>
        <el-button text size="small" @click="display = !display">
          <biTextIndentLeft style="height: 25px; width: 25px"></biTextIndentLeft>
        </el-button>
      </div>
      <div>
        <el-button-group>
          <el-button text> 常用工具 </el-button>
          <el-button text> 病灶 </el-button>
        </el-button-group>
      </div>
    </div>
    <component :is="currentComp" />
  </div>
  <div v-show="!display" @click="display = !display" class=" cursor-pointer fixed top-80 right-0 h-10 w-4 flex items-center bg-gray-300 dark:bg-gray-600 rounded hover:dark:bg-gray-300 hover:bg-gray-600">
    <IconifyIconOffline
      class="hover:text-blue-500"
      :icon="arrowLeft"
      :style="{ fontSize: '20px' }"
    ></IconifyIconOffline>
  </div>
</template>

<style lang="scss" scoped></style>