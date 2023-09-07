<script setup lang="ts">
import biTextIndentRight from '@/assets/svg/BiTextIndentRight.svg?component'
defineOptions({
  name: ''
})
</script>

<template>
  <div class="flex flex-wrap justify-between bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
    <div>
      <el-button-group>
        <el-button text>
          序列
        </el-button>
        <el-button text>
          关联/历史检查
        </el-button>
      </el-button-group>
    </div>

    <div>
      <el-button text>
        <biTextIndentRight style="height: 25px; width: 25px"></biTextIndentRight>
      </el-button>
    </div>
  </div>
  <div class="flex flex-wrap justify-between dark:border-gray-700 dark:bg-gray-500">
    
  </div>
</template>

<style lang="scss" scoped></style>
