<script setup lang="ts">
import arrowDown from '@iconify-icons/ep/arrow-down'
import { useImageStateStore } from '@/store/imageState'
import {imageKeyValueStore} from '@/composables/image/imageKeyValueStore'
import { singleImageSegmentationOfThyroidNodulesApi } from '@/api/image'
defineOptions({
  name: ''
})

const imageStateStore = useImageStateStore()
function singleImageSegmentationOfThyroidNodules() {
  console.log(imageStateStore.viewports[0].getCurrentImageId())
  console.log(imageKeyValueStore.get(imageStateStore.viewports[0].getCurrentImageId()))
  const params = { singleImageId: imageKeyValueStore.get(imageStateStore.viewports[0].getCurrentImageId()).singleImageId }
  singleImageSegmentationOfThyroidNodulesApi(params)
    .then((data) => {
      console.log(data)
    })
}
</script>

<template>
  <div class="divide-x-0 divide-y-2 divide-slate-400/50 divide-solid">
    <div class="flex flex-wrap justify-center bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center">
        <p class="inline ml-3 text-sm text-gray-600 dark:text-white">甲状腺结节分割</p>
        <el-dropdown trigger="click">
          <el-button text size="small">
            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="arrowDown"
              :style="{ fontSize: '20px' }"
            ></IconifyIconOffline>
          </el-button>

          <template #dropdown size="small">
            <el-dropdown-menu>
              <el-dropdown-item @click="singleImageSegmentationOfThyroidNodules"
                >1X1</el-dropdown-item
              >
              <el-dropdown-item>1X2</el-dropdown-item>
              <el-dropdown-item>2X1</el-dropdown-item>
              <el-dropdown-item>2X2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
