<script setup lang="ts">
import { computed, ref } from 'vue'
import seriesFeatureTable from '@/layouts/components/imageOperation/seriesFeatureTable.vue'
import { useImageOperationStateStore } from '@/store/imageOperationState'
import type { SeriesInfoWindows } from '@/types/image'
import { exportJsonToExcel } from '@/utils/commonUtils'
import { imageKeyValueStore } from '@/composables/image/imageKeyValueStore'
import type { ImageInfo } from '@/types/series'
import { Reading, DocumentCopy, DocumentAdd, Check } from '@element-plus/icons-vue'
import type { ImageFeature } from '@/types/image'
import { imageFeaturePropertyTranslations } from '@/utils/commonVariables'
import saveCompletedImage from '@/layouts/components/imageOperation/saveCompletedImage.vue'

defineOptions({
  name: ''
})
const imageOperationStateStore = useImageOperationStateStore()

const centerDialogVisible = ref(false)
const saveCompletedImageVisible = ref(false)
const drawerVisible = ref()
const seriesFeature = ref()
const imageFeature = ref<ImageFeature>()

function seriesFeatureTableVisible() {
  const seriesInfoWindows = imageOperationStateStore.seriesListWindows[
    imageOperationStateStore.selectSeriesWindows
  ] as SeriesInfoWindows
  seriesFeature.value = JSON.parse(JSON.stringify(seriesInfoWindows.seriesInfo.seriesFeature))
  drawerVisible.value = true
}

function imageFeatureTableVisible() {
  const imageInfo: ImageInfo = imageKeyValueStore.get(
    imageOperationStateStore.viewports[
      imageOperationStateStore.selectSeriesWindows
    ].getCurrentImageId()
  )
  imageFeature.value = JSON.parse(
    JSON.stringify(imageInfo.imageModelData?.imageFeature as ImageFeature)
  )
  delete imageFeature.value?.featureId
  delete imageFeature.value?.modelResId
  delete imageFeature.value?.file_name
}
</script>

<template>
  <div class="divide-x-0 divide-y-2 divide-slate-400/50 divide-solid">
    <div class="flex flex-wrap justify-evenly bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <el-button class="my-1" size="default" round @click="saveCompletedImageVisible=true"
        ><el-icon><DocumentAdd /></el-icon> 保存图像</el-button
      >

      <el-button class="my-1" size="default" round @click="seriesFeatureTableVisible()"
        ><el-icon><Check /></el-icon>完成阅片</el-button
      >
    </div>
    <div class="flex flex-wrap justify-evenly bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
      <el-button class="my-1" size="default" @click="imageFeatureTableVisible()"
        ><el-icon><Reading /></el-icon> 图像特征</el-button
      >
      <el-button class="my-1" size="default" @click="seriesFeatureTableVisible()"
        ><el-icon><DocumentCopy /></el-icon>序列特征</el-button
      >
    </div>
    <div>
      <el-descriptions direction="vertical" :column="1" size="default" border>
        <el-descriptions-item
          v-for="(value, key) in imageFeature"
          :key="key"
          :label="imageFeaturePropertyTranslations[key]"
          >{{ value }}</el-descriptions-item
        >
      </el-descriptions>
    </div>
    <el-drawer v-model="drawerVisible" title="图像特征" direction="ltr" size="80%">
      <seriesFeatureTable :series-feature="seriesFeature"></seriesFeatureTable>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="exportJsonToExcel(seriesFeature, '图像特征.xlsx')">
            导出Excel
          </el-button>
        </div>
      </template>
    </el-drawer>
    <saveCompletedImage
      :save-completed-image-window-open="saveCompletedImageVisible"
      @save-completed-image-window-close="saveCompletedImageVisible = false"
    ></saveCompletedImage>
  </div>
</template>

<style lang="scss" scoped></style>
