<script setup lang="ts">
import arrowDown from '@iconify-icons/ep/arrow-down'
import { useImageStateStore } from '@/store/imageState'
import { imageKeyValueStore } from '@/composables/image/imageKeyValueStore'
import {
  singleImageSegmentationOfThyroidNodulesApi,
  singleImageClassifyOfThyroidNodulesApi,
  singleImageDetectionOfPulmonaryNodulesApi,
  imageSegmentationOfThyroidNodulesApi,
  imageDetectionOfPulmonaryNodulesApi,
  imageClassifyOfThyroidNodulesApi
} from '@/api/image'
import { message } from '@/utils/message'
import type { ImageInfo } from '@/types/image'
import { pushimagesModelsListsSession } from '@/composables/image/utils'
import { storageSession } from '@pureadmin/utils'

import { reactive, ref } from 'vue'

import pieChart from '@/components/ReChart/pieChart.vue'

const dialogVisible = ref(false)

const pieData=reactive([{value: 0, name: '良性'}])
const pieName=ref('')
const pieDescription=ref('')

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
    await singleImageSegmentationOfThyroidNodulesApi(params)
      .then((data) => {
        if ((data.code = 200)) {
          const singleImageModelData = Object.assign({}, data.data, JSON.parse(data.data.resData))
          const imageInfo = { ...imageInfoWindows.imageInfo }
          const singleImage = Object.assign(
            {},
            imageInfo.singleImageList.find((obj) => obj.singleImageId === params.singleImageId)
          )
          singleImage!.singleImageModelData = singleImageModelData
          singleImage!.modelType = 'model'
          imageInfo.singleImageList = [singleImage!]
          pushimagesModelsListsSession(imageInfo)
          imageStateStore.pushImagesModelsList(imageInfo)

          message(data.msg, { type: 'success' })
        } else {
          message(data.msg, { type: 'error' })
        }
      })
      .catch((error) => {
        message(error, { type: 'error' })
      })
  }
}

