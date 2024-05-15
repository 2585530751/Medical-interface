<script setup lang="ts">
import type { TableInstance } from 'element-plus'
import { onMounted, ref } from 'vue'
import view from '@iconify-icons/ep/view'
import deleteUser from '@iconify-icons/ep/delete'
import IonEllipsisHorizontal from '@/assets/svg/IonEllipsisHorizontal.svg?component'
import { useSeriesStateStore } from '@/store/modules/seriesState'
import { useImageOperationStateStore } from '@/store/imageOperationState'
import { Timer } from '@element-plus/icons-vue'
import { basicImageUrl } from '@/api/utils'
import imageDicom from '@/components/ReImage/imageDicom.vue'
import type { SeriesInfo, ImageInfo } from '@/types/series'
import type { SeriesInfoWindows } from '@/types/image'
import { changeSeriesListWindowsToSession, pushSeriesToSession } from '@/composables/image/utils'
import router from '@/router'

const props = defineProps<{
  tableSize: string
  tableCols: string[]
}>()

const seriesStateStore = useSeriesStateStore()
const imageOperationStateStore = useImageOperationStateStore()

const tableRef = ref<TableInstance>()

onMounted(() => {
  seriesStateStore.getSeriesListPage()
})

function seriesOperation(seriesInfo: SeriesInfo) {
  imageOperationStateStore.bindSeriesList(seriesInfo)
  imageOperationStateStore.bindImageList(seriesInfo.imageList[0])
  imageOperationStateStore.pushSeriesList(seriesInfo)
  const seriesInfoWindows: SeriesInfoWindows = {
    seriesInfo: seriesInfo,
    imageInfo: seriesInfo.imageList[0]
  }
  imageOperationStateStore.seriesListWindows[imageOperationStateStore.selectSeriesWindows] =
    seriesInfoWindows
  changeSeriesListWindowsToSession(
    seriesInfoWindows,
    imageOperationStateStore.selectSeriesWindows
  )
  pushSeriesToSession(seriesInfo)
  router.push('/imageOperation')
}

function imageOperation(imageInfo: ImageInfo, seriesInfo: SeriesInfo) {
  imageOperationStateStore.bindImageList(imageInfo)
  imageOperationStateStore.bindSeriesList(seriesInfo)
  imageOperationStateStore.pushSeriesList(seriesInfo)
  const seriesInfoWindows: SeriesInfoWindows = {
    seriesInfo: seriesInfo,
    imageInfo: imageInfo
  }
  imageOperationStateStore.seriesListWindows[imageOperationStateStore.selectSeriesWindows] =
    seriesInfoWindows
  changeSeriesListWindowsToSession(
    seriesInfoWindows,
    imageOperationStateStore.selectSeriesWindows
  )
  pushSeriesToSession(seriesInfo)
  router.push('/imageOperation')
}
</script>

<template>
  <el-card class="box-card">
    <el-table
      ref="tableRef"
      :data="seriesStateStore.seriesListTableData"
      style="width: 100%"
      :default-sort="{ prop: 'visitDate', order: 'descending' }"
      :size="props.tableSize"
      stripe
    >
      <el-table-column type="expand">
        <template #default="props">
          <div
            class="flex flex-col items-center justify-center w-full pb-6 bg-slate-50 dark:bg-stone-950"
          >
            <p m="t-0 b-2">序列UID: {{ props.row.seriesInstanceUid }}</p>
            <div class="w-11/12">
              <h3>影像详情</h3>
              <el-table
                :data="props.row.imageList"
                resizable
                :border="true"
                class="dark:bg-neutral-900"
              >
                <el-table-column label="图片">
                  <template #default="scope">
                    <el-image
                      :src="basicImageUrl + scope.row.imagePath"
                      :crossorigin="'anonymous'"
                      v-show="
                        scope.row.imagePath.endsWith('.png') ||
                        scope.row.imagePath.endsWith('.jpg') ||
                        scope.row.imagePath.endsWith('.jpeg')
                      "
                    />
                    <imageDicom
                      :image-info="scope.row"
                      v-show="scope.row.imagePath.endsWith('.dcm')"
                    />
                  </template>
                </el-table-column>
                <el-table-column label="成像日期" prop="contentDate" />
                <el-table-column label="成像时间" prop="contentTime" />
                <el-table-column label="影像名称" resizable prop="imageName" />
                <el-table-column label="影像格式" prop="imageFormat" />
                <el-table-column label="行高" prop="imageRows" />
                <el-table-column label="列宽" prop="imageColumns" />
                <el-table-column label="窗位" prop="windowCenter" />
                <el-table-column label="窗宽" prop="windowWidth" />
                <el-table-column label="分配位数" prop="bitsAllocated" />
                <el-table-column label="位数存储" prop="bitsStored" />
                <el-table-column label="影像描述" prop="imageDesc" />
                <el-table-column fixed="right" label="操作" >
                  <template #default="scope">
                    <el-button
                      link
                      type="primary"
                      size="small"
                      @click="imageOperation(scope.row, props.row)"
                      ><template #icon>
                        <IconifyIconOffline :icon="view"></IconifyIconOffline>
                      </template>
                      阅片</el-button
                    >

                    <el-button :icon="IonEllipsisHorizontal" link type="primary" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="props.tableCols.includes('seriesDate')"
        label="序列日期"
        prop="seriesDate"
        sortable
      >
        <template v-slot:default="scope">
          {{ scope.row.seriesDate }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="props.tableCols.includes('seriesTime')"
        label="序列时间"
        prop="seriesTime"
      >
        <template v-slot:default="scope">
          <div style="display: flex; align-items: center">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 5px"> {{ scope.row.seriesTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-if="props.tableCols.includes('seriesName')"
        label="序列名称"
        prop="seriesName"
      />
      <el-table-column
        v-if="props.tableCols.includes('seriesFormat')"
        label="序列格式"
        prop="seriesFormat"
      />
      <el-table-column
        v-if="props.tableCols.includes('seriesCount')"
        label="图像数量"
        prop="seriesCount"
      />
      <el-table-column
        v-if="props.tableCols.includes('patientName')"
        label="患者姓名"
        prop="patientName"
      />
      <el-table-column
        v-if="props.tableCols.includes('seriesDesc')"
        label="序列描述"
        prop="seriesDesc"
      />
      <el-table-column fixed="right" label="操作" >
        <template #default="scope">
          <el-button link type="primary" size="default" @click="seriesOperation(scope.row)"
            ><template #icon>
              <IconifyIconOffline :icon="view"></IconifyIconOffline>
            </template>
            阅片</el-button
          >
          <el-button :icon="IonEllipsisHorizontal" link type="primary" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped></style>
