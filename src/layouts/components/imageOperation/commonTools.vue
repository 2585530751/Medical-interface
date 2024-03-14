<script setup lang="ts">
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
import arrowUp from '@iconify-icons/ep/arrow-up'
import videoCamera from '@iconify-icons/ep/video-camera'
import refreshRight from '@iconify-icons/ep/refresh-right'
import CircleScissor from '@/assets/svg/circleScissor.svg?component'
import rectangleScissor from '@/assets/svg/rectangleScissor.svg?component'
import paintFill from '@/assets/svg/paintFill.svg?component'

import type { IconifyIconOffline } from '@/components/ReIcon'
import imageOperation from '@/components/ReButton/imageOperation.vue'
import { type ViewportColorbar } from '@cornerstonejs/tools/src/utilities/voi/colorbar/ViewportColorbar'
import * as cornerstoneTools from '@cornerstonejs/tools'
import { useImageStateStore } from '@/store/imageState'
import {
  resetOriginal,
  flipH,
  resetPan,
  resetZoom,
  changeZoom,
  invert,
  setWindowLevel,
  setViewportColorbar,
  resetToDefaultViewportProperties,
  removeCurrentImageIdProperties,
  changeNextImage,
  changePreviousImage
} from '@/composables/image/imageOperate'
import { ref, watch } from 'vue'
import vtkColormaps from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction/ColorMaps'

const {
  Synchronizer,

  AnnotationDisplayTool,
  ReferenceCursors,
  ReferenceLines,
  ScaleOverlayTool,

  DragProbeTool,

  BrushTool,
  CircleScissorsTool,
  MIPJumpToClickTool,
  MagnifyTool,
  PaintFillTool,
  RectangleScissorsTool,
  SegmentationDisplayTool,
  SphereScissorsTool,
  StackScrollTool,
  TrackballRotateTool,
  VolumeRotateMouseWheelTool,

  PanTool,
  WindowLevelTool,
  StackScrollMouseWheelTool,
  ZoomTool,
  PlanarRotateTool,

  LengthTool,
  ProbeTool,
  RectangleROITool,
  RectangleROIStartEndThresholdTool,
  RectangleROIThresholdTool,
  EllipticalROITool,
  CircleROITool,
  BidirectionalTool,
  AngleTool,
  CobbAngleTool,
  ArrowAnnotateTool,
  CrosshairsTool,
  PlanarFreehandROITool,
  utilities: csToolsUtilities,
  Enums: csToolsEnums
} = cornerstoneTools

const imageStateStore = useImageStateStore()
const segmentationTools = ref(true)
const operateTools = ref(true)
const annotationTools = ref(true)

const layouts = [
  { label: '1X1', rows: 1, columns: 1 },
  { label: '1X2', rows: 1, columns: 2 },
  { label: '2X1', rows: 2, columns: 1 },
  { label: '1X3', rows: 1, columns: 3 },
  { label: '3X1', rows: 3, columns: 1 },
  { label: '2X2', rows: 2, columns: 2 },
  { label: '2X3', rows: 2, columns: 3 },
  { label: '3X2', rows: 3, columns: 2 },
  { label: '3X3', rows: 3, columns: 3 }
]
const setLayout = (r: number, c: number) => {
  imageStateStore.windowRowsColumns.rows = r
  imageStateStore.windowRowsColumns.columns = c
}

const windowLevelPresetValues = [
  { label: 'Soft tissue 400/40', window: 400, level: 40 },
  { label: 'Lung 1500/-600', window: 1500, level: -600 },
  { label: 'Liver 150/90', window: 150, level: 90 },
  { label: 'Bone 2500/480', window: 2500, level: 480 },
  { label: 'Brain 80/40', window: 80, level: 40 },
  { label: 'Abdomen 350/60', window: 360, level: 60 },
  { label: 'Chest 360/40', window: 350, level: 40 }
]

