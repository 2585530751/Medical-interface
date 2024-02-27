import { ref, reactive, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import * as cornerstoneTools from '@cornerstonejs/tools'
import type { IToolGroup } from '@cornerstonejs/tools/src/types'

const { Enums: csToolsEnums } = cornerstoneTools
const { MouseBindings } = csToolsEnums

export const useImageStateStore = defineStore('imageState', () => {
  let imageList = reactive({ imageId: '', singleImagePath: '' })
  let imagesList = reactive({})
  const checkSingleImage = ref(false)
  const leftMouseActive = ref('')
  const toolGroup: Ref<IToolGroup> = ref() as Ref<IToolGroup>

  function bindLeftMouse(newLeftMouseActive: string) {
    toolGroup!.value.setToolPassive(leftMouseActive.value)
    leftMouseActive.value = newLeftMouseActive
    toolGroup!.value.setToolActive(leftMouseActive.value, {
      bindings: [
        {
          mouseButton: MouseBindings.Primary // Left Click
        }
      ]
    })
    console.log(leftMouseActive.value)
  }

  function bindImageList(imageObject: Record<string, any>) {
    // 遍历普通对象，并将值复制到响应式对象中
    Object.keys(imageObject).forEach((key) => {
      imageList[key as keyof typeof imageList] = imageObject[key]
    })
  }

  function bindImagesList(imagesObject: Object) {
    // 遍历普通对象，并将值复制到响应式对象中
    Object.keys(imagesObject).forEach((key) => {
      imagesList[key as keyof typeof imagesList] = imagesObject[key as keyof typeof imagesList]
    })
  }

  return {
    imageList,
    imagesList,
    leftMouseActive,
    toolGroup,
    checkSingleImage,
    bindLeftMouse,
    bindImageList,
    bindImagesList
  }
})
