<script setup lang="ts">
import {
  RenderingEngine,
  Enums,
  imageLoader,
  metaData,
  getRenderingEngine,
  volumeLoader
} from '@cornerstonejs/core'
import type { Types } from '@cornerstonejs/core'

import { initDemo, setCtTransferFunctionForVolumeActor } from '@/utils/helpers/index.js'
import { onMounted, reactive } from 'vue'
import type { RGB } from '@cornerstonejs/core/src/types/'
import OrientationAxis from '@cornerstonejs/core/src/enums/OrientationAxis'
import createTools from '@/composables/toolsManage'
import hardcodedMetaDataProvider from '@/utils/helpers//hardcodedMetaDataProvider'
import registerWebImageLoader from '@/utils/helpers/registerWebImageLoader'
import { useImageStateStore } from '@/store/imageState'
import { generateImageUrl } from '@/composables/image/utils'
import {imageKeyValueStore} from '@/composables/image/imageKeyValueStore'

const imageStateStore = useImageStateStore()
const imagesLists = reactive([])
const imageIds: string[] = reactive([])
if (imageStateStore.checkSingleImage) {
  imageIds.push(generateImageUrl(imageStateStore.imageList.singleImagePath))
} else {
  imageStateStore.imagesList.singleImageList.forEach((item: any) => {
    const temporarySingleImagePath = generateImageUrl(item.singleImagePath)
    imageKeyValueStore.set(temporarySingleImagePath,item)
    imageIds.push(temporarySingleImagePath)
  })
}

onMounted(async () => {
  const element: HTMLDivElement = document.getElementById('cornerstone-element') as HTMLDivElement
  // Disable right click context menu so we can have right click tools
  element.oncontextmenu = (e) => e.preventDefault()
  await initDemo()
  const { ViewportType } = Enums
  registerWebImageLoader(imageLoader)
  metaData.addProvider(
    // @ts-ignore
    (type, imageId) => hardcodedMetaDataProvider(type, imageId, imageIds),
    10000
  )
  // Instantiate a rendering engine
  const renderingEngineId = 'firstRenderingEngine'
  const renderingEngine = new RenderingEngine(renderingEngineId)
  // Create a stack viewport
  const viewportId = 'CT_SAGITTAL_STACK'
  const viewportInputArray = [
    {
      viewportId: viewportId,
      type: ViewportType.STACK,
      element: element as HTMLDivElement
    }
  ]
  renderingEngine.setViewports(viewportInputArray)

  // render stack viewport
  const stackViewports = renderingEngine.getStackViewports()[0]
  stackViewports.setStack(imageIds)
  // renderingEngine.getStackViewports()[0].setStack(imageIds)

  // // render volume viewports
  // renderingEngine.render()
  stackViewports.render()
  createTools(viewportId, renderingEngineId, 'firstGroupToolsId')

  window.addEventListener('resize', () => {
    renderingEngine.resize(true, true)
  })

  // 创建一个新的 ResizeObserver 实例
  let ro = new ResizeObserver((entries) => {
    setTimeout(() => {  
      stackViewports.resize()
    renderingEngine.resize(true, true);  
  }, 100); // 延迟1000毫秒后调用  
  })
  ro.observe(element)

  imageStateStore.renderingEngine = renderingEngine
  imageStateStore.viewports[0] = stackViewports
  console.log(imageStateStore.viewports[0])
})
</script>

<template>
  <div id="content" class="relative flex justify-center w-full h-full">
    <div id="cornerstone-element" class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped></style>
