<script setup lang="ts">
import { RenderingEngine, Enums } from '@cornerstonejs/core'
import type IStackViewport from '@cornerstonejs/core/src/types/IStackViewport'
import { initDemo, setCtTransferFunctionForVolumeActor } from '@/utils/helpers/index.js'
import { onMounted } from 'vue'
import type { RGB } from '@cornerstonejs/core/src/types/'
import createTools from '@/composables/toolsManage'
import * as cornerstoneTools from '@cornerstonejs/tools'
import { viewport } from '@cornerstonejs/tools/src/utilities'

defineOptions({
  name: ''
})

const {
  PanTool,
  WindowLevelTool,
  StackScrollMouseWheelTool,
  ZoomTool,
  PlanarRotateTool,
  ToolGroupManager,
  Enums: csToolsEnums
} = cornerstoneTools

const { ViewportType } = Enums
const { MouseBindings } = csToolsEnums

const toolGroupId = 'STACK_TOOL_GROUP_ID'
const leftClickTools = [WindowLevelTool.toolName, PlanarRotateTool.toolName]
const defaultLeftClickTool = leftClickTools[0]


const toolGroup = ToolGroupManager.getToolGroup(toolGroupId)


onMounted(async () => {
  const element: HTMLDivElement = document.getElementById('cornerstone-element') as HTMLDivElement
  const element1: HTMLDivElement = document.getElementById('cornerstone-element1') as HTMLDivElement
  // Disable right click context menu so we can have right click tools
  element.oncontextmenu = (e) => e.preventDefault()
  await initDemo()

  // Add tools to Cornerstone3D
  cornerstoneTools.addTool(PanTool)
  cornerstoneTools.addTool(WindowLevelTool)
  cornerstoneTools.addTool(StackScrollMouseWheelTool)
  cornerstoneTools.addTool(ZoomTool)
  cornerstoneTools.addTool(PlanarRotateTool)

  // Define a tool group, which defines how mouse events map to tool commands for
  // Any viewport using the group
  const toolGroup = ToolGroupManager.createToolGroup(toolGroupId)

  // Add tools to the tool group
  toolGroup!.addTool(WindowLevelTool.toolName)
  toolGroup!.addTool(PanTool.toolName)
  toolGroup!.addTool(ZoomTool.toolName)
  toolGroup!.addTool(StackScrollMouseWheelTool.toolName, { loop: false })
  toolGroup!.addTool(PlanarRotateTool.toolName)

  // Set the initial state of the tools, here all tools are active and bound to
  // Different mouse inputs
  toolGroup!.setToolActive(defaultLeftClickTool, {
    bindings: [
      {
        mouseButton: MouseBindings.Primary // Left Click
      }
    ]
  })
  toolGroup!.setToolActive(PanTool.toolName, {
    bindings: [
      {
        mouseButton: MouseBindings.Auxiliary // Middle Click
      }
    ]
  })
  toolGroup!.setToolActive(ZoomTool.toolName, {
    bindings: [
      {
        mouseButton: MouseBindings.Secondary // Right Click
      }
    ]
  })

  // As the Stack Scroll mouse wheel is a tool using the `mouseWheelCallback`
  // hook instead of mouse buttons, it does not need to assign any mouse button.
  toolGroup!.setToolActive(StackScrollMouseWheelTool.toolName)

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
  const viewportId1 = 'CT_SAGITTAL_STACK1'
  const viewportInput = {
    viewportId: viewportId,
    type: ViewportType.STACK,
    element: element as HTMLDivElement,
    defaultOptions: {
      background: [0.2, 0, 0.2] as RGB
    }
  }
  const viewportInput1 = {
    viewportId: viewportId1,
    type: ViewportType.STACK,
    element: element1 as HTMLDivElement,
    defaultOptions: {
      background: [0.2, 0, 0.2] as RGB
    }
  }
  renderingEngine.enableElement(viewportInput)
  renderingEngine.enableElement(viewportInput1)
  // Get the stack viewport that was created
  const viewport = renderingEngine.getViewport(viewportInput.viewportId) as IStackViewport
  viewport.setStack(imageIds).then(() => {
    viewport.render()
  })
  const viewport1 = renderingEngine.getViewport(viewportInput1.viewportId) as IStackViewport
  viewport1.setStack(imageIds).then(() => {
    viewport1.render()
  })
  window.addEventListener('resize', () => {
    renderingEngine.resize(true, true)
    console.log(viewport.getCurrentImageIdIndex())
    console.log(viewport.getImageData())
    console.log(viewport.getCanvas())
    viewport.addActors(viewport1.getActors())
    viewport.render()
    console.log(viewport._actors)
  })
  console.log(viewport.getDisplayArea())

  // 创建一个新的 ResizeObserver 实例
  let ro = new ResizeObserver((entries) => {
    // 这个函数会在被观察元素的大小发生变化时被调用
    renderingEngine.resize(true, true)
  })
  ro.observe(element)
  // Set the tool group on the viewport
  toolGroup!.addViewport(viewportId, renderingEngineId)
  cornerstoneTools.utilities.stackPrefetch.enable(viewport.element);
})


</script>

<template>
  <div id="content" class="relative flex justify-center w-full h-full">
    <div id="cornerstone-element" class="w-1/2 h-full "></div>
  </div>
  <el-button type="primary" @click="() => $router.push('/imageOperation')">返回</el-button>
</template>

<style lang="scss" scoped></style>
