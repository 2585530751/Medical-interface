<script setup lang="ts">
import type { ImageInfoWindows, SingleImage } from '@/types/image'
import { initDemo } from '@/utils/helpers/index.js'
import registerWebImageLoader from '@/utils/helpers/registerWebImageLoader'
import hardcodedMetaDataProvider from '@/utils/helpers//hardcodedMetaDataProvider'
import type { Types } from '@cornerstonejs/core'
import { defineProps, defineOptions, onMounted, watch, ref, reactive, onUnmounted } from 'vue'
import { generateImageUrl } from '@/composables/image/utils'
import { imageKeyValueStore } from '@/composables/image/imageKeyValueStore'
import { createViewportColorbar } from '@/composables/image/imageOperate'
// import {type ViewportColorbar} from '@cornerstonejs/tools/src/utilities/voi/colorbar/ViewportColorbar'
import { Enums as csToolsEnums, segmentation, utilities as cstUtils } from '@cornerstonejs/tools'
import { api } from 'dicomweb-client'
import {
  RenderingEngine,
  Enums,
  imageLoader,
  metaData,
  getRenderingEngine,
  volumeLoader,
  cache
} from '@cornerstonejs/core'
import { useImageStateStore } from '@/store/imageState'
import { message } from '@/utils/message'

defineOptions({
  name: 'stackViewPortWindows'
})
const props = defineProps<{
  imagesInfoWindows: ImageInfoWindows | 0
  index: number
}>()
const imageIds: string[] = []
const { ViewportType } = Enums
const imageStateStore = useImageStateStore()
let elementId = ref('cornerstone-element-' + props.index)
const viewportId = 'stackViewPort' + props.index
const renderingEngine = imageStateStore.renderingEngine
let colorbarContainerId = ref('colorbarContainer' + props.index)
var segmentationId = ''
const segmentationContourId = imageStateStore.segmentationId + 'Contour'
const checkLabelmapSegmentationToolName = [
  'CircularBrush',
  'CircularEraser',
  'CircleScissor',
  'RectangleScissor',
  'ThresholdCircle',
  'ScissorsEraser',
  'PaintFill'
]
const checkContourSegmentationToolName = [
  'PlanarFreehandContourSegmentationTool',
  'LivewireContourSegmentationTool',
  'BSplineSegmentation',
  'LinearSplineSegmentation',
  'CatmullRomSplineSegmentation',
  'CardinalSplineSegmentation'
]

onMounted(async () => {
  await renderStackViewport()
})

onUnmounted(() => {
  if (props.imagesInfoWindows != 0) {
    renderingEngine.disableElement(viewportId)
  }
})

watch(
  () => props.imagesInfoWindows,
  (newValue, oldValue) => {
    if (oldValue !== 0) {
      if (JSON.stringify(newValue) != JSON.stringify(oldValue)&&newValue!=0) {
        imageStateStore.viewportColorbar[props.index].destroy()
        renderingEngine.disableElement(viewportId)
        imageIds.length = 0
        renderStackViewport()
      }
    } else {
      imageIds.length = 0
      renderStackViewport()
    }
  },
  {
    deep: true
  }
)

function constructImagesId() {
  var singleImageIndex = 0
  if (props.imagesInfoWindows != 0) {
    const temporarySingleImage = props.imagesInfoWindows.singleImage
    props.imagesInfoWindows.imageInfo.singleImageList.forEach((item: SingleImage) => {
      var temporarySingleImagePath
      if (item.modelType === 'model') {
        temporarySingleImagePath = generateImageUrl(
          item.singleImageModelData.modelResultPath
        ) as string
      } else {
        temporarySingleImagePath = generateImageUrl(item.singleImagePath) as string
      }
      imageKeyValueStore.set(temporarySingleImagePath, item)
      imageIds.push(temporarySingleImagePath)
      if (temporarySingleImage && temporarySingleImage.singleImageId === item.singleImageId) {
        singleImageIndex = imageIds.length - 1
      }
    })
  }
  return singleImageIndex
}

async function selectImagesListWindows(event: Event) {
  imageStateStore.selectImagesListWindows = props.index
  if (props.imagesInfoWindows != 0) {
    if (checkLabelmapSegmentationToolName.includes(imageStateStore.leftMouseActive)) {
      if (imageStateStore.segmentationRepresentationUIDList.get(segmentationId)) {
        console.log(segmentation.state.getSegmentationIdRepresentations(segmentationId))
        console.log(
          imageStateStore.segmentationRepresentationUIDList.get(
            imageStateStore.segmentationId + props.imagesInfoWindows.imageInfo.imageId
          )
        )
        console.log(
          segmentation.activeSegmentation.getActiveSegmentation(imageStateStore.toolGroup.id)
        )
        console.log(segmentation.state.getSegmentationRepresentations(imageStateStore.toolGroup.id))
      } else {
        message('未添加Labelmap分割层，无需使用该分割工具。', { type: 'error' })
        event.preventDefault()
        event.stopPropagation()
      }
    }
    if (checkContourSegmentationToolName.includes(imageStateStore.leftMouseActive)) {
      if (!imageStateStore.segmentationRepresentationUIDList.get(segmentationContourId)) {
        message('未切换为Contour分割层，无需使用该分割工具。', { type: 'error' })
        event.preventDefault()
        event.stopPropagation()
      }
    }
  }
}