const colormaps = vtkColormaps.rgbPresetNames.map((presetName) =>
  vtkColormaps.getPresetByName(presetName)
)

const playbackFramesPerSecond = ref(1)
const checkPlaybackFramesPerSecond = ref(true)
function playClipPlayer() {
  csToolsUtilities.cine.playClip(
    imageStateStore.viewports[imageStateStore.selectImagesListWindows].element,
    { framesPerSecond: playbackFramesPerSecond.value }
  )
  checkPlaybackFramesPerSecond.value = false
}
function stopClipPlayer() {
  csToolsUtilities.cine.stopClip(
    imageStateStore.viewports[imageStateStore.selectImagesListWindows].element
  )
  checkPlaybackFramesPerSecond.value = true
}
function changeClipPlayerValue() {
  if (!checkPlaybackFramesPerSecond.value) {
    csToolsUtilities.cine.playClip(
      imageStateStore.viewports[imageStateStore.selectImagesListWindows].element,
      { framesPerSecond: playbackFramesPerSecond.value }
    )
  }
}
watch(
  () => imageStateStore.selectImagesListWindows,
  () => {
    if (imageStateStore.viewports[imageStateStore.selectImagesListWindows]) {
      let toolState = csToolsUtilities.cine.getToolState(
        imageStateStore.viewports[imageStateStore.selectImagesListWindows].element
      )
      if (!toolState) {
        checkPlaybackFramesPerSecond.value = true
      } else {
        checkPlaybackFramesPerSecond.value = false
      }
    }
  },
  {
    deep: true
  }
)
</script>

