<script setup lang="ts">
import { isDark } from '@/composables'
import dayIcon from '@/assets/svg/day.svg?component'
import darkIcon from '@/assets/svg/dark.svg?component'
import askAi from '@/assets/svg/ask-ai.svg'
import addSegemntation from '@/assets/svg/addSegmentation.svg'
import segmentationSwitch from '@/assets/svg/segmentationSwitch.svg'
import cpatureImage from '@/assets/svg/capture.svg'
import type { IconifyIconOffline } from '@/components/ReIcon'
import back from '@iconify-icons/ep/back'
import setting from '@iconify-icons/ep/setting'
import Emessage from '@iconify-icons/ep/message'
import { useImageStateStore } from '@/store/imageState'
import { onMounted, reactive, ref } from 'vue'
import downloadImage from '@/layouts/components/imageOperation/downloadImage.vue'
import { message } from '@/utils/message'

import {
  imageLoader,
  Enums,
  cache,
  getRenderingEngine,
  utilities as csUtils,
  volumeLoader,
  StackViewport,
  VolumeViewport,
  setVolumesForViewports
} from '@cornerstonejs/core'
import type { Types } from '@cornerstonejs/core'
import * as cornerstoneTools from '@cornerstonejs/tools'
import type { ImageInfo, ImageInfoWindows } from '@/types/image'

const centerDialogVisible = ref(false)

const imageStateStore = useImageStateStore()
const { ViewportType } = Enums
const {
  PanTool,
  ZoomTool,
  SegmentationDisplayTool,
  ToolGroupManager,
  BrushTool,
  StackScrollMouseWheelTool,
  segmentation,
  Enums: csToolsEnums,
  utilities: cstUtils
} = cornerstoneTools

const segmentationRepresentationType = ref('Contour')
const segmentationRepresentationLabelmaps = reactive([])

onMounted(async () => {
  await addContourSegmentation(imageStateStore.segmentationId + 'Contour')
})
const centerDialogVisible1 = ref(false)

async function switchSegmentationRepresentation() {
  const stackViewport: Types.IStackViewport = imageStateStore.viewports[
    imageStateStore.selectImagesListWindows
  ] as Types.IStackViewport
  const imageInfoWindows = imageStateStore.imagesListWindows[
    imageStateStore.selectImagesListWindows
  ] as ImageInfoWindows

  const segmentationId = imageStateStore.segmentationId + imageInfoWindows.imageInfo.imageId
  const segmentationContourId = imageStateStore.segmentationId + 'Contour'

  if (segmentationRepresentationType.value === 'Contour') {
    segmentation.state.removeSegmentationRepresentation(
      imageStateStore.toolGroup.id,
      segmentationContourId
    )
    imageStateStore.segmentationRepresentationUIDList.delete(segmentationContourId)

    segmentationRepresentationType.value = 'Labelmap'
  } else {
    for (const segmentationRepresentationLabelmap of segmentationRepresentationLabelmaps) {
      segmentation.state.removeSegmentationRepresentation(
        imageStateStore.toolGroup.id,
        segmentationRepresentationLabelmap
      )
      console.log(segmentationRepresentationLabelmap)
      imageStateStore.segmentationRepresentationUIDList.delete(segmentationRepresentationLabelmap)
      console.log(
        imageStateStore.segmentationRepresentationUIDList.has(segmentationRepresentationLabelmap)
      )
    }
    console.log(imageStateStore.segmentationRepresentationUIDList)
    segmentationRepresentationLabelmaps.length = 0
    await addContourSegmentation(segmentationContourId)
    segmentationRepresentationType.value = 'Contour'
  }
}

async function checkAddStackSegmentation() {
  const stackViewport: Types.IStackViewport = imageStateStore.viewports[
    imageStateStore.selectImagesListWindows
  ] as Types.IStackViewport
  const imageInfoWindows = imageStateStore.imagesListWindows[
    imageStateStore.selectImagesListWindows
  ] as ImageInfoWindows

  const segmentationId = imageStateStore.segmentationId + imageInfoWindows.imageInfo.imageId
  const segmentationContourId = imageStateStore.segmentationId + 'Contour'

  if (
    stackViewport.getCurrentImageId().endsWith('.png') ||
    stackViewport.getCurrentImageId().endsWith('.jpg') ||
    stackViewport.getCurrentImageId().endsWith('.jpeg')
  ) {
    message('暂时无法为PNG/JPG格式切换为Labelmap分割层', { type: 'error' })
    return
  }

  if (imageStateStore.segmentationRepresentationUIDList.get(segmentationId)) {
    message('该视窗已经是Labelmap分割层。', { type: 'error' })
    return
  } else {
    segmentationRepresentationLabelmaps.push(segmentationId)
    await addStackSegmentation(stackViewport, segmentationId)
    message('成功将分割层切换为Labelmap分割层。！', { type: 'success' })
  }
}

