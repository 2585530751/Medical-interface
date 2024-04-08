<script setup lang="ts">
import files from '@iconify-icons/ep/files'
import folder from '@iconify-icons/ep/folder'
import { useImageStateStore } from '@/store/imageState'
import imagesListDisplay from '@/components/ReImage/imagesListDisplay.vue'
import imagesModelsListDisplay from '@/components/ReImage/imagesModelsListDisplay.vue'
import { storageSession } from '@pureadmin/utils'
import { onMounted, reactive, ref, watch } from 'vue'
import type { ImageInfo } from '@/types/image'
import { imagesModelsListsSession, imagesListsSession } from '@/composables/image/utils'
import { image } from 'html2canvas/dist/types/css/types/image'

const imageStateStore = useImageStateStore()
const imagesLists = reactive(imageStateStore.imagesLists)
const imagesModelsLists = reactive(imageStateStore.imagesModelsLists)
const mainShow = ref(true)

const imagesListsInfo = reactive({
  imagesNumber: 0,
  imagesSetNumber: 0,
  imagesEquipment: ''
})

const imagesModelsListsInfo = reactive({
  imagesModelsNumber: 0,
  imagesModelsSetNumber: 0,
  imagesEquipment: ''
})

// 创建一个Date对象以获取当前日期和时间
const currentDate = new Date()

// 获取年、月、日
const year = currentDate.getFullYear()
const month = String(currentDate.getMonth() + 1).padStart(2, '0') // 月份从0开始，所以加1，并用0填充以保持两位数格式
const day = String(currentDate.getDate()).padStart(2, '0') // 用0填充以保持两位数格式

// 格式化日期为"YYYY-MM-DD"
const formattedDate = `${year}-${month}-${day}`

watch(
  () => {
    return imageStateStore.imagesLists.length
  },
  (value, prevValue) => {
    imagesListsInfo.imagesNumber = 0
    imagesListsInfo.imagesSetNumber = 0
    for (let i = 0; i < imagesLists.length; i++) {
      imagesListsInfo.imagesNumber += imagesLists[i].singleImageList.length
      imagesListsInfo.imagesSetNumber += 1
    }
    // 提取所有不同的 imageType 并存储到 Set 中以去除重复项
    const uniqueImageTypes = new Set(imagesLists.map((image) => image.imageEquipment))
    // 将 Set 转换回数组，并使用 join 方法将 imageType 串联成一个字符串
    const imageTypesString = Array.from(uniqueImageTypes).join('/')
    imagesListsInfo.imagesEquipment = imageTypesString
  },
  { deep: true }
)

watch(
  () => {
    return imageStateStore.imagesModelsLists.length
  },
  (value, prevValue) => {
    imagesModelsListsInfo.imagesModelsNumber = 0
    imagesModelsListsInfo.imagesModelsSetNumber = 0
    for (let i = 0; i < imagesModelsLists.length; i++) {
      imagesModelsListsInfo.imagesModelsNumber += imagesModelsLists[i].singleImageList.length
      imagesModelsListsInfo.imagesModelsSetNumber += 1
    }
    // 提取所有不同的 imageType 并存储到 Set 中以去除重复项
    const uniqueImageTypes = new Set(imagesModelsLists.map((image) => image.imageEquipment))
    // 将 Set 转换回数组，并使用 join 方法将 imageType 串联成一个字符串
    const imageTypesString = Array.from(uniqueImageTypes).join('/')
    imagesModelsListsInfo.imagesEquipment = imageTypesString
  },
  { deep: true }
)

onMounted(() => {
  for (let i = 0; i < imagesLists.length; i++) {
    imagesListsInfo.imagesNumber += imagesLists[i].singleImageList.length
    imagesListsInfo.imagesSetNumber += 1
  }
  for (let i = 0; i < imagesModelsLists.length; i++) {
    imagesModelsListsInfo.imagesModelsNumber += imagesModelsLists[i].singleImageList.length
    imagesModelsListsInfo.imagesModelsSetNumber += 1
  }
  // 提取所有不同的 imageType 并存储到 Set 中以去除重复项
  const uniqueImageTypes = new Set(imagesModelsLists.map((image) => image.imageEquipment))
  // 将 Set 转换回数组，并使用 join 方法将 imageType 串联成一个字符串
  const imageTypesString = Array.from(uniqueImageTypes).join('/')
  imagesModelsListsInfo.imagesEquipment = imageTypesString
  // 提取所有不同的 imageType 并存储到 Set 中以去除重复项
  const uniqueImageTypes1 = new Set(imagesLists.map((image) => image.imageEquipment))
  // 将 Set 转换回数组，并使用 join 方法将 imageType 串联成一个字符串
  const imageTypesString1 = Array.from(uniqueImageTypes).join('/')
  imagesListsInfo.imagesEquipment = imageTypesString1
})

const selectImagesLists: ImageInfo[] = []
const selectImagesModelsLists: ImageInfo[] = []

function addSelectImagesLists(imagesList: ImageInfo, checked: boolean) {
  if (checked) {
    selectImagesLists.push(imagesList)
  } else {
    selectImagesLists.splice(selectImagesLists.indexOf(imagesList), 1)
  }
}

function addSelectImagesModelsLists(imagesModelsList: ImageInfo, checked: boolean) {
  if (checked) {
    selectImagesModelsLists.push(imagesModelsList)
  } else {
    selectImagesModelsLists.splice(selectImagesModelsLists.indexOf(imagesModelsList), 1)
  }
}

