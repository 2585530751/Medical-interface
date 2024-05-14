<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { Delete, ZoomIn, Download } from '@element-plus/icons-vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { type UploadFile } from 'element-plus'
import { message } from '@/utils/message'
import type { UploadUserFile } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import { uploadSeriesApi } from '@/api/study'
import { useSeriesStateStore } from '@/store/modules/seriesState'
import { departmentOptions } from '@/utils/commonVariables'

const props = defineProps<{
  uploadWindowOpen?: boolean
}>()

const emits = defineEmits<{
  uploadWindowClose: [] // 具名元组语法
}>()

const filteredObjects = departmentOptions.filter((obj) => obj.value === 'doctor')

var options: any[] = []
filteredObjects.forEach((obj) => {
    options= obj.children!
})

const seriesStateStore = useSeriesStateStore()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const imageList = ref<UploadUserFile[]>([])
const imagesInfo = reactive({
  departmentNameList: ''
})

const handleRemove = (file: UploadFile) => {
  console.log(file)
  let index = imageList.value.indexOf(file)
  imageList.value.splice(index, 1)
}

const headers: Record<string, any> = {
  'Content-Type':'multipart/form-data'
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}
const uploadRef = ref<UploadInstance>()

let centerDialogVisible = ref(props.uploadWindowOpen)

watch(
  () => {
    return props.uploadWindowOpen
  },
  (value, prevValue) => {
    centerDialogVisible.value = value
  }
)

// 提交上传文件
function submitFileForm() {
  // 创建新的数据对象
  let formData = new FormData()
  // 将上传的文件放到数据对象中
  imageList.value.forEach((file) => {
    formData.append('files', file.raw!)
  })
  // 文件名
  formData.append('seriesInfo', JSON.stringify(imagesInfo))
  uploadSeriesApi(formData)
    .then((res) => {
      if (res.success) {
        console.log('res', res)
        seriesStateStore.getSeriesListPage()
        emits('uploadWindowClose')
      } else {
        message(res.msg, { type: 'error' })
      }
    })
    .catch((error) => {
      message(error, { type: 'error' })
    })
}

function handleDownload(file: UploadFile) {
  console.log('file', file)
  var link = document.createElement('a') //定义一个a标签
  link.download = file.name //下载后的文件名称
  link.href = file.url ?? '' //需要生成一个 URL 来实现下载
  link.click() //模拟在按钮上实现一次鼠标点击
  window.URL.revokeObjectURL(link.href)
}
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    @close="$emit('uploadWindowClose')"
    title="上传图像"
    width="60%"
    center
  >
    <el-form-item label="科室">
      <el-cascader
        :options="options"
        :show-all-levels="false"
        v-model="imagesInfo.departmentNameList"
      />
    </el-form-item>
    <el-upload
      list-type="picture-card"
      :auto-upload="false"
      v-model:file-list="imageList"
      ref="uploadRef"
      :headers="headers"
      show-file-list
      multiple
      drag
    >
      <el-icon class=""><upload-filled /></el-icon>
      <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
      <template #tip>
        <div class="el-upload__tip">jpg/png files with a size less than 500kb</div>
      </template>
      <template #file="{ file }">
        <div @click="console.log(file.raw)">
          <img
            class="el-upload-list__item-thumbnail"
            :src="file.url"
            :alt="file.name"
            v-show="!file.name.endsWith('dcm')"
          />
          <div class="text-lg text-justify pt-14">{{ file.name }}</div>
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              v-show="!file.name.endsWith('dcm')"
              @click="handlePictureCardPreview(file)"
            >
              <el-icon><zoom-in /></el-icon>
            </span>
            <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
            >
              <el-icon><Download /></el-icon>
            </span>
            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
              <el-icon><Delete /></el-icon>
            </span>
          </span>
        </div>
      </template>
    </el-upload>
    <el-dialog v-model="dialogVisible" width="50%" center>
      <img class="w-full" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitFileForm()"> 上传 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>