async function addStackSegmentation(viewport: Types.IStackViewport, segmentationId: string) {
  const { imageIds: segmentationImageIds } = await imageLoader.createAndCacheDerivedImages(
    viewport.getImageIds()
  )
  if (!segmentation.state.getSegmentation(segmentationId)) {
    await segmentation.addSegmentations([
      {
        segmentationId,
        representation: {
          type: csToolsEnums.SegmentationRepresentations.Labelmap,
          data: {
            imageIdReferenceMap: cstUtils.segmentation.createImageIdReferenceMap(
              viewport.getImageIds(),
              segmentationImageIds
            )
          }
        }
      }
    ])
  }
  const segmentationRepresentationUID = await segmentation.addSegmentationRepresentations(
    imageStateStore.toolGroup.id,
    [
      {
        segmentationId,
        type: csToolsEnums.SegmentationRepresentations.Labelmap
      }
    ]
  )
  cstUtils.segmentation.triggerSegmentationRender(imageStateStore.toolGroup.id)
  imageStateStore.segmentationRepresentationUIDList.set(
    segmentationId,
    segmentationRepresentationUID[0]
  )
  segmentation.activeSegmentation.setActiveSegmentationRepresentation(
    imageStateStore.toolGroup.id,
    segmentationRepresentationUID[0]
  )
}

async function addContourSegmentation(segmentationId: string) {
  if (!segmentation.state.getSegmentation(segmentationId)) {
    // Add a segmentation that will contains the contour annotations
    segmentation.addSegmentations([
      {
        segmentationId,
        representation: {
          type: csToolsEnums.SegmentationRepresentations.Contour
        }
      }
    ])
  }
  // Create a segmentation representation associated to the toolGroupId
  const segmentationRepresentationUIDs = await segmentation.addSegmentationRepresentations(
    imageStateStore.toolGroup.id,
    [
      {
        segmentationId,
        type: csToolsEnums.SegmentationRepresentations.Contour
      }
    ]
  )
  cstUtils.segmentation.triggerSegmentationRender(imageStateStore.toolGroup.id)
  // Make the segmentation created as the active one
  segmentation.activeSegmentation.setActiveSegmentationRepresentation(
    imageStateStore.toolGroup.id,
    segmentationRepresentationUIDs[0]
  )
  imageStateStore.segmentationRepresentationUIDList.set(
    segmentationId,
    segmentationRepresentationUIDs[0]
  )
}

function removeStackSegmentation(segmentationId: string) {
  // segmentation.state.removeSegmentationRepresentation(
  //   imageStateStore.toolGroup.id,
  //   imageStateStore.segmentationRepresentationUIDList[imageStateStore.selectImagesListWindows]
  // )
  segmentation.state.removeSegmentationRepresentations(imageStateStore.toolGroup.id)
  segmentation.state.removeSegmentation(segmentationId)
}

// async function switchStackViewportToVolumeViewport() {
//   if (
//     !segmentation.state.getSegmentation(
//       imageStateStore.segmentationId + imageStateStore.selectImagesListWindows
//     )
//   ) {
//     await addStackSegmentation(
//       imageStateStore.viewports[imageStateStore.selectImagesListWindows] as Types.IStackViewport,
//       imageStateStore.segmentationId + imageStateStore.selectImagesListWindows
//     )
//   }

//   const segmentationId = imageStateStore.segmentationId + imageStateStore.selectImagesListWindows
//   const viewport = imageStateStore.viewports[imageStateStore.selectImagesListWindows]
//   let newViewport: Types.IVolumeViewport | Types.IStackViewport
//   console.log(viewport.type)
//   if (viewport.type === ViewportType.STACK) {
//     const volumeId = 'cornerstoneStreamingImageVolume' + imageStateStore.selectImagesListWindows
//     console.log(volumeId)
//     newViewport = (await csUtils.convertStackToVolumeViewport({
//       viewport: viewport as Types.IStackViewport,
//       options: {
//         background: <Types.Point3>[0, 0.4, 0],
//         volumeId: volumeId
//       }
//     })) as Types.IVolumeViewport