function deleteSelectedImagesLists() {
  const list: ImageInfo[] = storageSession().getItem(imagesListsSession)
  selectImagesLists.forEach((imagesList) => {
    imagesLists.splice(imagesLists.indexOf(imagesList), 1)
    // 检查数组中是否存在具有相同imageId的元素
    let existingElement = list.find((element) => element.imageId === imagesList.imageId)
    if (existingElement) {
      // 如果存在相同imageId的元素，则删除它并添加新元素
      const index = list.indexOf(existingElement)
      list.splice(index, 1) // 删除找到的元素
      storageSession().setItem(imagesListsSession, list)
    }
  })
}

function deleteAllImagesLists() {
  // imagesLists.splice(0, imagesLists.length)
  imageStateStore.imagesLists.length = 0
  storageSession().setItem(imagesListsSession, [])
}

function deleteSelectedImagesModelsLists() {
  const list: ImageInfo[] = storageSession().getItem(imagesModelsListsSession)
  selectImagesModelsLists.forEach((imagesModelsList) => {
    imagesModelsLists.splice(imagesModelsLists.indexOf(imagesModelsList), 1)
    let existingElement = list.find((element) => {
      return (
        element.singleImageList.length === imagesModelsList.singleImageList.length &&
        element.singleImageList[0].singleImagePath ===
          imagesModelsList.singleImageList[0].singleImagePath
      )
    })
    console.log(existingElement)
    if (existingElement) {
      // 如果存在相同imageId的元素，则删除它并添加新元素
      const index = list.indexOf(existingElement)
      list.splice(index, 1) // 删除找到的元素
      storageSession().setItem(imagesModelsListsSession, list)
    }
  })
}

function deleteAllImagesModelsLists() {
  // imagesModelsLists.splice(0, imagesModelsLists.length)
  imageStateStore.imagesModelsLists.length = 0
  storageSession().setItem(imagesModelsListsSession, [])
}
</script>

<template>
  <div class="divide-x-0 divide-y-2 divide-slate-400/50 divide-solid">
    <div
      class="flex items-center justify-center py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <el-button-group>
        <el-button text bg plain @click="mainShow = true">主要</el-button>
        <el-button text bg plain @click="mainShow = false">模型</el-button>
      </el-button-group>
    </div>
    <div
      v-show="mainShow"
      class="flex flex-col px-4 py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">{{ formattedDate }}</span>
        <el-button text>
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="files"
            :style="{ fontSize: '15px' }"
          ></IconifyIconOffline
          >{{ imagesListsInfo.imagesNumber }}
        </el-button>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">{{ imagesListsInfo.imagesEquipment }}</span>
        <el-button text>
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="folder"
            :style="{ fontSize: '15px' }"
          ></IconifyIconOffline>
          {{ imagesListsInfo.imagesSetNumber }}
        </el-button>
      </div>
    </div>
    <div
      v-show="mainShow"
      class="flex flex-col justify-center gap-8 py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <!-- <imagesListDisplay :imagesList="imagesList"></imagesListDisplay> -->
      <imagesListDisplay
        v-for="(item, index) in imagesLists"
        @addSelectImagesLists="addSelectImagesLists"
        :imagesList="item"
        :key="index"
        :index="index"
      ></imagesListDisplay>
      <div
        class="fixed bottom-0 left-0 flex items-center h-10 border-b-0 border-gray-500 border-solid rounded-md w-60 justify-evenly backdrop-grayscale bg-stone-50 dark:bg-gray-700 border-x-0"
      >
        <el-button type="info" size="small" @click="deleteSelectedImagesLists()">删除</el-button>
        <el-button type="info" size="small" @click="deleteAllImagesLists()">清空</el-button>
      </div>
    </div>

    <div
      v-show="!mainShow"
      class="flex flex-col px-4 py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">{{ formattedDate }}</span>
        <el-button text>
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="files"
            :style="{ fontSize: '15px' }"
          ></IconifyIconOffline
          >{{ imagesModelsListsInfo.imagesModelsNumber }}
        </el-button>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">{{ imagesModelsListsInfo.imagesEquipment }}</span>
        <el-button text>
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="folder"
            :style="{ fontSize: '15px' }"
          ></IconifyIconOffline
          >{{ imagesModelsListsInfo.imagesModelsSetNumber }}
        </el-button>
      </div>
    </div>

    <div
      v-show="!mainShow"
      class="flex flex-col justify-center gap-8 py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <!-- <imagesListDisplay :imagesList="imagesList"></imagesListDisplay> -->
      <imagesModelsListDisplay
        v-for="(item, index) in imagesModelsLists"
        @addSelectImagesModelsLists="addSelectImagesModelsLists"
        :imagesModelsList="item"
        :key="index"
        :index="index"
      ></imagesModelsListDisplay>
      <div
        class="fixed bottom-0 left-0 flex items-center h-10 border-b-0 border-gray-500 border-solid rounded-md w-60 justify-evenly backdrop-grayscale bg-stone-50 dark:bg-gray-700 border-x-0"
      >
        <el-button type="info" size="small" @click="deleteSelectedImagesModelsLists()"
          >删除</el-button
        >
        <el-button type="info" size="small" @click="deleteAllImagesModelsLists()">清空</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
