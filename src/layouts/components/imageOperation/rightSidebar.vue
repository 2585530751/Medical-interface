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
import playerPlay from '@/assets/svg/player-play.svg?component'
import playerPause from '@/assets/svg/player-pause.svg?component'
import playerStart from '@/assets/svg/player-start.svg?component'
import playerEnd from '@/assets/svg/player-end.svg?component'
import arrowUpDuotone from '@/assets/svg/arrow-up-duotone.svg?component'
import straightPipe from '@/assets/svg/straight-pipe.svg?component'
import menuDotsLineDuotone from '@/assets/svg/menu-dots-line-duotone.svg?component'
import addFill from '@/assets/svg/add-fill.svg?component'
import angle from '@/assets/svg/angle.svg?component'
import cobb from '@/assets/svg/cobb.svg?component'
import iImagingAlternativeCt from '@/assets/svg/i-imaging-alternative-ct.svg?component'
import cardiopulmonary from '@/assets/svg/cardiopulmonary.svg?component'
import ellipses from '@/assets/svg/ellipses.svg?component'
import circleCenter from '@/assets/svg/circleCenter.svg?component'
import rectangles from '@/assets/svg/rectangles.svg?component'
import pen from '@/assets/svg/pen.svg?component'
import pencil from '@/assets/svg/pencil.svg?component'
import sphere from '@/assets/svg/sphere.svg?component'
import cuboid from '@/assets/svg/cuboid.svg?component'
import probes from '@/assets/svg/probes.svg?component'
import captureImage from '@/assets/svg/captureImage.svg?component'
import remove from '@/assets/svg/remove.svg?component'
import removals from '@/assets/svg/removals.svg?component'
import copy from '@/assets/svg/copy.svg?component'
import separate from '@/assets/svg/separate.svg?component'
import arrowDown from '@iconify-icons/ep/arrow-down'
import videoCamera from '@iconify-icons/ep/video-camera'
import refreshRight from '@iconify-icons/ep/refresh-right'
import type { IconifyIconOffline } from '@/components/ReIcon'
import imageOperation from '@/components/ReButton/imageOperation.vue'
defineOptions({
  name: ''
})
</script>

