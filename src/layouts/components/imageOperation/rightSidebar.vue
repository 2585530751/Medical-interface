<script setup lang="ts">
import biTextIndentLeft from '@/assets/svg/BiTextIndentLeft.svg?component'
import dragOutlined from '@/assets/svg/drag-outlined.svg?component'
import flip from '@/assets/svg/flip.svg?component'
import darkThemeFilled from '@/assets/svg/dark-theme-20-filled.svg?component'
import zoom from '@/assets/svg/zoom.svg?component'
import cube3d from '@/assets/svg/cube-3d.svg?component'
import layer from '@/assets/svg/layer.svg?component'
import resetWrench from '@/assets/svg/reset-wrench.svg?component'
import diagnosisOutline from '@/assets/svg/diagnosis-outline.svg?component'
import reverseOperationIn from '@/assets/svg/reverse-operation-in.svg?component'
import arrowDown from '@iconify-icons/ep/arrow-down'
import videoCamera from '@iconify-icons/ep/video-camera'
import refreshRight from '@iconify-icons/ep/refresh-right'
import type { IconifyIconOffline } from '@/components/ReIcon'
import imageOperation from '@/components/ReButton/imageOperation.vue'
import { Icon } from '@iconify/vue'

defineOptions({
  name: ''
})
</script>

<template>
  <div class="divide-double divide-y-4 divide-slate-400/25 divide-x-0">
    <div class="flex flex-wrap justify-between bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div>
        <el-button text>
          <biTextIndentLeft style="height: 25px; width: 25px"></biTextIndentLeft>
        </el-button>
      </div>
      <div>
        <el-button-group>
          <el-button text> 常用工具 </el-button>
          <el-button text> 关联/历史检查 </el-button>
        </el-button-group>
      </div>
    </div>
    <div class="divide-slate-400/50 divide-y-2 divide-x-0 divide-solid">
      <div class="flex flex-wrap justify-between bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
        <div class="flex items-center">
          <p class="text-sm text-gray-600 ml-3 dark:text-white inline">序列间布局</p>
          <el-dropdown trigger="click">
            <el-button text>
              <IconifyIconOffline
                class="hover:text-blue-500"
                :icon="arrowDown"
                :style="{ fontSize: '20px' }"
              ></IconifyIconOffline>
            </el-button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="flex items-center">
          <p class="text-sm text-gray-600 dark:text-white inline ml-3">序列内布局</p>
          <el-dropdown trigger="click">
            <el-button text>
              <IconifyIconOffline
                class="hover:text-blue-500"
                :icon="arrowDown"
                :style="{ fontSize: '20px' }"
              ></IconifyIconOffline>
            </el-button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="flex flex-wrap justify-between bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
        <div class="flex items-center">
          <p class="text-sm text-gray-600 ml-3 dark:text-white inline">预设窗位值</p>
          <el-dropdown trigger="click">
            <el-button text>
              <IconifyIconOffline
                class="hover:text-blue-500"
                :icon="arrowDown"
                :style="{ fontSize: '20px' }"
              ></IconifyIconOffline>
            </el-button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="flex items-center">
          <p class="text-sm text-gray-600 dark:text-white inline ml-3">伪彩色方案</p>
          <el-dropdown trigger="click">
            <el-button text>
              <IconifyIconOffline
                class="hover:text-blue-500"
                :icon="arrowDown"
                :style="{ fontSize: '20px' }"
              ></IconifyIconOffline>
            </el-button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Action 1</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>Action 3</el-dropdown-item>
                <el-dropdown-item>Action 4</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="flex flex-wrap gap-1 p-2">
        <imageOperation operation="翻图"
          ><flip style="height: 30px; width: 30px"></flip
        ></imageOperation>
        <imageOperation operation="调窗">
          <darkThemeFilled style="height: 30px; width: 30px"></darkThemeFilled>
        </imageOperation>
        <imageOperation operation="移动">
          <dragOutlined style="height: 30px; width: 30px"></dragOutlined>
        </imageOperation>
        <div class="w-14 h-16 flex items-center rounded-lg bg-gray-100 dark:bg-gray-800">
          <div
            class="cursor-pointer rounded-sm w-10 h-16 justify-center flex-col items-center flex hover:bg-gray-300 dark:hover:bg-cyan-900"
          >
            <zoom style="height: 30px; width: 30px"></zoom>
            <span class="text-gray-500 text-sm dark:text-white">移动</span>
          </div>
          <div class="flex h-full items-center flex-col font-extrabold text-lg">
            <div
              style="border-left-width: 1px; border-bottom-width: 1px"
              class="w-full border-slate-300 border-0 border-solid flex h-8 rounded-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-cyan-900"
            >
              <a class="self-center">+</a>
            </div>
            <div
              style="border-left-width: 1px; border-top-width: 1px"
              class="w-full border-slate-300 border-0 border-solid flex justify-center h-8 rounded-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-cyan-900"
            >
              <a class="self-center">-</a>
            </div>
          </div>
        </div>
        <imageOperation operation="透镜">
          <IconifyIconOffline
            :icon="videoCamera"
            :style="{ fontSize: '30px' }"
          ></IconifyIconOffline>
        </imageOperation>
        <imageOperation operation="旋转">
          <IconifyIconOffline
            :icon="refreshRight"
            :style="{ fontSize: '30px' }"
          ></IconifyIconOffline>
        </imageOperation>
        <imageOperation operation="三维">
          <cube3d style="height: 30px; width: 30px"></cube3d>
        </imageOperation>
        <div class="w-14 h-16 flex items-center rounded-lg bg-gray-100 dark:bg-gray-800">
          <div
            class="cursor-pointer rounded-sm w-10 h-16 justify-center flex-col items-center flex hover:bg-gray-300 dark:hover:bg-cyan-900"
          >
            <zoom style="height: 30px; width: 30px"></zoom>
            <span class="text-gray-500 text-sm dark:text-white">融合</span>
          </div>
          <div class="flex h-full items-center font-extrabold text-lg">
            <el-dropdown trigger="click">
              <IconifyIconOffline
                class="hover:text-blue-500"
                :icon="arrowDown"
                :style="{ fontSize: '20px' }"
              ></IconifyIconOffline>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item>Action 4</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
