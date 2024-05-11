<script setup lang="ts">
import type { TableInstance } from 'element-plus'
import { onMounted, ref, watch } from 'vue'
import zoomIn from '@iconify-icons/ep/zoom-in'
import IonEllipsisHorizontal from '@/assets/svg/IonEllipsisHorizontal.svg?component'
import { usePatientStateStore } from '@/store/modules/patientState'
import { useStudyStateStore } from '@/store/modules/studyState'
import { useSeriesStateStore } from '@/store/modules/seriesState'
import { setAllPropertiesToNull } from '@/utils/commonUtils'
import router from '@/router'

const props = defineProps<{
  tableSize: string
  tableCols: string[]
}>()

const tableRef = ref<TableInstance>()
const patientStateStore = usePatientStateStore()
const studyStateStore = useStudyStateStore()
const seriesStateStore = useSeriesStateStore()

const filterGender = (value: string, row: any, column: any) => {
  return row.patientGender === value
}

onMounted(() => {
  patientStateStore.getPatientListPage()
})

function viewChecklist(patientId: number) {
  setAllPropertiesToNull(studyStateStore.studyFilterCriteria)
  studyStateStore.studyPagination.currentPage = 1
  studyStateStore.studyPatientId = patientId
  studyStateStore.getStudyListPage()
  router.push('/study')
}

function viewSerieslistByPaitentId(patientId: number) {
  setAllPropertiesToNull(seriesStateStore.seriesFilterCriteria)
  seriesStateStore.seriesPagination.currentPage = 1
  seriesStateStore.seriesPatientId = patientId
  seriesStateStore.seriesStudyId = null
  seriesStateStore.getSeriesListPage()
  router.push('/series')
}

function viewSerieslistByStudyId(studyId: number) {
  setAllPropertiesToNull(seriesStateStore.seriesFilterCriteria)
  seriesStateStore.seriesPagination.currentPage = 1
  seriesStateStore.seriesPatientId = null
  seriesStateStore.seriesStudyId = studyId
  seriesStateStore.getSeriesListPage()
  router.push('/series')
}
</script>

<template>
  <el-card class="box-card">
    <el-table
      ref="tableRef"
      :data="patientStateStore.patientListTableData"
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
            <div class="w-11/12">
              <h3>检查详情</h3>
              <el-table
                :data="props.row.studyList"
                :border="true"
                resizable
                class="dark:bg-neutral-900"
              >
                <el-table-column label="检查日期" prop="studyDate" />
                <el-table-column label="检查时间" prop="studyTime" />
                <el-table-column sortable label="患者年龄" prop="patientAge" />
                <el-table-column label="检查次序" prop="accessionNumber" />
                <el-table-column label="检查部位" prop="bodyPartExamined" />
                <el-table-column label="检查描述" prop="studyDescription" />
                <el-table-column fixed="right" label="操作" width="200">
                  <template #default="scope">
                    <el-button link type="primary" size="small" @click="viewSerieslistByStudyId(scope.row.studyId)"
                      ><template #icon>
                        <IconifyIconOffline :icon="zoomIn"></IconifyIconOffline>
                      </template>
                      序列</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-if="props.tableCols.includes('姓名')" label="姓名" prop="patientName" />
      <el-table-column
        v-if="props.tableCols.includes('性别')"
        label="性别"
        prop="patientGender"
        :filters="[
          { text: '男性', value: '男性' },
          { text: '女性', value: '女性' }
        ]"
        :filter-method="filterGender"
        filter-placement="top-end"
      />
      <el-table-column label="电话" v-if="props.tableCols.includes('电话')" prop="phoneNumber" />
      <el-table-column label="邮箱" v-if="props.tableCols.includes('邮箱')" prop="email" />
      <el-table-column label="住址" v-if="props.tableCols.includes('住址')" prop="address" />
      <el-table-column label="身高" v-if="props.tableCols.includes('身高')" prop="patientHeight" />
      <el-table-column label="体重" v-if="props.tableCols.includes('体重')" prop="patientWeight" />
      <el-table-column
        label="身份证号"
        v-if="props.tableCols.includes('身份证号')"
        prop="patientIdCardNumber"
      />
      <el-table-column
        v-if="props.tableCols.includes('出生日期')"
        sortable
        label="出生日期"
        prop="dateOfBirth"
      />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default="scope">
          <el-button link type="primary" size="default" @click="viewChecklist(scope.row.patientId)"
            ><template #icon>
              <IconifyIconOffline :icon="zoomIn"></IconifyIconOffline>
            </template>
            检查</el-button
          >
          <el-button link type="primary" size="default" @click="viewSerieslistByPaitentId(scope.row.patientId)"
            ><template #icon>
              <IconifyIconOffline :icon="zoomIn"></IconifyIconOffline>
            </template>
            序列</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped></style>
