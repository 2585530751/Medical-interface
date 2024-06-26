<script setup lang="ts">
import { RenderingEngine, Enums, metaData } from '@cornerstonejs/core'
import cornerstoneDICOMImageLoader from '@cornerstonejs/dicom-image-loader'
import * as cornerstoneTools from '@cornerstonejs/tools'
import uids from '@/utils/helpers/uids.js'
import { initDemo } from '@/utils/helpers/index.js'
import {
  convertMultiframeImageIds,
  prefetchMetadataInformation
} from '@/utils/helpers/convertMultiframeImageIds.js'
import { onMounted } from 'vue'
import type { IStackViewport, RGB } from '@cornerstonejs/core/dist/esm/types'

function createMetadataRow(text: string, metadata: HTMLDivElement | null) {
  const row = document.createElement('div')
  const label = document.createElement('span')
  label.innerHTML = `${text}: `
  const value = document.createElement('span')
  value.id = text.replace(/\s/g, '').toLowerCase()
  row.appendChild(label)
  row.appendChild(value)

  metadata!.appendChild(row)
}

function handleDragOver(evt: DragEvent) {
  evt.stopPropagation()
  evt.preventDefault()
  evt.dataTransfer!.dropEffect = 'copy' // Explicitly show this is a copy.
}

function handleFileChange(e: Event) {
  const target: HTMLInputElement = e.target as HTMLInputElement
  let file: File
  if (target && target.files && target.files.length > 0) {
    file = target.files[0]
    const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(file)
    loadAndViewImage('dicomweb:src/assets/dicom/1.dcm')
  }
}

function handleFileSelect(evt: DragEvent) {
  evt.stopPropagation()
  evt.preventDefault()

  // Get the FileList object that contains the list of files that were dropped
  const files = evt.dataTransfer!.files

  // this UI is only built for a single file so just dump the first one
  const file = files[0]
  const imageId = cornerstoneDICOMImageLoader.wadouri.fileManager.add(file)
  loadAndViewImage(imageId)
}

