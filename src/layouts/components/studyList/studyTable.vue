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
    studyID: 1,
    studyName: '张三',
    age: 35,
    gender: '男性',
    contact: '13888888888',
    address: '北京市朝阳区',
    healthStatus: '高血压',
    reasonForVisit: '头痛',
    visitDate: '2022-01-01',
    diagnosis: '高血压引起的头痛',
    followUpNeeded: true,
    followUpVisits: [
      {
        followUpDate: '2022-01-10',
        followUpResult: '血压控制良好，继续药物治疗'
      },
      {
        followUpDate: '2022-02-10',
        followUpResult: '血压略升高，需要增加药物剂量'
      }
    ]
  }
]

const filterGender = (value: string, row: any, column: any) => {
  return row.gender === value
}
</script>

<template>
  <el-card class="box-card">
    <el-table
      ref="tableRef"
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'visitDate', order: 'descending' }"
      :size="tableSize"
    >
      <el-table-column type="expand">
        <template #default="props">
          <div m="4">
            <p m="t-0 b-2">State: {{ props.row.state }}</p>
            <p m="t-0 b-2">City: {{ props.row.city }}</p>
            <p m="t-0 b-2">Address: {{ props.row.address }}</p>
            <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
            <h3>随访记录</h3>
            <el-table :data="props.row.followUpVisits">
              <el-table-column label="随访日期" prop="followUpDate" />
              <el-table-column label="随访结果" prop="followUpResult" />
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="就诊日期" prop="visitDate" sortable />
      <el-table-column label="姓名" prop="studyName" />
      <el-table-column
        label="性别"
        prop="gender"
        :filters="[
          { text: '男性', value: '男性' },
          { text: '女性', value: '女性' }
        ]"
        :filter-method="filterGender"
        filter-placement="top-end"
      />
      <el-table-column sortable label="年龄" prop="age" />
      <el-table-column label="联系方式" prop="contact" />
      <el-table-column label="住址" prop="address" />
      <el-table-column label="健康状况" prop="healthStatus" />
      <el-table-column label="就诊原因" prop="reasonForVisit" />
      <el-table-column label="诊断结果" prop="diagnosis" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default>
          <el-button link type="primary" size="small"
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
