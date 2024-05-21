<script setup lang="ts">
import { reactive, type Ref, ref, watch, onMounted } from 'vue'
import type { ImageEntity } from '@/types/image'
import { dayjs, type FormInstance, type FormRules } from 'element-plus'
import { getPermissionByCurrentUserIdApi } from '@/api/user'
import type { PermissionEntity } from '@/types/user'
import { message } from '@/utils/message'
import { Warning } from '@element-plus/icons-vue'
import { resetForm } from '@/utils/commonUtils'
import { addImagesApi } from '@/api/image'
import { useStudyStateStore } from '@/store/modules/studyState'

defineOptions({
  name: ''
})
const studyStateStore = useStudyStateStore()
const props = defineProps<{
  uploadWindowOpen?: boolean
  dialogPatientId: number
  dialogStudyId: number
}>()

const emits = defineEmits<{
  uploadWindowClose: [] // 具名元组语法
}>()

let centerDialogVisible = ref(props.uploadWindowOpen)

interface ImageForm extends ImageEntity {
  // 这里可以添加额外的属性，比如departmentIdList
  departmentIdList: number[]
}

type ImageRequired = {
  image: ImageEntity
  departmentIdList: number[]
}

const imageInfo: ImageForm = reactive({
  patientId: props.dialogPatientId,
  imageDate: null, // 假设这是一个日期字符串
  imageDesc: null,
  studyId: props.dialogStudyId,
  imageTime: null, // 假设这也是一个日期时间字符串
  departmentIdList: []
})

const imageFormRef = ref<FormInstance>()

const departmentOptions: Ref<PermissionEntity[]> = ref([])

watch(
  () => {
    return props.uploadWindowOpen
  },
  (value, prevValue) => {
    centerDialogVisible.value = value
  }
)

function obtainDepartmentList() {
  getPermissionByCurrentUserIdApi()
    .then((res) => {
      if (res.success) {
        departmentOptions.value = res.data as PermissionEntity[]
      } else {
        message(res.msg, { type: 'error' })
      }
    })
    .catch((error) => {
      message(error, { type: 'error' })
    })
}

async function addOneImage() {
  if (!imageFormRef) return
  await imageFormRef.value!.validate((valid, fields) => {
    if (valid) {
      const imageRequired: ImageRequired = {
        image: imageInfo,
        departmentIdList: imageInfo.departmentIdList
      }
      console.log(imageRequired)
      const imageRequiredJson = JSON.parse(JSON.stringify(imageRequired))
      imageRequiredJson.image.patientId = props.dialogPatientId
      imageRequiredJson.image.studyId = props.dialogStudyId
      if (imageInfo.imageDate != '' && imageInfo.imageDate != null)
        imageRequiredJson.image.imageDate = dayjs(imageInfo.imageDate).format('YYYY-MM-DD')
      if (imageInfo.imageTime != '' && imageInfo.imageTime != null)
        imageRequiredJson.image.imageTime = dayjs(imageInfo.imageTime).format('HH:mm:ss')
      console.log(imageRequiredJson)
      addOneImageApi(imageRequiredJson)
        .then((res) => {
          if (res.success) {
            message('添加成功', { type: 'success' })
            resetForm(imageFormRef.value!)
            studyStateStore.getStudyListPage()
            emits('uploadWindowClose')
          } else {
            message(res.msg, { type: 'error' })
          }
        })
        .catch((error) => {
          message(error, { type: 'error' })
        })
    } else {
      message('请序列表单', { type: 'error' })
    }
  })
}

onMounted(() => {
  obtainDepartmentList()
})

const rules = reactive<FormRules>({
  accessionNumber: [
    {
      required: true,
      message: '请输入序列号',
      trigger: 'blur'
    }
  ],
  departmentIdList: [
    {
      required: true,
      message: '请选择科室',
      trigger: 'change'
    }
  ]
})
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    @close="$emit('uploadWindowClose')"
    title="新增患者"
    width="60%"
    center
  >
    <el-form :model="imageInfo" label-position="top" :rules="rules" ref="imageFormRef">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="序列名称" prop="imageName">
            <el-input v-model="imageInfo.imageName" placeholder="请输入序列名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检查部位" prop="imageCheckPart">
            <el-input v-model="imageInfo.imageCheckPart" placeholder="请输入序列部位" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="序列日期" prop="imageDate">
            <el-date-picker
              v-model="imageInfo.imageDate"
              type="date"
              placeholder="请输入序列日期"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="序列时间" prop="imageTime">
            <el-time-picker v-model="imageInfo.imageTime" placeholder="请输入序列时间" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="科室" prop="departmentIdList">
            <el-select
              v-model="imageInfo.departmentIdList"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="3"
              placeholder="选择科室"
              class="w-2/3"
            >
              <el-option
                v-for="item in departmentOptions"
                :key="item.permissionId"
                :label="item.description"
                :value="item.permissionId"
              >
                <span style="float: left">{{ item.description }}</span>
                <span
                  class="pl-6"
                  style="float: right; color: var(--el-text-color-secondary); font-size: 13px"
                >
                  {{ item.permissionName }}
                </span>
              </el-option>
            </el-select>
            <el-tooltip content="选择的科室都有权限查看此内容！" placement="bottom">
              <el-icon class="pl-2" color="red" size="16"><Warning /></el-icon>
            </el-tooltip>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="序列描述" prop="imageDesc">
            <el-input
              v-model="imageInfo.imageDesc"
              style="width: 100%"
              :autosize="{ minRows: 5, maxRows: 20 }"
              type="textarea"
              placeholder="请输入序列详情描述"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="resetForm(imageFormRef)">重置</el-button>
      <el-button type="primary" @click="addOneImage()"> 保存 </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
