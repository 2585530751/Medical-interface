<script setup lang="ts">
import arrowDown from '@iconify-icons/ep/arrow-down'
import { useImageStateStore } from '@/store/imageState'
import { imageKeyValueStore } from '@/composables/image/imageKeyValueStore'
import { singleImageSegmentationOfThyroidNodulesApi,singleImageClassifyOfThyroidNodulesApi } from '@/api/image'
import image from '@/router/modules/image';
import { message } from '@/utils/message'
defineOptions({
  name: ''
})

const imageStateStore = useImageStateStore()
async function singleImageSegmentationOfThyroidNodules() {
  const imageInfoWindows =
    imageStateStore.imagesListWindows[imageStateStore.selectImagesListWindows]
  if (imageInfoWindows != 0) {
    const params = {
      singleImageId: imageKeyValueStore.get(
        imageStateStore.viewports[imageStateStore.selectImagesListWindows].getCurrentImageId()
      ).singleImageId
    }
    await singleImageSegmentationOfThyroidNodulesApi(params).then((data) => {
      if ((data.code = 200)) {
        const singleImageModelData = Object.assign({}, data.data, JSON.parse(data.data.resData))
        const imageInfo={...imageInfoWindows.imageInfo}
        const singleImage = Object.assign({}, imageInfo.singleImageList.find((obj) => obj.singleImageId === params.singleImageId)); 
        singleImage!.singleImageModelData = singleImageModelData
        singleImage!.modelType = 'model'
        imageInfo.singleImageList=[singleImage!]
        imageStateStore.pushImagesModelsList(imageInfo)
        message(data.msg, { type: 'success' })
      }else{
        message(data.msg, { type: 'error' })
      }
    })
    .catch((error) => {
      message(error, { type: 'error' })
    })
  }
}

async function singleImageClassifyOfThyroidNodules() {
  const imageInfoWindows =
    imageStateStore.imagesListWindows[imageStateStore.selectImagesListWindows]
  if (imageInfoWindows != 0) {
    const params = {
      singleImageId: imageKeyValueStore.get(
        imageStateStore.viewports[imageStateStore.selectImagesListWindows].getCurrentImageId()
      ).singleImageId
    }
    await singleImageClassifyOfThyroidNodulesApi(params).then((data) => {
      if ((data.code = 200)) {
        message(data.data, { type: 'success' })
        message(data.msg, { type: 'success' })
      }else{
        message(data.msg, { type: 'error' })
      }
    })
    .catch((error) => {
      message(error, { type: 'error' })
    })
  }
}
</script>

<template>
  <div class="divide-x-0 divide-y-2 divide-slate-400/50 divide-solid">
    <div class="flex flex-wrap justify-center bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center">
        <p class="inline ml-3 text-sm text-gray-600 dark:text-white">甲状腺结节</p>
        <el-dropdown trigger="click">
          <el-button text size="small">
            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="arrowDown"
              :style="{ fontSize: '20px' }"
            ></IconifyIconOffline>
          </el-button>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="singleImageSegmentationOfThyroidNodules"
                >分割</el-dropdown-item
              >
              <el-dropdown-item @click="singleImageClassifyOfThyroidNodules">检测</el-dropdown-item>
              <el-dropdown-item>2X2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
