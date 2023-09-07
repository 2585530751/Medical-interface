<script setup lang="ts">
import { isDark } from '@/composables'
import dayIcon from '@/assets/svg/day.svg?component'
import darkIcon from '@/assets/svg/dark.svg?component'
import askAi from '@/assets/svg/ask-ai.svg'
import type { IconifyIconOffline } from '@/components/ReIcon'
import back from '@iconify-icons/ep/back'
import setting from '@iconify-icons/ep/setting'
import message from '@iconify-icons/ep/message'
defineOptions({
  name: ''
})
</script>

<template>
  <div
    class="flex w-full h-10 border-gray-200 justify-between border-x-0 border-t-0 border border-solid shadow-md dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="flex h-10 justify-center items-center flex-wrap gap-1 pl-2">
      <el-button text>
        <template #icon>
          <IconifyIconOffline :icon="back"></IconifyIconOffline>
        </template>
        返回
      </el-button>
    </div>
    <div class="flex justify-center items-center">
      <el-button-group>
        <el-tooltip content="明暗" placement="bottom" effect="light">
          <el-button text size>
            <el-switch
              style="margin: auto"
              v-model="isDark"
              inline-prompt
              :active-icon="dayIcon"
              :inactive-icon="darkIcon"
            />
          </el-button>
        </el-tooltip>
        <el-tooltip content="AI" placement="bottom" effect="light">
          <el-button text>
            <askAi style="height: 25px; width: 25px"></askAi>
          </el-button>
        </el-tooltip>
      </el-button-group>
    </div>

    <div class="flex h-10 justify-center items-center">
      <el-button-group>
        <el-tooltip content="意见反馈" placement="bottom" effect="light">
          <el-button text>
            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="message"
              :style="{ fontSize: '20px' }"
            ></IconifyIconOffline>
          </el-button>
        </el-tooltip>
        <el-tooltip content="设置" placement="bottom" effect="light">
          <el-button text>
            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="setting"
              :style="{ fontSize: '20px' }"
            ></IconifyIconOffline>
          </el-button>
        </el-tooltip>
      </el-button-group>

    </div>
  </div>
</template>

<style lang="scss" scoped></style>