<template>
  <div class="divide-double divide-y-4 divide-slate-400/25 divide-x-0">
    <div class="flex flex-wrap justify-between items-center bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div>
        <el-button text size="small">
          <biTextIndentLeft style="height: 25px; width: 25px"></biTextIndentLeft>
        </el-button>
      </div>
      <div>
        <el-button-group>
          <el-button text > 常用工具 </el-button>
          <el-button text > 病灶 </el-button>
        </el-button-group>
      </div>
    </div>
    <div class="divide-slate-400/50 divide-y-2 divide-x-0 divide-solid  ">
      <div class="flex flex-wrap justify-between bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
        <div class="flex items-center">
          <p class="text-sm text-gray-600 ml-3 dark:text-white inline">序列间布局</p>
          <el-dropdown trigger="click">
            <el-button text size="small">
              <IconifyIconOffline
                class="hover:text-blue-500"
                :icon="arrowDown"
                :style="{ fontSize: '20px' }"
              ></IconifyIconOffline>
            </el-button>

            <template #dropdown size="small">
              <el-dropdown-menu>
                <el-dropdown-item>1X1</el-dropdown-item>
                <el-dropdown-item>1X2</el-dropdown-item>
                <el-dropdown-item>2X1</el-dropdown-item>
                <el-dropdown-item>2X2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="flex items-center">
          <p class="text-sm text-gray-600 dark:text-white inline ml-3">序列内布局</p>
          <el-dropdown trigger="click">
            <el-button text size="small">
              <IconifyIconOffline
                class="hover:text-blue-500"
                :icon="arrowDown"
                :style="{ fontSize: '20px' }"
              ></IconifyIconOffline>
            </el-button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>1X1</el-dropdown-item>
                <el-dropdown-item>1X2</el-dropdown-item>
                <el-dropdown-item>2X1</el-dropdown-item>
                <el-dropdown-item>2X2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="flex flex-wrap justify-between bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
        <div class="flex items-center">
          <p class="text-sm text-gray-600 ml-3 dark:text-white inline">预设窗位值</p>
          <el-dropdown trigger="click">
            <el-button text size="small">
              <IconifyIconOffline
                class="hover:text-blue-500"
                :icon="arrowDown"
                :style="{ fontSize: '20px' }"
              ></IconifyIconOffline>
            </el-button>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>1X1</el-dropdown-item>
                <el-dropdown-item>1X2</el-dropdown-item>
                <el-dropdown-item>2X1</el-dropdown-item>
                <el-dropdown-item>2X2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="flex items-center">
          <p class="text-sm text-gray-600 dark:text-white inline ml-3">伪彩色方案</p>
          <el-dropdown trigger="click">
            <el-button text size="small">
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
      <div class="flex flex-wrap gap-1 p-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
        <imageOperation operation="翻图"
          ><flip style="height: 30px; width: 30px"></flip
        ></imageOperation>
        <imageOperation operation="调窗">
          <darkThemeFilled style="height: 30px; width: 30px"></darkThemeFilled>
        </imageOperation>
        <imageOperation operation="移动">
          <dragOutlined style="height: 30px; width: 30px"></dragOutlined>
        </imageOperation>
        <div class="w-14 h-16 flex items-center rounded-lg bg-gray-100 dark:bg-gray-700">
          <div
            class="cursor-pointer rounded-sm w-10 h-16 justify-center flex-col items-center flex hover:bg-gray-300 dark:hover:bg-cyan-900"
          >
            <zoom style="height: 30px; width: 30px"></zoom>
            <span class="text-gray-500 text-sm dark:text-white">缩放</span>
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
        <div class="w-14 h-16 flex items-center rounded-lg bg-gray-100 dark:bg-gray-700">
          <div
            class="cursor-pointer rounded-sm w-10 h-16 justify-center flex-col items-center flex hover:bg-gray-300 dark:hover:bg-cyan-900"
          >
            <layer style="height: 30px; width: 30px"></layer>
            <span class="text-gray-500 text-sm dark:text-white">融合</span>
          </div>
          <div
            style="border-left-width: 1px"
            class="flex h-full items-center font-extrabold text-lg hover:bg-gray-300 border-slate-300 border-0 border-solid cursor-pointer rounded-sm"
          >
            <el-dropdown trigger="click">
              <IconifyIconOffline
                class="hover:text-blue-500"
                :icon="arrowDown"
                :style="{ fontSize: '15px' }"
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
        <imageOperation operation="反片">
          <reverseOperationIn style="height: 30px; width: 30px"></reverseOperationIn>
        </imageOperation>
        <imageOperation operation="会诊">
          <diagnosisOutline style="height: 30px; width: 30px"></diagnosisOutline>
        </imageOperation>
        <div class="w-14 h-16 flex items-center rounded-lg bg-gray-100 dark:bg-gray-700">
          <div
            class="cursor-pointer rounded-sm w-10 h-16 justify-center flex-col items-center flex hover:bg-gray-300 dark:hover:bg-cyan-900"
          >
            <resetWrench style="height: 30px; width: 30px"></resetWrench>
            <span class="text-gray-500 text-sm dark:text-white">重置</span>
          </div>
          <div
            style="border-left-width: 1px"
            class="flex h-full items-center font-extrabold text-lg hover:bg-gray-300 border-slate-300 border-0 border-solid cursor-pointer rounded-sm"
          >
            <el-dropdown trigger="click">
              <IconifyIconOffline
                class="hover:text-blue-500"
                :icon="arrowDown"
                :style="{ fontSize: '15px' }"
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
      <div
        class="flex justify-center items-center bg-stone-50 dark:border-gray-700 dark:bg-gray-800 h-10"
      >
        <el-button-group>
          <el-button text size="small"
            ><playerStart style="height: 25px; width: 25px"></playerStart
          ></el-button>
          <el-button text size="small"
            ><playerPlay style="height: 25px; width: 25px"></playerPlay
          ></el-button>
          <el-button text size="small"
            ><playerEnd style="height: 25px; width: 25px"></playerEnd
          ></el-button>
        </el-button-group>
        <el-dropdown>
          <div class="bg-stone-200 flex justify-center items-center rounded-md w-20 dark:bg-gray-700">
            <span class="h-6 flex justify-center items-center ">默认速度</span>
            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="arrowDown"
              :style="{ fontSize: '15px' }"
            ></IconifyIconOffline>
          </div>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Action 1</el-dropdown-item>
              <el-dropdown-item>Action 2</el-dropdown-item>
              <el-dropdown-item>Action 3</el-dropdown-item>
              <el-dropdown-item>Action 4</el-dropdown-item>
              <el-dropdown-item>Action 5</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="flex flex-wrap gap-1 p-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
        <imageOperation operation="箭头"
          ><arrowUpDuotone style="height: 30px; width: 30px"></arrowUpDuotone>
        </imageOperation>
        <imageOperation operation="直线">
          <straightPipe style="height: 30px; width: 30px"></straightPipe>
        </imageOperation>
        <imageOperation operation="中点">
          <menuDotsLineDuotone style="height: 30px; width: 30px"></menuDotsLineDuotone>
        </imageOperation>
        <imageOperation operation="十字线">
          <addFill style="height: 30px; width: 30px"></addFill>
        </imageOperation>
        <imageOperation operation="角度">
          <angle style="height: 30px; width: 30px"></angle>
        </imageOperation>
       <imageOperation operation="Cobb">
          <cobb style="height: 30px; width: 30px;fill:currentColor"></cobb>
        </imageOperation>
        <imageOperation operation="CT值">
          <iImagingAlternativeCt style="height: 30px; width: 30px"></iImagingAlternativeCt>
        </imageOperation>
        <imageOperation operation="心胸比">
          <cardiopulmonary style="height: 30px; width: 30px;fill:currentColor"></cardiopulmonary>
        </imageOperation>
        <imageOperation operation="椭圆">
          <ellipses style="height: 30px; width: 30px;fill:currentColor"></ellipses>
        </imageOperation>
        <imageOperation operation="圆心">
          <circleCenter style="height: 30px; width: 30px;fill:currentColor"></circleCenter>
        </imageOperation>
        <imageOperation operation="矩形">
          <rectangles style="height: 30px; width: 30px;fill:currentColor"></rectangles>
        </imageOperation>
        <imageOperation operation="钢笔">
          <pen style="height: 30px; width: 30px"></pen>
        </imageOperation>
        <imageOperation operation="铅笔">
          <pencil style="height: 30px; width: 30px;fill:currentColor"></pencil>
        </imageOperation>
        <imageOperation operation="球体">
          <sphere style="height: 30px; width: 30px"></sphere>
        </imageOperation>
        <imageOperation operation="长方体">
          <cuboid style="height: 30px; width: 30px;fill:currentColor"></cuboid>
        </imageOperation>
      </div>
      <div class="flex flex-wrap gap-1 p-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
        <imageOperation operation="3D探针">
          <probes style="height: 30px; width: 30px;fill:currentColor"></probes>
        </imageOperation>
        <imageOperation operation="截屏">
          <captureImage style="height: 30px; width: 30px;fill:currentColor"></captureImage>
        </imageOperation>
        <imageOperation operation="删除">
          <remove style="height: 30px; width: 30px;fill:currentColor"></remove>
        </imageOperation>
        <imageOperation operation="清除">
          <removals style="height: 30px; width: 30px;fill:currentColor"></removals>
        </imageOperation>
        <imageOperation operation="复制">
          <copy style="height: 30px; width: 30px;fill:currentColor"></copy>
        </imageOperation>
        <imageOperation operation="拆图显示">
          <separate style="height: 30px; width: 30px;fill:currentColor" class="dark:text-white"></separate>
        </imageOperation>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