<template>
  <div class="divide-x-0 divide-y-2 divide-slate-400/50 divide-solid">
    <div class="flex flex-wrap justify-between bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center">
        <p class="inline ml-3 text-sm text-gray-600 dark:text-white">序列布局</p>
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
              <el-dropdown-item
                v-for="layout in layouts"
                :key="layout.label"
                @click="setLayout(layout.rows, layout.columns)"
              >
                {{ layout.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="flex items-center">
        <p class="inline ml-3 text-sm text-gray-600 dark:text-white">视口状态</p>
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
              <el-dropdown-item
                @click="
                  resetToDefaultViewportProperties(
                    imageStateStore.renderingEngine.id,
                    imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
                  )
                "
                >重置视口默认属性</el-dropdown-item
              >
              <el-dropdown-item
                @click="
                  removeCurrentImageIdProperties(
                    imageStateStore.renderingEngine.id,
                    imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
                  )
                "
                >去除视口已有属性</el-dropdown-item
              >
              <el-dropdown-item
                @click="
                  setViewportColorbar(
                    'Grayscale',
                    imageStateStore.renderingEngine.id,
                    imageStateStore.viewports[imageStateStore.selectImagesListWindows].id,
                    imageStateStore.viewportColorbar[imageStateStore.selectImagesListWindows]
                  )
                "
                >重置视口默认彩条</el-dropdown-item
              >
              <el-dropdown-item
                @click="
                  resetToDefaultViewportProperties(
                    imageStateStore.renderingEngine.id,
                    imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
                  ),
                    setViewportColorbar(
                      'Grayscale',
                      imageStateStore.renderingEngine.id,
                      imageStateStore.viewports[imageStateStore.selectImagesListWindows].id,
                      imageStateStore.viewportColorbar[imageStateStore.selectImagesListWindows]
                    )
                "
                >恢复视口初始状态</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="flex flex-wrap justify-between bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center">
        <p class="inline ml-3 text-sm text-gray-600 dark:text-white">预设窗位值</p>
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
              <el-dropdown-item
                v-for="(windowLevelPresetValue, index) in windowLevelPresetValues"
                :key="index"
                @click="
                  setWindowLevel(
                    windowLevelPresetValue.window,
                    windowLevelPresetValue.level,
                    imageStateStore.renderingEngine.id,
                    imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
                  )
                "
              >
                {{ windowLevelPresetValue.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="flex items-center">
        <p class="inline ml-3 text-sm text-gray-600 dark:text-white">伪彩色方案</p>
        <el-dropdown trigger="click" :max-height="200">
          <el-button text size="small">
            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="arrowDown"
              :style="{ fontSize: '20px' }"
            ></IconifyIconOffline>
          </el-button>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(colormap, index) in colormaps"
                :key="index"
                @click="
                  setViewportColorbar(
                    colormap.Name,
                    imageStateStore.renderingEngine.id,
                    imageStateStore.viewports[imageStateStore.selectImagesListWindows].id,
                    imageStateStore.viewportColorbar[imageStateStore.selectImagesListWindows]
                  )
                "
                >{{ colormap.ColorSpace }} {{ colormap.Name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="p-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div
        class="flex items-center justify-between h-5 py-1 pl-2 bg-gray-100 rounded-md dark:bg-gray-700"
      >
        <a class="inline tracking-widest text-gray-600 text- dark:text-white">操作工具</a>
        <el-button text size="small" @click="operateTools = !operateTools">
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="operateTools ? arrowUp : arrowDown"
            :style="{ fontSize: '20px' }"
          ></IconifyIconOffline>
        </el-button>
      </div>
      <div v-show="operateTools" class="flex flex-wrap gap-1 pt-1 pb-1">
        <imageOperation
          operation="翻图"
          @click="
            flipH(
              imageStateStore.renderingEngine.id,
              imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
            )
          "
        >
          <flip style="height: 30px; width: 30px"></flip
        ></imageOperation>
        <imageOperation
          operation="调窗"
          @click="imageStateStore.bindLeftMouse(WindowLevelTool.toolName)"
        >
          <darkThemeFilled style="height: 30px; width: 30px"></darkThemeFilled>
        </imageOperation>
        <imageOperation operation="移动" @click="imageStateStore.bindLeftMouse(PanTool.toolName)">
          <dragOutlined style="height: 30px; width: 30px"></dragOutlined>
        </imageOperation>
        <div class="flex items-center h-16 bg-gray-100 rounded-lg w-14 dark:bg-gray-700">
          <div
            class="flex flex-col items-center justify-center w-10 h-16 rounded-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-cyan-900"
            @click="imageStateStore.bindLeftMouse(ZoomTool.toolName)"
          >
            <zoom style="height: 30px; width: 30px"></zoom>
            <span class="text-sm text-gray-500 dark:text-white">缩放</span>
          </div>
          <div class="flex flex-col items-center h-full text-lg font-extrabold">
            <div
              style="border-left-width: 1px; border-bottom-width: 1px"
              class="flex w-full h-8 border-0 border-solid rounded-sm cursor-pointer border-slate-300 hover:bg-gray-300 dark:hover:bg-cyan-900"
            >
              <a
                class="self-center"
                @click="
                  changeZoom(
                    imageStateStore.renderingEngine.id,
                    imageStateStore.viewports[imageStateStore.selectImagesListWindows].id,
                    1.05
                  )
                "
                >+</a
              >
            </div>
            <div
              style="border-left-width: 1px; border-top-width: 1px"
              class="flex justify-center w-full h-8 border-0 border-solid rounded-sm cursor-pointer border-slate-300 hover:bg-gray-300 dark:hover:bg-cyan-900"
            >
              <a
                class="self-center"
                @click="
                  changeZoom(
                    imageStateStore.renderingEngine.id,
                    imageStateStore.viewports[imageStateStore.selectImagesListWindows].id,
                    0.95
                  )
                "
                >-</a
              >
            </div>
          </div>
        </div>
        <imageOperation
          operation="旋转"
          @click="imageStateStore.bindLeftMouse(PlanarRotateTool.toolName)"
        >
          <IconifyIconOffline
            :icon="refreshRight"
            :style="{ fontSize: '30px' }"
          ></IconifyIconOffline>
        </imageOperation>
        <imageOperation
          operation="反片"
          @click="
            invert(
              imageStateStore.renderingEngine.id,
              imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
            )
          "
        >
          <reverseOperationIn style="height: 30px; width: 30px"></reverseOperationIn>
        </imageOperation>
        <imageOperation operation="放大镜">
          <IconifyIconOffline
            @click="imageStateStore.bindLeftMouse(MagnifyTool.toolName)"
            :icon="videoCamera"
            :style="{ fontSize: '30px' }"
          ></IconifyIconOffline>
        </imageOperation>
        <div class="flex items-center h-16 bg-gray-100 rounded-lg w-14 dark:bg-gray-700">
          <div
            class="flex flex-col items-center justify-center w-10 h-16 rounded-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-cyan-900"
            @click="
              resetOriginal(
                imageStateStore.renderingEngine.id,
                imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
              )
            "
          >
            <resetWrench style="height: 30px; width: 30px"></resetWrench>
            <span class="text-sm text-gray-500 dark:text-white">重置</span>
          </div>
          <div
            style="border-left-width: 1px"
            class="flex items-center h-full text-lg font-extrabold border-0 border-solid rounded-sm cursor-pointer hover:bg-gray-300 border-slate-300"
          >
            <el-dropdown trigger="click">
              <IconifyIconOffline
                class="hover:text-blue-500"
                :icon="arrowDown"
                :style="{ fontSize: '15px' }"
              ></IconifyIconOffline>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    @click="
                      resetPan(
                        imageStateStore.renderingEngine.id,
                        imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
                      )
                    "
                    >重置移动</el-dropdown-item
                  >
                  <el-dropdown-item
                    @click="
                      resetZoom(
                        imageStateStore.renderingEngine.id,
                        imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
                      )
                    "
                    >重置大小</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-px h-15 bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center justify-center pt-2">
        <el-button-group>
          <el-button text size="small"
            ><playerStart
              style="height: 25px; width: 25px"
              @click="
                changePreviousImage(
                  imageStateStore.renderingEngine.id,
                  imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
                )
              "
            ></playerStart
          ></el-button>
          <el-button text size="small"
            ><playerPlay
              v-show="checkPlaybackFramesPerSecond"
              style="height: 25px; width: 25px"
              @click="playClipPlayer()"
            ></playerPlay
            ><playerPause
              v-show="!checkPlaybackFramesPerSecond"
              style="height: 25px; width: 25px"
              @click="stopClipPlayer()"
            ></playerPause>
          </el-button>

          <el-button text size="small"
            ><playerEnd
              style="height: 25px; width: 25px"
              @click="
                changeNextImage(
                  imageStateStore.renderingEngine.id,
                  imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
                )
              "
            ></playerEnd
          ></el-button>
        </el-button-group>
        <el-dropdown>
          <div
            class="flex items-center w-20 rounded-md justify-evenly bg-stone-200 dark:bg-gray-700"
          >
            <span class="flex items-center justify-center h-6">{{ playbackFramesPerSecond }}</span>

            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="arrowDown"
              :style="{ fontSize: '15px' }"
            ></IconifyIconOffline>
          </div>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click=";(playbackFramesPerSecond = 5), changeClipPlayerValue()"
                >5</el-dropdown-item
              >
              <el-dropdown-item @click=";(playbackFramesPerSecond = 10), changeClipPlayerValue()"
                >10</el-dropdown-item
              >
              <el-dropdown-item @click=";(playbackFramesPerSecond = 15), changeClipPlayerValue()"
                >15</el-dropdown-item
              >
              <el-dropdown-item @click=";(playbackFramesPerSecond = 20), changeClipPlayerValue()"
                >20</el-dropdown-item
              >
              <el-dropdown-item @click=";(playbackFramesPerSecond = 25), changeClipPlayerValue()"
                >25</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="mx-4">
        <el-slider
          v-model="playbackFramesPerSecond"
          :max="30"
          :min="1"
          placement="bottom"
          size="small"
          @change="changeClipPlayerValue()"
        />
      </div>
    </div>

    <div class="p-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div
        class="flex items-center justify-between h-5 py-1 pl-2 bg-gray-100 rounded-md dark:bg-gray-700"
      >
        <a class="inline text-base tracking-widest text-gray-600 dark:text-white">注释工具</a>
        <el-button text size="small" @click="annotationTools = !annotationTools">
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="annotationTools ? arrowUp : arrowDown"
            :style="{ fontSize: '20px' }"
          ></IconifyIconOffline>
        </el-button>
      </div>
      <div v-show="annotationTools" class="flex flex-wrap gap-1 pt-1 pb-1">
        <imageOperation
          operation="箭头"
          @click="imageStateStore.bindLeftMouse(ArrowAnnotateTool.toolName)"
          ><arrowUpDuotone style="height: 30px; width: 30px"></arrowUpDuotone>
        </imageOperation>
        <imageOperation
          operation="直线"
          @click="imageStateStore.bindLeftMouse(LengthTool.toolName)"
        >
          <straightPipe style="height: 30px; width: 30px"></straightPipe>
        </imageOperation>
        <imageOperation operation="中点">
          <menuDotsLineDuotone style="height: 30px; width: 30px"></menuDotsLineDuotone>
        </imageOperation>
        <imageOperation
          operation="十字线"
          @click="imageStateStore.bindLeftMouse(BidirectionalTool.toolName)"
        >
          <addFill style="height: 30px; width: 30px"></addFill>
        </imageOperation>
        <imageOperation operation="角度" @click="imageStateStore.bindLeftMouse(AngleTool.toolName)">
          <angle style="height: 30px; width: 30px"></angle>
        </imageOperation>
        <imageOperation
          operation="Cobb"
          @click="imageStateStore.bindLeftMouse(CobbAngleTool.toolName)"
        >
          <cobb style="height: 30px; width: 30px; fill: currentColor"></cobb>
        </imageOperation>
        <imageOperation operation="CT值">
          <iImagingAlternativeCt style="height: 30px; width: 30px"></iImagingAlternativeCt>
        </imageOperation>
        <imageOperation operation="心胸比">
          <cardiopulmonary style="height: 30px; width: 30px; fill: currentColor"></cardiopulmonary>
        </imageOperation>
        <imageOperation
          operation="椭圆"
          @click="imageStateStore.bindLeftMouse(EllipticalROITool.toolName)"
        >
          <ellipses style="height: 30px; width: 30px; fill: currentColor"></ellipses>
        </imageOperation>
        <imageOperation
          operation="圆心"
          @click="imageStateStore.bindLeftMouse(CircleROITool.toolName)"
        >
          <circleCenter style="height: 30px; width: 30px; fill: currentColor"></circleCenter>
        </imageOperation>
        <imageOperation
          operation="矩形"
          @click="imageStateStore.bindLeftMouse(RectangleROITool.toolName)"
        >
          <rectangles style="height: 30px; width: 30px; fill: currentColor"></rectangles>
        </imageOperation>
        <imageOperation operation="钢笔">
          <pen style="height: 30px; width: 30px"></pen>
        </imageOperation>
        <imageOperation
          operation="铅笔"
          @click="imageStateStore.bindLeftMouse(PlanarFreehandROITool.toolName)"
        >
          <pencil style="height: 30px; width: 30px; fill: currentColor"></pencil>
        </imageOperation>
        <imageOperation operation="球体">
          <sphere style="height: 30px; width: 30px"></sphere>
        </imageOperation>
        <imageOperation
          operation="长方体"
          @click="imageStateStore.bindLeftMouse(ProbeTool.toolName)"
        >
          <cuboid style="height: 30px; width: 30px; fill: currentColor"></cuboid>
        </imageOperation>
      </div>
    </div>

    <div class="p-2 bg-stone-50 dark:bg-gray-800">
      <div
        class="flex items-center justify-between h-5 py-1 pl-2 bg-gray-100 rounded-md dark:bg-gray-700"
      >
        <a class="inline text-base tracking-widest text-gray-600 dark:text-white">分割工具</a>

        <el-button text size="small" @click="segmentationTools = !segmentationTools">
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="segmentationTools ? arrowUp : arrowDown"
            :style="{ fontSize: '20px' }"
          ></IconifyIconOffline>
        </el-button>
      </div>
      <div v-show="segmentationTools" class="flex flex-wrap gap-1 pt-1 pb-1">
        <imageOperation operation="3D探针">
          <probes style="height: 30px; width: 30px; fill: currentColor"></probes>
        </imageOperation>
        <imageOperation operation="截屏" @click="imageStateStore.bindLeftMouse('CircularEraser')">
          <captureImage style="height: 30px; width: 30px; fill: currentColor"></captureImage>
        </imageOperation>
        <imageOperation operation="删除">
          <remove style="height: 30px; width: 30px; fill: currentColor"></remove>
        </imageOperation>
        <imageOperation
          operation="清除"
          @click="imageStateStore.bindLeftMouse(PaintFillTool.toolName)"
        >
          <removals style="height: 30px; width: 30px; fill: currentColor"></removals>
        </imageOperation>
        <imageOperation operation="复制" @click="imageStateStore.bindLeftMouse('CircularBrush')">
          <copy style="height: 30px; width: 30px; fill: currentColor"></copy>
        </imageOperation>
        <imageOperation
          operation="画笔填充"
          @click="imageStateStore.bindLeftMouse(PaintFillTool.toolName)"
        >
          <paintFill style="height: 30px; width: 30px; fill: currentColor"></paintFill>
        </imageOperation>
        <imageOperation operation="矩形剪刀">
          <rectangleScissor
            style="height: 30px; width: 30px; fill: currentColor"
          ></rectangleScissor>
        </imageOperation>
        <imageOperation operation="圆形剪刀">
          <circleScissor style="height: 30px; width: 30px; fill: currentColor"></circleScissor>
        </imageOperation>
      </div>
    </div>
    <div class="p-2 bg-stone-50 dark:bg-gray-800">
      <div
        class="flex items-center justify-between h-5 py-1 pl-2 bg-gray-100 rounded-md dark:bg-gray-700"
      >
        <a class="inline text-base tracking-widest text-gray-600 dark:text-white">其他</a>

        <el-button text size="small" @click="segmentationTools = !segmentationTools">
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="segmentationTools ? arrowUp : arrowDown"
            :style="{ fontSize: '20px' }"
          ></IconifyIconOffline>
        </el-button>
      </div>
      <div v-show="segmentationTools" class="flex flex-wrap gap-1 pt-1 pb-1">
        <imageOperation operation="会诊">
          <diagnosisOutline style="height: 30px; width: 30px"></diagnosisOutline>
        </imageOperation>
        <div class="flex items-center h-16 bg-gray-100 rounded-lg w-14 dark:bg-gray-700">
          <div
            class="flex flex-col items-center justify-center w-10 h-16 rounded-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-cyan-900"
          >
            <layer style="height: 30px; width: 30px"></layer>
            <span class="text-sm text-gray-500 dark:text-white">融合</span>
          </div>
          <div
            style="border-left-width: 1px"
            class="flex items-center h-full text-lg font-extrabold border-0 border-solid rounded-sm cursor-pointer hover:bg-gray-300 border-slate-300"
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
        <imageOperation operation="三维">
          <cube3d style="height: 30px; width: 30px"></cube3d>
        </imageOperation>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<!-- @/store/imageState -->
