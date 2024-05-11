<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { IconifyIconOffline } from '@/components/ReIcon'
import plus from '@iconify-icons/ep/circle-plus'
import search from '@iconify-icons/ep/search'
import fold from '@iconify-icons/ep/fold'
import refresh from '@iconify-icons/ep/refresh'
import setUp from '@iconify-icons/ep/set-up'
import rank from '@iconify-icons/ep/rank'
import { chineseStandardTimeFormat,setAllPropertiesToNull } from '@/utils/commonUtils'
import applicationExport from '@/assets/svg/MdiApplicationExport.svg?component'
import applicationImport from '@/assets/svg/MdiApplicationImport.svg?component'
import { usePatientStateStore } from '@/store/modules/patientState'

defineOptions({
  name: 'patientSelection'
})

const emits = defineEmits<{
  changeTableSize: [size: string]
  changeTableCols: [cols: string[]]
}>()

const patientStateStore = usePatientStateStore()

const filterSelect = ref('patientName')
const filterSearch = ref('')

const visible = ref(false)

const patientForm: Record<string, any> = reactive({
  patientName: null,
  patientGender: null,
  dateOfBirthBegin: null,
  dateOfBirthEnd: null,
  phoneNumber: null,
  address: null,
  email: null
})

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCols = ref(['姓名', '性别', '电话', '邮箱', '住址', '出生日期'])
const cols = ['姓名', '性别', '电话', '邮箱', '住址', '体重', '身高', '身份证号', '出生日期']

const handleCheckAllChange = (val: boolean) => {
  checkedCols.value = val ? cols : []
  isIndeterminate.value = false
  emits('changeTableCols', checkedCols.value)
}
const handleCheckedColsChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cols.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cols.length
  emits('changeTableCols', value)
}

function singleConditionSearch() {
  setAllPropertiesToNull(patientStateStore.patientFilterCriteria)
  patientStateStore.patientFilterCriteria[filterSelect.value] = filterSearch.value
  patientStateStore.patientPagination.currentPage = 1
  patientStateStore.getPatientListPage()
}

function conditionalFilter() {
  setAllPropertiesToNull(patientStateStore.patientFilterCriteria)
  for (const key in patientForm) {
    if (patientForm.hasOwnProperty(key) && patientForm[key] !== null) {
      // 确保属性是对象自身的，而不是原型链上的
      patientStateStore.patientFilterCriteria[key] = patientForm[key] // 将属性和值复制到目标对象
      if (key === 'dateOfBirthBegin') {
        let dateFormat = chineseStandardTimeFormat(patientForm[key])
        patientStateStore.patientFilterCriteria[key] = dateFormat
      } else if (key === 'dateOfBirthEnd') {
        let dateFormat = chineseStandardTimeFormat(patientForm[key])
        // 使用split方法按空格分割字符串为日期和时间两部分
        let [datePart, timePart] = dateFormat.split(' ')
        // 替换时间部分为23:59:59
        let newTimePart = '23:59:59'
        // 拼接新的日期时间字符串
        let newDateTimeString = `${datePart} ${newTimePart}`
        patientStateStore.patientFilterCriteria[key] = newDateTimeString
      }
    }
  }
  patientStateStore.patientPagination.currentPage = 1
  patientStateStore.getPatientListPage()
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex flex-wrap items-center gap-4 w-30 h-14">
          <a class="text-2xl font-medium tracking-wide text-gray-600">患者列表</a>
        </div>

        <div class="flex flex-wrap items-center gap-5 w-30 h-14">
          <el-input style="width: 500px" placeholder="请输入查询的数据" v-model="filterSearch">
            <template #prepend>
              <el-select placeholder="选择" style="width: 100px" v-model="filterSelect">
                <el-option label="姓名" value="patientName" />
                <el-option label="性别" value="patientGender" />
                <el-option label="电话" value="phoneNumber" />
                <el-option label="邮箱" value="email" />
                <el-option label="住址" value="address" />
                <el-option label="出生日期" value="dateOfBirth" />
              </el-select>
            </template>
            <template #append>
              <el-button round @click="singleConditionSearch">
                <template #icon>
                  <IconifyIconOffline :icon="search"></IconifyIconOffline>
                </template>
              </el-button>
            </template>
          </el-input>

          <el-button round @click="visible = true">
            <template #icon>
              <IconifyIconOffline :icon="fold"></IconifyIconOffline>
            </template>
            高级筛选</el-button
          >
        </div>
      </div>
    </template>
    <div class="flex items-center justify-between">
      <div class="flex flex-wrap w-auto h-auto">
        <el-button round>
          <template #icon>
            <IconifyIconOffline :icon="plus"></IconifyIconOffline>
          </template>
          新增患者</el-button
        >
        <el-button round :icon="applicationImport" @click="patientStateStore.getPatientListPage"
          >导入患者</el-button
        >
        <el-button round :icon="applicationExport">导出患者</el-button>
      </div>
      <div class="flex flex-wrap items-center w-auto h-auto gap-x-3">
        <el-tooltip content="刷新" placement="top" effect="light">
          <IconifyIconOffline
            @click="
              setAllPropertiesToNull(patientStateStore.patientFilterCriteria),
                patientStateStore.getPatientListPage()
            "
            :icon="refresh"
            class="hover:text-blue-500"
            :style="{ fontSize: '24px' }"
          ></IconifyIconOffline>
        </el-tooltip>
        <el-tooltip content="密度" placement="top" effect="light">
          <el-dropdown trigger="click">
            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="rank"
              :style="{ fontSize: '24px' }"
            ></IconifyIconOffline>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$emit('changeTableSize', 'small')">紧凑</el-dropdown-item>
                <el-dropdown-item @click="$emit('changeTableSize', 'defult')"
                  >默认</el-dropdown-item
                >
                <el-dropdown-item @click="$emit('changeTableSize', 'large')">宽松</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-tooltip>
        <el-tooltip content="列设置" placement="top" effect="light">
          <el-dropdown trigger="click" placement="bottom-end" :hide-on-click="false">
            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="setUp"
              :style="{ fontSize: '24px' }"
            ></IconifyIconOffline>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-checkbox
                    v-model="checkAll"
                    :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange"
                    >列展示</el-checkbox
                  >
                </el-dropdown-item>
                <el-dropdown-item :divided="true"></el-dropdown-item>

                <el-checkbox-group v-model="checkedCols" @change="handleCheckedColsChange">
                  <el-dropdown-item v-for="(col, index) in cols" :key="index">
                    <el-checkbox :key="col" :label="col">{{ col }}</el-checkbox>
                  </el-dropdown-item>
                </el-checkbox-group>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-tooltip>
      </div>
    </div>
  </el-card>
  <el-drawer v-model="visible" title="高级筛选">
    <el-form :model="patientForm" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="patientForm.patientName" />
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="patientForm.patientGender">
          <el-radio label="男性" border>男性</el-radio>
          <el-radio label="女性" border>女性</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="patientForm.address" />
      </el-form-item>
      <el-form-item label="出生日期">
        <el-col :span="11">
          <el-date-picker
            v-model="patientForm.dateOfBirthBegin"
            type="date"
            placeholder="请选择日期范围"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-date-picker
            v-model="patientForm.dateOfBirthEnd"
            placeholder="请选择日期范围"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="patientForm.phoneNumber" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="patientForm.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="conditionalFilter">查询</el-button>
        <el-button @click="setAllPropertiesToNull(patientForm)">清空</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped></style>