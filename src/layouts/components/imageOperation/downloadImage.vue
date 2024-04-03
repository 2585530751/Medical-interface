<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { useImageStateStore } from '@/store/imageState'
import { Enums } from '@cornerstonejs/core'
import type IStackViewport from '@cornerstonejs/core/src/types/IStackViewport'
import html2canvas from 'html2canvas'
import {
  hideSelectedAnnotation,
  showAllAnnotations,
  selectAllAnnotations
} from '@/composables/image/imageOperate'

const { ViewportType } = Enums

const props = defineProps<{
  downloadWindowOpen?: boolean
}>()

const emits = defineEmits<{
  downloadWindowClose: [] // 具名元组语法
}>()

let centerDialogVisible = ref(props.downloadWindowOpen)

watch(
  () => {
    return props.downloadWindowOpen
  },
  (value, prevValue) => {
    centerDialogVisible.value = value
  }
)

const imageInfo = reactive({
  imageWidth: 512,
  imageHeight: 512,
  imageType: 'jpg',
  imageName: 'image',
  imageAnnotation: true
})

const imageStateStore = useImageStateStore()

var parentNode: HTMLElement | null = null
var divElement: HTMLElement | null = null
var divForDownloadViewport: HTMLDivElement | null = null

function onOpened() {
  divForDownloadViewport = document.querySelector(
    `div[data-viewport-uid='stackViewPort${imageStateStore.selectImagesListWindows}']`
  ) as HTMLDivElement
  parentNode = divForDownloadViewport.parentNode as HTMLDivElement
  divElement = document.getElementById('previewCanvas') as HTMLDivElement
  divElement.appendChild(divForDownloadViewport)
  divForDownloadViewport!.style.width = imageInfo.imageWidth + 'px'
  divForDownloadViewport!.style.height = imageInfo.imageHeight + 'px'
}

function onClosed() {
  imageInfo.imageWidth = 512
  imageInfo.imageHeight = 512
  divForDownloadViewport!.style.width = '100%'
  divForDownloadViewport!.style.height = '100%'
  parentNode!.insertBefore(divForDownloadViewport!,parentNode!.firstChild)
  console.log(parentNode)
}

function downloadCanvas() {
  html2canvas(divForDownloadViewport).then((canvas: HTMLCanvasElement) => {
    const link = document.createElement('a')
    link.download = imageInfo.imageName+'.'+imageInfo.imageType
    console.log(imageInfo.imageType)
    link.href = canvas.toDataURL(imageInfo.imageType, 1.0)
    link.click()
  })
}

const changeWidthHeight = () => {
  divForDownloadViewport!.style.width = imageInfo.imageWidth + 'px'
  divForDownloadViewport!.style.height = imageInfo.imageHeight + 'px'
}

function handleSwitchChange(newVal: Boolean) {
  console.log(newVal)
  selectAllAnnotations(
    imageStateStore.renderingEngine.id,
    imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
  )
  if (newVal) {
    showAllAnnotations(
      imageStateStore.renderingEngine.id,
      imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
    )
  } else {
    hideSelectedAnnotation(
      imageStateStore.renderingEngine.id,
      imageStateStore.viewports[imageStateStore.selectImagesListWindows].id
    )
  }
}
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    class="overflow-auto"
    style="max-height: 50vh"
    @close="$emit('downloadWindowClose')"
    @opened="onOpened"
    @closed="onClosed"
    title="下载图像"
    width="50%"
    :modal="false"
    :destroy-on-close="true"
    draggable
    overflow
    center
  >
    <div class="flex flex-col">
      <el-form ref="ruleFormRef" :model="imageInfo" label-position="top">
        <el-form-item label="文件名">
          <el-input v-model="imageInfo.imageName" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="宽（px)">
              <el-input v-model="imageInfo.imageWidth" @change="changeWidthHeight()" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="高（px)">
              <el-input v-model="imageInfo.imageHeight" @change="changeWidthHeight()" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="图片类型" prop="patientWeight">
              <el-radio-group v-model="imageInfo.imageType" class="ml-4">
                <el-radio label="png" size="large">png</el-radio>
                <el-radio label="jpg" size="large">jpg</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示注释" prop="patientAge">
              <el-switch
                v-model="imageInfo.imageAnnotation"
                @change="handleSwitchChange"
                size="large"
                active-text="显示"
                inactive-text="关闭"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="downloadCanvas()"> 下载 </el-button>
      </span>
    </template>
    <div id="previewCanvas" class="flex flex-col items-center justify-center">
      <el-text size="large">预览</el-text><br />
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped></style>