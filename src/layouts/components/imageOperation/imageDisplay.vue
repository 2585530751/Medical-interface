<script setup lang="ts">
import { RenderingEngine, Enums, metaData } from '@cornerstonejs/core'
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader'

import uids from '@/utils/helpers/uids.js'
import {
  initDemo,
  createImageIdsAndCacheMetaData,
  setTitleAndDescription
} from '@/utils/helpers/index.js'
import {
  convertMultiframeImageIds,
  prefetchMetadataInformation
} from '@/utils/helpers/convertMultiframeImageIds.js'
import { onMounted } from 'vue'
import type { IStackViewport, RGB } from '@cornerstonejs/core/dist/esm/types'
import OrientationAxis from '@cornerstonejs/core/dist/esm/enums/OrientationAxis'
import createTools from '@/composables/toolsManage'

defineOptions({
  name: ''
})
onMounted(async () => {
  const element: HTMLDivElement = document.getElementById('cornerstone-element') as HTMLDivElement
  await initDemo()
  const { ViewportType } = Enums
  const imageIds = 'wadouri:src/assets/dicom/1.dcm'
  // Instantiate a rendering engine
  const renderingEngineId = 'firstRenderingEngine'
  const renderingEngine = new RenderingEngine(renderingEngineId)
  // Create a stack viewport
  const viewportId = 'CT_STACK'
  const viewportInput = {
    viewportId,
    type: ViewportType.STACK,
    element: element as HTMLDivElement,
    defaultOptions: {
      background: [0.2, 0, 0.2] as RGB,
      orientation: OrientationAxis.SAGITTAL
    }
  }
  renderingEngine.enableElement(viewportInput)
  // Get the stack viewport that was created
  const viewport = renderingEngine.getViewport(viewportInput.viewportId) as IStackViewport
  viewport.setStack(convertMultiframeImageIds([imageIds]))

  viewport.render()
  createTools(viewportId,renderingEngineId,'firstGroupToolsId')
})
</script>

<template>
  <div id="content" class="h-full w-full flex justify-center relative">
    <div id="cornerstone-element" class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped></style>