async function handleMouseEnter() {
  if (props.imagesInfoWindows != 0) {
    if (checkLabelmapSegmentationToolName.includes(imageStateStore.leftMouseActive)) {
      if (imageStateStore.segmentationRepresentationUIDList.get(segmentationId)) {
        const segmentationRepresentationUID =
          imageStateStore.segmentationRepresentationUIDList.get(segmentationId)
        await segmentation.activeSegmentation.setActiveSegmentationRepresentation(
          imageStateStore.toolGroup.id,
          segmentationRepresentationUID
        )
        cstUtils.segmentation.triggerSegmentationRender(imageStateStore.toolGroup.id)
      } else {
        imageStateStore.toolGroup.setToolPassive(imageStateStore.leftMouseActive)
      }
    }
  }
  if (checkContourSegmentationToolName.includes(imageStateStore.leftMouseActive)) {
    if (imageStateStore.segmentationRepresentationUIDList.get(segmentationContourId)) {
      const segmentationRepresentationUID =
        imageStateStore.segmentationRepresentationUIDList.get(segmentationContourId)
      await segmentation.activeSegmentation.setActiveSegmentationRepresentation(
        imageStateStore.toolGroup.id,
        segmentationRepresentationUID
      )
      cstUtils.segmentation.triggerSegmentationRender(imageStateStore.toolGroup.id)
    } else {
      imageStateStore.toolGroup.setToolPassive(imageStateStore.leftMouseActive)
    }
  }
}
function handleMouseLeave() {
  imageStateStore.toolGroup.setToolActive(imageStateStore.leftMouseActive, {
    bindings: [
      {
        mouseButton: csToolsEnums.MouseBindings.Primary // Left Click
      }
    ]
  })
}

async function renderStackViewport() {
  if (props.imagesInfoWindows != 0) {
    const element: HTMLDivElement = document.getElementById(elementId.value) as HTMLDivElement
    const singleImageIndex = constructImagesId()
    var viewport = getRenderingEngine(imageStateStore.renderingEngine.id)!.getViewport(
      viewportId
    ) as Types.IStackViewport
    if (!viewport) {
      
      const viewportInput = {
        viewportId: viewportId,
        type: ViewportType.STACK,
        element: element as HTMLDivElement
      }
      renderingEngine.enableElement(viewportInput)
      viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)
      registerWebImageLoader(imageLoader)
      metaData.addProvider(
        // @ts-ignore
        (type, imageId) => hardcodedMetaDataProvider(type, imageId, imageIds),
        10000
      )
      const colorbar: any = createViewportColorbar(
        props.index,
        elementId.value,
        colorbarContainerId.value
      )
      imageStateStore.viewportColorbar[props.index] = colorbar
      imageStateStore.toolGroup.addViewport(viewportId, renderingEngine.id)
      // 创建一个新的 ResizeObserver 实例
      let ro = new ResizeObserver((entries) => {
        setTimeout(() => {
          viewport.resize()
          renderingEngine.resize(true, true)
        }, 100) // 延迟1000毫秒后调用
      })
      ro.observe(element)
    }
    await viewport.setStack(imageIds, singleImageIndex)
    viewport.render()
    cstUtils.stackContextPrefetch.enable(viewport.element)
    imageStateStore.viewports[props.index] = viewport
    segmentationId = imageStateStore.segmentationId + props.imagesInfoWindows.imageInfo.imageId
  }
}
</script>

<template>
  <div
    class="flex justify-between border-stone-200"
    :class="{ highlighted: imageStateStore.selectImagesListWindows === props.index }"
  >
    <div
      :id="elementId"
      class="w-full h-full"
      @click="selectImagesListWindows"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousemove="null"
    ></div>
    <div :id="colorbarContainerId" class="w-2 h-full colorbar-container"></div>
  </div>
</template>

<style lang="scss" scoped>
/* 定义普通模式下的样式 */
.highlighted {
  /* 设置边框样式 */
  border: 2px dashed #00d3f8a4; /* 边框宽度、样式和颜色 */
  /* 设置圆角 */
  border-radius: 5px; /* 圆角的半径 */
}
.colorbar-container {
  position: relative;
  box-sizing: border-box;
  cursor: initial;
}
</style>
