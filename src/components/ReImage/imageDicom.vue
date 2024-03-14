<script setup lang="ts">
import type { SingleImage } from '@/types/image'
import { useImageStateStore } from '@/store/imageState'
import { generateImageUrl } from '@/composables/image/utils'
import type IStackViewport from '@cornerstonejs/core/src/types/IStackViewport'
import { Enums } from '@cornerstonejs/core'
import { ref, onMounted, onUnmounted } from 'vue'
const props = defineProps<{
  singleImage: SingleImage
}>()
const imageIds: string[] = []
const { ViewportType } = Enums
const imageStateStore = useImageStateStore()
let elementId = ref('cornerstone-element-imageDicom-' + props.singleImage.singleImageId)
const viewportId = 'stackViewPort-imageDicom-' + props.singleImage.singleImageId
const renderingEngine = imageStateStore.renderingEngine
const imagesListUrl = generateImageUrl(props.singleImage.singleImagePath)
console.log('imagesListUrl', imagesListUrl)

onMounted(() => {
  if (props.singleImage.singleImagePath.endsWith('.dcm')) {
    const element: HTMLDivElement = document.getElementById(elementId.value) as HTMLDivElement
    const viewportInput = {
      viewportId: viewportId,
      type: ViewportType.STACK,
      element: element as HTMLDivElement
    }
    renderingEngine.enableElement(viewportInput)
    const viewport = renderingEngine.getViewport(viewportId) as IStackViewport
    imageIds[0] = imagesListUrl || ''
    viewport.setStack(imageIds).then(() => {
      viewport.render()
    })
  }
})

onUnmounted(() => {
  if (props.singleImage.singleImagePath.endsWith('.dcm')) {
    renderingEngine.disableElement(viewportId)
  }
})
</script>

<template>
  <div>
    <div :id="elementId" class="w-16 h-16"></div>
  </div>
</template>

<style lang="scss" scoped></style>
