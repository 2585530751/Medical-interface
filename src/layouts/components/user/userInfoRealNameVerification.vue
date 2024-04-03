<script setup lang="ts">
defineOptions({
  name: ''
})
import { WarningFilled } from '@element-plus/icons-vue'
</script>

<template>
  <div class="flex flex-col justify-center h-full gap-4">
    <el-card style="max-width: 500px" class="self-center w-1/2">
      <template #header>
        <div class="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m13 21l2-1l2 1v-7h-4m4-5V7l-2 1l-2-1v2l-2 1l2 1v2l2-1l2 1v-2l2-1m1-7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7v-2H4V5h16v10h-1v2h1a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-9 5H5V6h6m-2 5H5V9h4m2 5H5v-2h6Z"
            />
          </svg>
          <span class="ml-2 text-lg">您已通过了实名认证</span>
        </div>
      </template>
      <div class="flex justify-center">
        <el-descriptions :column="1" size="large" class="bg-slate-300">
          <el-descriptions-item label="真实姓名">吴**</el-descriptions-item>
          <el-descriptions-item label="证件号码">4****************8</el-descriptions-item>
        </el-descriptions>
      </div>
    </el-card>
    <el-text>
      <el-icon><WarningFilled /></el-icon>
      实名认证审核通过后，将不能修改认证信息。 如有特殊情况
      (如：改名、移民等导致原证件无效)，请联系客服人员进行处理。
    </el-text>
  </div>
</template>

<style lang="scss" scoped></style>