async function imageSegmentationOfThyroidNodules() {
  const imageInfoWindows =
    imageStateStore.imagesListWindows[imageStateStore.selectImagesListWindows]
  if (imageInfoWindows != 0) {
    const params = {
      imageId: imageKeyValueStore.get(
        imageStateStore.viewports[imageStateStore.selectImagesListWindows].getCurrentImageId()
      ).imageId
    }
    await imageSegmentationOfThyroidNodulesApi(params)
      .then((data) => {
        if ((data.code = 200)) {
          const imageInfo = { ...imageInfoWindows.imageInfo }
          for (var i = 0; i < data.data.length; i++) {
            const singleImageModelData = Object.assign(
              {},
              data.data[i],
              JSON.parse(data.data[i].resData)
            )
            let j = 0

            while (j < imageInfo.singleImageList.length) {
              if (imageInfo.singleImageList[j].singleImageId == data.data[i].singleImageId) {
                console.log(j)
                break
              }
              j++
            }

            imageInfo.singleImageList[j].singleImageModelData = singleImageModelData
            imageInfo.singleImageList[j].modelType = 'model'
          }
          pushimagesModelsListsSession(imageInfo)
          imageStateStore.pushImagesModelsList(imageInfo)
          message(data.msg, { type: 'success' })
        } else {
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
    await singleImageClassifyOfThyroidNodulesApi(params)
      .then((data) => {
        if ((data.code = 200)) {
          const modelReult=JSON.parse(data.data.resData).modelResultDes;
          const messageText = '该图像诊断的甲状腺结节分类为'+modelReult;
          message(data.msg+messageText, { type: 'success' })
        } else {
          message(data.msg, { type: 'error' })
          console.log(data.msg)
        }
      })
      .catch((error) => {
        message(error, { type: 'error' })
      })
  }
}

async function imageClassifyOfThyroidNodules() {
  const imageInfoWindows =
    imageStateStore.imagesListWindows[imageStateStore.selectImagesListWindows]
  if (imageInfoWindows != 0) {
    const params = {
      imageId: imageKeyValueStore.get(
        imageStateStore.viewports[imageStateStore.selectImagesListWindows].getCurrentImageId()
      ).imageId
    }
    await imageClassifyOfThyroidNodulesApi(params)
      .then((data) => {
        if ((data.code = 200)) {
          var benignNum=0;
          var malignantNum=0;
          for(var i=0;i<data.data.length;i++){
            if(JSON.parse(data.data[i].resData).modelResultDes=='良性'){
              benignNum++
            }else{
              malignantNum++
            }
          }
          pieData[0]={value: benignNum, name: '良性'}
          pieData[1]={value: malignantNum, name: '恶性'}
          pieName.value='甲状腺结节良恶性分类结果'
          const sum = benignNum + malignantNum;
          const benignNumPercentage = ((benignNum / sum) * 100).toFixed(2); // 保留两位小数
          const malignantNumPercentage = ((malignantNum / sum) * 100).toFixed(2); // 保留两位小数
          pieDescription.value='该序列良性结节数量为'+benignNum+'，恶性结节数量为'+malignantNum+'，因此，该序列器官的诊断结果有'+benignNumPercentage+'%的概率为良性，有'+malignantNumPercentage+'%的概率为恶性。';
          dialogVisible.value=true
          message(data.msg, { type: 'success' })
        } else {
          message(data.msg, { type: 'error' })
          console.log(data.msg)
        }
      })
      .catch((error) => {
        message(error, { type: 'error' })
      })
  }
}

async function singleImageDetectionOfPulmonaryNodules() {
  const imageInfoWindows =
    imageStateStore.imagesListWindows[imageStateStore.selectImagesListWindows]
  if (imageInfoWindows != 0) {
    const params = {
      singleImageId: imageKeyValueStore.get(
        imageStateStore.viewports[imageStateStore.selectImagesListWindows].getCurrentImageId()
      ).singleImageId
    }
    await singleImageDetectionOfPulmonaryNodulesApi(params)
      .then((data) => {
        if ((data.code = 200)) {
          const singleImageModelData = Object.assign({}, data.data, JSON.parse(data.data.resData))
          const imageInfo = { ...imageInfoWindows.imageInfo }
          const singleImage = Object.assign(
            {},
            imageInfo.singleImageList.find((obj) => obj.singleImageId === params.singleImageId)
          )
          singleImage!.singleImageModelData = singleImageModelData
          singleImage!.modelType = 'model'
          imageInfo.singleImageList = [singleImage!]
          imageStateStore.pushImagesModelsList(imageInfo)
          message(data.msg, { type: 'success' })
        } else {
          message(data.msg, { type: 'error' })
        }
      })
      .catch((error) => {
        message(error, { type: 'error' })
      })
  }
}
async function imageDetectionOfPulmonaryNodules() {
  const imageInfoWindows =
    imageStateStore.imagesListWindows[imageStateStore.selectImagesListWindows]
  if (imageInfoWindows != 0) {
    const params = {
      imageId: imageKeyValueStore.get(
        imageStateStore.viewports[imageStateStore.selectImagesListWindows].getCurrentImageId()
      ).imageId
    }
    await imageDetectionOfPulmonaryNodulesApi(params)
      .then((data) => {
        if ((data.code = 200)) {
          const imageInfo = { ...imageInfoWindows.imageInfo }
          for (var i = 0; i < data.data.length; i++) {
            const singleImageModelData = Object.assign(
              {},
              data.data[i],
              JSON.parse(data.data[i].resData)
            )
            let j = 0
            while (j < imageInfo.singleImageList.length) {
              if (imageInfo.singleImageList[j].singleImageId == data.data[i].singleImageId) {
                console.log(j)
                break
              }
              j++
            }
            imageInfo.singleImageList[j].singleImageModelData = singleImageModelData
            imageInfo.singleImageList[j].modelType = 'model'
          }
          pushimagesModelsListsSession(imageInfo)
          imageStateStore.pushImagesModelsList(imageInfo)
          message(data.msg, { type: 'success' })
        } else {
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
        <p class="inline ml-3 text-sm text-gray-600 dark:text-white">甲状腺结节图像分割</p>
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
                >图像分割</el-dropdown-item
              >
              <el-dropdown-item @click="imageSegmentationOfThyroidNodules"
                >序列分割</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="flex flex-wrap justify-center bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center">
        <p class="inline ml-3 text-sm text-gray-600 dark:text-white">肺结节图像检测</p>
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
              <el-dropdown-item @click="singleImageDetectionOfPulmonaryNodules"
                >图像检测</el-dropdown-item
              >
              <el-dropdown-item @click="imageDetectionOfPulmonaryNodules"
                >序列检测</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="flex flex-wrap justify-center bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center">
        <p class="inline ml-3 text-sm text-gray-600 dark:text-white">甲状腺结节良恶分类</p>
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
              <el-dropdown-item @click="singleImageClassifyOfThyroidNodules"
                >图像分类</el-dropdown-item
              >
              <el-dropdown-item @click="imageClassifyOfThyroidNodules">序列分类</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="flex flex-wrap justify-center bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center">
        <p class="inline ml-3 text-sm text-gray-600 dark:text-white">肠道息肉图像分割</p>
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
              <el-dropdown-item @click="singleImageClassifyOfThyroidNodules"
                >图像分类</el-dropdown-item
              >
              <el-dropdown-item @click="imageClassifyOfThyroidNodules">序列分类</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="甲状腺结节良性恶性分类结果" width="500">
      <pie-chart :seriesName="pieName" :data="pieData" :description="pieDescription"></pie-chart>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>
