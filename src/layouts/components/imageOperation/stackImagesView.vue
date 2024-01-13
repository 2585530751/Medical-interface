<script setup lang="ts">
import { RenderingEngine, Enums } from '@cornerstonejs/core'
import type IStackViewport from '@cornerstonejs/core/src/types/IStackViewport'
import { initDemo, setCtTransferFunctionForVolumeActor } from '@/utils/helpers/index.js'
import { onMounted } from 'vue'
import type { RGB } from '@cornerstonejs/core/src/types/'
import createTools from '@/composables/toolsManage'
import { convertMultiframeImageIds } from '@/utils/helpers/convertMultiframeImageIds';

defineOptions({
  name: ''
})

onMounted(async () => {
  const element: HTMLDivElement = document.getElementById('cornerstone-element') as HTMLDivElement
  // Disable right click context menu so we can have right click tools
  element.oncontextmenu = (e) => e.preventDefault()
  await initDemo()
  const { ViewportType } = Enums
  const imageIds = [
    'wadouri:src/assets/dicom/1-01.dcm',
    'wadouri:src/assets/dicom/1-02.dcm',
    'wadouri:src/assets/dicom/1-03.dcm',
    'wadouri:src/assets/dicom/1-04.dcm',
    'wadouri:src/assets/dicom/1-05.dcm',
    'wadouri:src/assets/dicom/1-06.dcm',
    'wadouri:src/assets/dicom/1-07.dcm',
    'wadouri:src/assets/dicom/1-08.dcm',
    'wadouri:src/assets/dicom/1-09.dcm',
    'wadouri:src/assets/dicom/1-10.dcm',
    'wadouri:src/assets/dicom/1-11.dcm',
    'wadouri:src/assets/dicom/1-12.dcm',
    'wadouri:src/assets/dicom/1-13.dcm',
    'wadouri:src/assets/dicom/1-14.dcm',
    'wadouri:src/assets/dicom/1-15.dcm',
    'wadouri:src/assets/dicom/1-16.dcm',
    'wadouri:src/assets/dicom/1-17.dcm',
    'wadouri:src/assets/dicom/1-18.dcm',
    'wadouri:src/assets/dicom/1-19.dcm',
    'wadouri:src/assets/dicom/1-20.dcm',
    'wadouri:src/assets/dicom/1-21.dcm',
    'wadouri:src/assets/dicom/1-22.dcm',
    'wadouri:src/assets/dicom/1-23.dcm',
    'wadouri:src/assets/dicom/1-24.dcm',
    'wadouri:src/assets/dicom/1-25.dcm',
    'wadouri:src/assets/dicom/1-26.dcm',
    'wadouri:src/assets/dicom/1-27.dcm',
    'wadouri:src/assets/dicom/1-28.dcm',
    'wadouri:src/assets/dicom/1-29.dcm',
    'wadouri:src/assets/dicom/1-30.dcm'
  ]
  // Instantiate a rendering engine
  const renderingEngineId = 'stackImagesRenderingEngine'
  const renderingEngine = new RenderingEngine(renderingEngineId)

  // Create a stack viewport
  const viewportId = 'CT_SAGITTAL_STACK'
  const viewportInput = {
    viewportId,
    type: ViewportType.STACK,
    element: element as HTMLDivElement,
    defaultOptions: {
      background: [0.2, 0, 0.2] as RGB,
    }
  }
  renderingEngine.enableElement(viewportInput)

  // Get the stack viewport that was created
  const viewport1  =renderingEngine.getViewport(viewportInput.viewportId) as IStackViewport
  viewport1.setStack(imageIds).then(() => {
    viewport1.render()
  })
 
  window.addEventListener('resize', () => {
    renderingEngine.resize(true, true)
  })
  console.log(viewport1.getDisplayArea())

  // 创建一个新的 ResizeObserver 实例
  let ro = new ResizeObserver((entries) => {
    // 这个函数会在被观察元素的大小发生变化时被调用
    renderingEngine.resize(true, true)
  })
  ro.observe(element)
})
</script>

<template>
  <div id="content" class="relative flex justify-center w-full h-full">
    <div id="cornerstone-element" class="w-full h-full"></div>
  </div>
</template>

<style lang="scss" scoped></style>