async function loadAndViewImage(imageId: string) {
  await prefetchMetadataInformation([imageId])
  const stack = convertMultiframeImageIds([imageId])
  // Set the stack on the viewport
  viewport.setStack(stack).then(() => {
    // Set the VOI of the stack
    // viewport.setProperties({ voiRange: ctVoiRange });
    // Render the image
    viewport.render()

    const imageData = viewport.getImageData()

    const { pixelRepresentation, bitsAllocated, bitsStored, highBit, photometricInterpretation } =
      metaData.get('imagePixelModule', imageId)

    const voiLutModule = metaData.get('voiLutModule', imageId)

    const sopCommonModule = metaData.get('sopCommonModule', imageId)
    const transferSyntax = metaData.get('transferSyntax', imageId)

    document.getElementById('transfersyntax')!.innerHTML = transferSyntax.transferSyntaxUID
    document.getElementById('sopclassuid')!.innerHTML = `${sopCommonModule.sopClassUID} [${
      uids[sopCommonModule.sopClassUID as keyof typeof uids]
    }]`
    document.getElementById('sopinstanceuid')!.innerHTML = sopCommonModule.sopInstanceUID
    document.getElementById('rows')!.innerHTML = String(imageData.dimensions[0])
    document.getElementById('columns')!.innerHTML = String(imageData.dimensions[1])
    document.getElementById('spacing')!.innerHTML = imageData.spacing.join('\\')
    document.getElementById('direction')!.innerHTML = imageData.direction
      .map((x: number) => Math.round(x * 100) / 100)
      .join(',')

    document.getElementById('origin')!.innerHTML = imageData.origin
      .map((x) => Math.round(x * 100) / 100)
      .join(',')
    document.getElementById('modality')!.innerHTML = imageData.metadata.Modality

    document.getElementById('pixelrepresentation')!.innerHTML = pixelRepresentation
    document.getElementById('bitsallocated')!.innerHTML = bitsAllocated
    document.getElementById('bitsstored')!.innerHTML = bitsStored
    document.getElementById('highbit')!.innerHTML = highBit
    document.getElementById('photometricinterpretation')!.innerHTML = photometricInterpretation
    document.getElementById('windowcenter')!.innerHTML = voiLutModule.windowCenter
    document.getElementById('windowwidth')!.innerHTML = voiLutModule.windowWidth
  })
}
async function run() {
  // Init Cornerstone and related libraries
  await initDemo()

  cornerstoneTools.addTool(PanTool)
  cornerstoneTools.addTool(WindowLevelTool)
  cornerstoneTools.addTool(StackScrollMouseWheelTool)
  cornerstoneTools.addTool(ZoomTool)

  // Define a tool group, which defines how mouse events map to tool commands for
  // Any viewport using the group
  const toolGroup = ToolGroupManager.createToolGroup(toolGroupId)

  // Add tools to the tool group
  toolGroup!.addTool(WindowLevelTool.toolName)
  toolGroup!.addTool(PanTool.toolName)
  toolGroup!.addTool(ZoomTool.toolName)
  toolGroup!.addTool(StackScrollMouseWheelTool.toolName)

  // Set the initial state of the tools, here all tools are active and bound to
  // Different mouse inputs
  toolGroup!.setToolActive(WindowLevelTool.toolName, {
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

  // Get Cornerstone imageIds and fetch metadata into RAM

  // Instantiate a rendering engine
  const renderingEngineId = 'myRenderingEngine'
  const renderingEngine = new RenderingEngine(renderingEngineId)

  // Create a stack viewport
  const viewportId = 'CT_SAGITTAL_STACK'
  const viewportInput = {
    viewportId,
    type: ViewportType.STACK,
    element: element as HTMLDivElement,
    defaultOptions: {
      background: [0.2, 0, 0.2] as RGB
    }
  }

  renderingEngine.enableElement(viewportInput)

  // Get the stack viewport that was created
  viewport = renderingEngine.getViewport(viewportId) as IStackViewport

  toolGroup!.addViewport(viewportId, renderingEngineId)
}

const {
  PanTool,
  WindowLevelTool,
  StackScrollMouseWheelTool,
  ZoomTool,
  ToolGroupManager,
  Enums: csToolsEnums
} = cornerstoneTools
const { ViewportType } = Enums
const { MouseBindings } = csToolsEnums
const toolGroupId = 'myToolGroup'
let element: HTMLDivElement
let viewport: IStackViewport

onMounted(async () => {
  const content = document.getElementById('content')
  const dropZone = document.getElementById('cornerstone-element') as HTMLDivElement
  const metadata: HTMLDivElement = document.getElementById('metadata') as HTMLDivElement
  element = dropZone
  createMetadataRow('Transfer Syntax', metadata)
  createMetadataRow('SOPClassUID', metadata)
  createMetadataRow('SOPInstanceUID', metadata)
  createMetadataRow('Rows', metadata)
  createMetadataRow('Columns', metadata)
  createMetadataRow('Spacing', metadata)
  createMetadataRow('Direction', metadata)
  createMetadataRow('Origin', metadata)
  createMetadataRow('Modality', metadata)
  createMetadataRow('Pixel Representation', metadata)
  createMetadataRow('Bits Allocated', metadata)
  createMetadataRow('Bits Stored', metadata)
  createMetadataRow('High Bit', metadata)
  createMetadataRow('Photometric Interpretation', metadata)
  createMetadataRow('Window Width', metadata)
  createMetadataRow('Window Center', metadata)
  dropZone!.oncontextmenu = (e) => e.preventDefault()
  dropZone!.addEventListener('dragover', handleDragOver, false)
  dropZone!.addEventListener('drop', handleFileSelect, false)
  await run()
})
</script>

<template>
  <input type="file" id="selectFile" style="margin-bottom: 20px" @change="handleFileChange" />
  <div id="content">
    <div class="flex flex-col">
      <div id="cornerstone-element" style="width: 500px; height: 500px"></div>
      <div id="metadata" style="margin-left: 400px"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>