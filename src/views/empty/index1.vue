<script setup lang="ts">
import { RenderingEngine, Enums } from '@cornerstonejs/core'
import type { Types } from '@cornerstonejs/core'
import {
  initDemo,
  createImageIdsAndCacheMetaData,
  setTitleAndDescription,
  ctVoiRange
} from '@/utils/helpers'
import { onMounted } from 'vue'
import { convertMultiframeImageIds } from '@/utils/helpers/convertMultiframeImageIds';

const { ViewportType } = Enums

const content = document.getElementById('content')
var element: any
// ============================= //
onMounted(async () => {
  element = document.getElementById('cornerstone-element')
  await run()
})
/**
 * Runs the demo
 */
async function run() {
  // Init Cornerstone and related libraries
  await initDemo()

  // Get Cornerstone imageIds and fetch metadata into RAM
  const imageIds = await createImageIdsAndCacheMetaData({
    StudyInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.334240657131972136850343327463',
    SeriesInstanceUID: '1.3.6.1.4.1.14519.5.2.1.7009.2403.226151125820845824875394858561',
    wadoRsRoot: 'https://d3t6nz73ql33tx.cloudfront.net/dicomweb'
  })

  // Instantiate a rendering engine
  const renderingEngineId = 'myRenderingEngine'
  const renderingEngine = new RenderingEngine(renderingEngineId)

  // Create a stack viewport
  const viewportId = 'CT_SAGITTAL_STACK'
  const viewportInput = {
    viewportId,
    type: ViewportType.STACK,
    element,
    defaultOptions: {
      background: <Types.Point3>[0.2, 0, 0.2]
    }
  }

  renderingEngine.enableElement(viewportInput)

  // Get the stack viewport that was created
  const viewport = <Types.IStackViewport>renderingEngine.getViewport(viewportId)

  // Define a stack containing a single image
  const stack = [imageIds[0]]
  console.log(imageIds[0])
  // Set the stack on the viewport
  viewport.setStack(convertMultiframeImageIds(stack))

  // Set the VOI of the stack
  viewport.setProperties({ voiRange: ctVoiRange })
}
</script>

<template>
  <div id="content">
    <div class="flex flex-col">
      <div id="cornerstone-element" style="width: 500px; height: 500px">
        <div id="lastEventsDiv"></div>
      </div>
      <div id="metadata" style="margin-left: 400px"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
