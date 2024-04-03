<script setup lang="ts">
import files from '@iconify-icons/ep/files'
import folder from '@iconify-icons/ep/folder'
import { useImageStateStore } from '@/store/imageState'
import imagesListDisplay from '@/components/ReImage/imagesListDisplay.vue'
import imagesModelsListDisplay from '@/components/ReImage/imagesModelsListDisplay.vue'
import { reactive, ref } from 'vue'

const imageStateStore = useImageStateStore()
const imagesList = imageStateStore.imagesList
const imagesLists =  reactive(imageStateStore.imagesLists)
const imagesModelsLists = reactive(imageStateStore.imagesModelsLists)
const mainShow=ref(true)

</script>

<template>
  <div class="divide-x-0 divide-y-2 divide-slate-400/50 divide-solid">
    <div
      class="flex items-center justify-center py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <el-button-group>
        <el-button text bg plain @click="mainShow=true">主要</el-button>
        <el-button text bg plain @click="mainShow=false">模型</el-button>
      </el-button-group>
    </div>
    <div v-show="mainShow" class="flex flex-col px-4 py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">2023-09-09</span>
        <el-button text>
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="files"
            :style="{ fontSize: '15px' }"
          ></IconifyIconOffline
          >218
        </el-button>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">CT\PT\RTSTRUCT9</span>
        <el-button text>
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="folder"
            :style="{ fontSize: '15px' }"
          ></IconifyIconOffline
          >4
        </el-button>
      </div>
    </div>
    <div v-show="mainShow"
      class="flex flex-col justify-center gap-8 py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <!-- <imagesListDisplay :imagesList="imagesList"></imagesListDisplay> -->
      <imagesListDisplay
        v-for="(item, index) in imagesLists"

        :imagesList="item"
        :key="index"
        :index="index"
      ></imagesListDisplay>
    </div>
    <div v-show="!mainShow" class="flex flex-col px-4 py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">2023-09-09</span>
        <el-button text>
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="files"
            :style="{ fontSize: '15px' }"
          ></IconifyIconOffline
          >218444
        </el-button>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-gray-500">CT\PT\RTSTRUCT9</span>
        <el-button text>
          <IconifyIconOffline
            class="hover:text-blue-500"
            :icon="folder"
            :style="{ fontSize: '15px' }"
          ></IconifyIconOffline
          >4
        </el-button>
      </div>
    </div>
    <div v-show="!mainShow"
      class="flex flex-col justify-center gap-8 py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <!-- <imagesListDisplay :imagesList="imagesList"></imagesListDisplay> -->
      <imagesModelsListDisplay
        v-for="(item, index) in imagesModelsLists"

        :imagesModelsList="item"
        :key="index"
        :index="index"
      ></imagesModelsListDisplay>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
