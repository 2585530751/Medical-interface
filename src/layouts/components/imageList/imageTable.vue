<script setup lang="ts">
import type { TableInstance } from 'element-plus'
import { ref } from 'vue'
import editPen from '@iconify-icons/ep/edit-pen'
import deleteUser from '@iconify-icons/ep/delete'
import IonEllipsisHorizontal from '@/assets/svg/IonEllipsisHorizontal.svg?component'

defineProps<{
  tableSize: string
}>()

const tableRef = ref<TableInstance>()
const tableData = [
  {
    imageId:13,
    imageCheckTime: '2023-05-03',
    patientId:4,
    patientName: '王老五',
    imageCheckPart: '肺部',
    imagingDevice: 'CT',
    imageDescription: '疑似肺部肿瘤',
    imageCount: '32',
    createId:2,
    creatorName: '王老八',
    createTime: '2023-09-03'
  },
  {
    "imageId": 1,
    "imageCheckTime": "2023-05-03",
    "patientId": 1,
    "patientName": "患者1",
    "imageCheckPart": "胸部",
    "imagingDevice": "CT",
    "imageDescription": "疑似肿瘤",
    "imageCount": 32,
    "createId": 1,
    "creatorName": "医生1",
    "createTime": "2023-09-03"
  },
  {
    "imageId": 2,
    "imageCheckTime": "2023-05-03",
    "patientId": 2,
    "patientName": "患者2",
    "imageCheckPart": "头部",
    "imagingDevice": "MRI",
    "imageDescription": "疑似炎症",
    "imageCount": 45,
    "createId": 2,
    "creatorName": "医生2",
    "createTime": "2023-09-03"
  },
  {
    "imageId": 3,
    "imageCheckTime": "2023-05-03",
    "patientId": 3,
    "patientName": "患者3",
    "imageCheckPart": "四肢",
    "imagingDevice": "X射线",
    "imageDescription": "疑似损伤",
    "imageCount": 27,
    "createId": 3,
    "creatorName": "医生3",
    "createTime": "2023-09-03"
  },
  {
    "imageId": 4,
    "imageCheckTime": "2023-05-03",
    "patientId": 4,
    "patientName": "患者4",
    "imageCheckPart": "全身",
    "imagingDevice": "超声波",
    "imageDescription": "疑似结石",
    "imageCount": 18,
    "createId": 4,
    "creatorName": "医生4",
    "createTime": "2023-09-03"
  },
  {
    "imageId": 5,
    "imageCheckTime": "2023-05-03",
    "patientId": 5,
    "patientName": "患者5",
    "imageCheckPart": "颈部",
    "imagingDevice": "CT",
    "imageDescription": "疑似畸形",
    "imageCount": 50,
    "createId": 5,
    "creatorName": "医生5",
    "createTime": "2023-09-03"
  },
  {
    "imageId": 6,
    "imageCheckTime": "2023-05-03",
    "patientId": 6,
    "patientName": "患者6",
    "imageCheckPart": "腹部",
    "imagingDevice": "MRI",
    "imageDescription": "疑似炎症",
    "imageCount": 36,
    "createId": 6,
    "creatorName": "医生6",
    "createTime": "2023-09-03"
  },
  {
    "imageId": 7,
    "imageCheckTime": "2023-05-03",
    "patientId": 7,
    "patientName": "患者7",
    "imageCheckPart": "骨盆",
    "imagingDevice": "X射线",
    "imageDescription": "疑似损伤",
    "imageCount": 22,
    "createId": 7,
    "creatorName": "医生7",
    "createTime": "2023-09-03"
  },
  {
    "imageId": 8,
    "imageCheckTime": "2023-05-03",
    "patientId": 8,
    "patientName": "患者8",
    "imageCheckPart": "头部",
    "imagingDevice": "超声波",
    "imageDescription": "疑似肿瘤",
    "imageCount": 15,
    "createId": 8,
    "creatorName": "医生8",
    "createTime": "2023-09-03"
  },
  {
    "imageId": 9,
    "imageCheckTime": "2023-05-03",
    "patientId": 9,
    "patientName": "患者9",
    "imageCheckPart": "颈部",
    "imagingDevice": "CT",
    "imageDescription": "疑似结石",
    "imageCount": 40,
    "createId": 9,
    "creatorName": "医生9",
    "createTime": "2023-09-03"
  },
  {
    "imageId": 10,
    "imageCheckTime": "2023-05-03",
    "patientId": 10,
    "patientName": "患者10",
    "imageCheckPart": "腰部",
    "imagingDevice": "MRI",
    "imageDescription": "疑似畸形",
    "imageCount": 28,
    "createId": 10,
    "creatorName": "医生10",
    "createTime": "2023-09-03"
  }
]
</script>

<template>
  <el-card class="box-card">
    <el-table
      ref="tableRef"
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'imageCheckTime', order: 'descending' }"
      :size="tableSize"
    >
      <el-table-column type="expand">
        <template #default="props">
          <el-button type="primary">基础阅片</el-button>
          <el-button type="primary">显微镜</el-button>
        </template>
      </el-table-column>
      <el-table-column label="检查时间" prop="imageCheckTime" sortable />
      <el-table-column label="患者姓名" prop="patientName" />
      <el-table-column label="检查部位" prop="imageCheckPart" />
      <el-table-column label="成像设备" prop="imagingDevice" />
      <el-table-column label="图像描述" prop="imageDescription" />
      <el-table-column label="序列数量" prop="imageCount" />
      <el-table-column label="上传医生" prop="creatorName" />
      <el-table-column label="上传时间" prop="createTime" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default>
          <el-button link type="primary" size="small" @click=""
            ><template #icon>
              <IconifyIconOffline :icon="editPen"></IconifyIconOffline>
            </template>
            修改</el-button
          >
          <el-popconfirm title="你确定要删除他吗?">
            <template #reference>
              <el-button link type="primary" size="small">
                <template #icon>
                  <IconifyIconOffline :icon="deleteUser"></IconifyIconOffline>
                </template>
                删除</el-button
              >
            </template>
          </el-popconfirm>

          <el-button :icon="IonEllipsisHorizontal" link type="primary" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped></style>
