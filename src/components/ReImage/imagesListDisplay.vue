<script setup lang="ts">
import files from '@iconify-icons/ep/files'
import timer from '@iconify-icons/ep/timer'
import folder from '@iconify-icons/ep/folder'
import { basicImageUrl } from '@/api/utils'

import { ref, onMounted } from 'vue'
import { useImageStateStore } from '@/store/imageState'
import type { ImageInfo, ImageInfoWindows } from '@/types/image'
import { changeImagesListWindowsToSession } from '@/composables/image/utils'
import { Enums } from '@cornerstonejs/core'
import { generateImageUrl } from '@/composables/image/utils'
import type IStackViewport from '@cornerstonejs/core/src/types/IStackViewport'
import { set } from 'nprogress'

const props = defineProps<{
  imagesList: ImageInfo
  index: number
}>()

const emit = defineEmits<{
  addSelectImagesLists: [imagesList: ImageInfo,checked:boolean]
}>()

const checked = ref(false)
const imageIds: string[] = []
const { ViewportType } = Enums
const imageStateStore = useImageStateStore()
let elementId = ref('cornerstone-element-imagesList-' + props.imagesList.imageId)
const viewportId = 'stackViewPort-imagesList-' + props.imagesList.imageId
const renderingEngine = imageStateStore.renderingEngine
const imagesListUrl = generateImageUrl(props.imagesList.singleImageList[0].singleImagePath)
const imagesListUrlCheck = ref(true)

function selectImagesListToWindows() {
  imageStateStore.selectImagesList = props.imagesList.imageId
  const ImageInfoWindows: ImageInfoWindows = {
    imageInfo: props.imagesList,
    singleImage: props.imagesList.singleImageList[0]
  }
  //imageStateStore.imagesListWindows[imageStateStore.selectImagesListWindows] = ImageInfoWindows

  imageStateStore.imagesListWindows = [
    ...imageStateStore.imagesListWindows.slice(0, imageStateStore.selectImagesListWindows),
    ImageInfoWindows,
    ...imageStateStore.imagesListWindows.slice(imageStateStore.selectImagesListWindows + 1)
  ]
  changeImagesListWindowsToSession(ImageInfoWindows, imageStateStore.selectImagesListWindows)
}

function checkInputCheckbox() {
  emit('addSelectImagesLists', props.imagesList, checked.value)
}

onMounted(() => {
  if (imagesListUrl && imagesListUrl.endsWith('.dcm')) {
    setTimeout(() => {
      const element: HTMLDivElement = document.getElementById(elementId.value) as HTMLDivElement
      const viewportInput = {
        viewportId: viewportId,
        type: ViewportType.STACK,
        element: element as HTMLDivElement
      }
      renderingEngine.enableElement(viewportInput)
      const viewport = renderingEngine.getViewport(viewportId) as IStackViewport
      imageIds[0] = imagesListUrl
      viewport.setStack(imageIds).then(() => {
        viewport.render()
      })
    }, 500)
  } else {
    imagesListUrlCheck.value = false
  }
})
</script>

<template>
  <div class="flex justify-center w-5/6 flex-nowrap">
    <div class="w-1/6">
      <el-checkbox v-model="checked" size="large" @change="checkInputCheckbox"/>
    </div>
    <div
      class="flex flex-col justify-center w-4/6 gap-1"
      :class="{ highlighted: imageStateStore.selectImagesList === imagesList.imageId }"
      @click="selectImagesListToWindows()"
    >
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-500">
          {{ props.imagesList.imageEquipment }}
        </span>
        <span class="text-xs text-gray-500"
          ><IconifyIconOffline
            class="hover:text-blue-500"
            :icon="timer"
            :style="{ fontSize: '10px' }"
          ></IconifyIconOffline
          >{{ props.imagesList.imageCheckTime }}</span
        >
      </div>
      <div class="border-2 border-solid rounded-lg border-slate-300">
        <el-image
          fit="cover"
          :src="basicImageUrl + props.imagesList.singleImageList[0].singleImagePath"
          :crossorigin="'anonymous'"
          v-show="!imagesListUrlCheck"
        />
        <div v-show="imagesListUrlCheck">
          <div :id="elementId" class="w-32 h-32"></div>
        </div>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-500">
          {{ props.imagesList.patientName }}
        </span>
        <span class="text-xs text-gray-500"
          ><IconifyIconOffline
            class="hover:text-blue-500"
            :icon="files"
            :style="{ fontSize: '10px' }"
          ></IconifyIconOffline
          >{{ props.imagesList.imageCount }}</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.highlighted {
  /* 设置边框样式 */
  border: 3px solid #52559e; /* 边框宽度、样式和颜色 */
  /* 设置圆角 */
  border-radius: 10px; /* 圆角的半径 */
  padding: 4px; /* 内边距 */
}
</style>