//     if (imageStateStore.toolGroup) {
//       imageStateStore.toolGroup.addViewport(newViewport.id, imageStateStore.renderingEngine.id)
//     }
//     await segmentation.convertStackToVolumeSegmentation({
//       segmentationId,
//       options: {
//         toolGroupId: imageStateStore.toolGroup.id,
//         volumeId: volumeId
//       }
//     })
//     if (imageStateStore.toolGroup) {
//       imageStateStore.toolGroup.addViewport(newViewport.id, imageStateStore.renderingEngine.id)
//     }
//     console.log(cache.getVolume(volumeId))
//   } else {
//     // await segmentation.state.removeSegmentationRepresentation(
//     //   imageStateStore.toolGroup.id,
//     //   imageStateStore.segmentationRepresentationUIDList[imageStateStore.selectImagesListWindows]
//     // )
//     segmentation.state.removeSegmentationRepresentations(imageStateStore.toolGroup.id)
//     setTimeout(async () => {
//       segmentation.convertVolumeToStackSegmentation({
//         segmentationId,
//         options: {
//           toolGroupId: imageStateStore.toolGroup.id
//         }
//       })

//       newViewport = (await csUtils.convertVolumeToStackViewport({
//         viewport: viewport as Types.IVolumeViewport,
//         options: {
//           background: <Types.Point3>[0, 0, 0]
//         }
//       })) as Types.IStackViewport

//       // Set the tool group on the viewport
//       if (imageStateStore.toolGroup) {
//         imageStateStore.toolGroup.addViewport(newViewport.id, imageStateStore.renderingEngine.id)
//       }
//       imageStateStore.viewports[imageStateStore.selectImagesListWindows] = newViewport
//     }, 1000)
//     // cache.getVolume('cornerstoneStreamingImageVolume' + imageStateStore.selectImagesListWindows).destroy()
//   }
// }
</script>

<template>
  <div
    class="flex justify-between w-full h-10 border border-t-0 border-gray-200 border-solid shadow-md border-x-0 dark:border-gray-700 dark:bg-gray-800"
  >
    <div class="flex flex-wrap items-center justify-center h-10 gap-1 pl-2">
      <el-button text>
        <template #icon>
          <IconifyIconOffline :icon="back"></IconifyIconOffline>
        </template>
        返回
      </el-button>
    </div>
    <div class="flex items-center justify-center">
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
          <el-button text @click="addContourSegmentation('segementationIdContour')">
            <askAi style="height: 25px; width: 25px"></askAi>
          </el-button>
        </el-tooltip>

        <el-tooltip
          :content="segmentationRepresentationType == 'Contour' ? '切换Labelmap' : '切换Contour'"
          placement="bottom"
          effect="light"
        >
          <el-button text @click="centerDialogVisible1 = true">
            <segmentationSwitch style="height: 25px; width: 25px"></segmentationSwitch>
          </el-button>
        </el-tooltip>
        <el-tooltip  content="添加分割层" placement="bottom" effect="light">
          <el-button text @click="checkAddStackSegmentation()" v-show="segmentationRepresentationType == 'Labelmap'">
            <addSegemntation style="height: 25px; width: 25px"></addSegemntation>
          </el-button>
        </el-tooltip>
        <el-tooltip content="下载" placement="bottom" effect="light">
          <el-button text>
            <cpatureImage
              style="height: 25px; width: 25px"
              @click="centerDialogVisible = true"
            ></cpatureImage>
          </el-button>
        </el-tooltip>
      </el-button-group>
    </div>

    <div class="flex items-center justify-center h-10">
      <el-button-group>
        <el-tooltip content="意见反馈" placement="bottom" effect="light">
          <el-button text>
            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="Emessage"
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
    <downloadImage
      :download-window-open="centerDialogVisible"
      @download-window-close="centerDialogVisible = false"
    ></downloadImage>
    <el-dialog v-model="centerDialogVisible1" title="提示" width="500" center>
      <span v-show="segmentationRepresentationType==='Contour'"> 将分割层切化为Labelmap形式，会使原来的Contour形式的分割层的内容转变为注释形式，并且需要您选择性的为视窗添加Labelmap分割层。您确定要进行切化为Labelmap分割层吗？ </span>
      <span v-show="segmentationRepresentationType==='Labelmap'"> 将分割层切化为Contour形式，会固定原来的Labelmap形式的分割层的内容，使之不可修改，同时为所有视窗添加Contour分割层。您确定要进行切化为Contour分割层吗？</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="centerDialogVisible1 = false,switchSegmentationRepresentation()"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
