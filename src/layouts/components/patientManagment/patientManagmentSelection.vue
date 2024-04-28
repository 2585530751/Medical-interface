<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { IconifyIconOffline } from '@/components/ReIcon'
import plus from '@iconify-icons/ep/circle-plus'
import search from '@iconify-icons/ep/search'
import fold from '@iconify-icons/ep/fold'
import refresh from '@iconify-icons/ep/refresh'
import setUp from '@iconify-icons/ep/set-up'
import rank from '@iconify-icons/ep/rank'


import applicationExport from '@/assets/svg/MdiApplicationExport.svg?component'
import applicationImport from '@/assets/svg/MdiApplicationImport.svg?component'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

const dialogOverflowVisible = ref(false)
const emit = defineEmits<{
  changeTableSize: [size: string]
}>()

const formInline = reactive({
  user: '',
  region: '',
  date: ''
})
const tableSize = ref('small')
const onSubmit = () => {
  console.log('submit!')
}
const visible = ref(false)

// do not use same name with ref
const form = reactive({
  patientName: '',
  ageBegin: '',
  ageEnd: '',
  gender: '',
  dateBegin: '',
  dateEnd: '',
  contact: '',
  address: '',
  healthStatus: '',
  reasonForVisit: '',
  diagnosis: ''
})

const checkAll = ref(false)
const isIndeterminate = ref(true)
const checkedCols = ref([
  '姓名',
  '性别',
  '年龄',
  '联系方式',
  '住址',
  '健康状况',
  '就诊原因',
  '就诊日期',
  '诊断结果'
])
const cols = [
  '姓名',
  '性别',
  '年龄',
  '联系方式',
  '住址',
  '健康状况',
  '就诊原因',
  '就诊日期',
  '诊断结果',
  '是否复诊'
]

const handleCheckAllChange = (val: boolean) => {
  checkedCols.value = val ? cols : []
  isIndeterminate.value = false
}
const handleCheckedColsChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === cols.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cols.length
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="flex justify-between items-center">
        <div class="flex flex-wrap w-30 gap-4 h-14 items-center">
          <a class="font-medium tracking-wide text-2xl text-gray-600">患者列表</a>
        </div>

        <div class="w-30 h-14 flex flex-wrap items-center">
          <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top: 1.125rem">
            <el-form-item>
              <el-input style="width: 500px" placeholder="请输入查询的数据" class="input-with-select">
                <template #prepend>
                  <el-select placeholder="选择" style="width: 100px">
                    <el-option label="姓名" value="patientName" />
                    <el-option label="联系方式" value="contact" />
                    <el-option label="住址" value="address" />
                  </el-select>
                </template>
                <template #append>
                  <el-button round @click="onSubmit">
                    <template #icon>
                      <IconifyIconOffline :icon="search"></IconifyIconOffline>
                    </template>
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-button round @click="visible = true">
            <template #icon>
              <IconifyIconOffline :icon="fold"></IconifyIconOffline>
            </template>
            高级筛选</el-button>
        </div>
      </div>
    </template>
    <div class="flex justify-between items-center">

      <div class="flex flex-wrap w-auto h-auto">
        <el-button round plain @click="dialogOverflowVisible = true">
          <template #icon>
            <IconifyIconOffline :icon="plus"></IconifyIconOffline>
          </template>
          添加患者
        </el-button>
        <el-button round :icon="applicationImport">导入患者</el-button>
        <el-button round :icon="applicationExport">导出患者</el-button>
        
        <el-dialog
          v-model="dialogOverflowVisible"
          title="添加患者"
          width="50%"
          draggable
          overflow
        >
          <span>It's a overflow draggable Dialog</span>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogOverflowVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogOverflowVisible = false">
                下一步
              </el-button>
            </div>
          </template>
        </el-dialog>
      </div>

      <div class="flex flex-wrap w-auto h-auto gap-x-3 items-center">
        <el-tooltip content="刷新" placement="top" effect="light">
          <IconifyIconOffline :icon="refresh" class="hover:text-blue-500" :style="{ fontSize: '24px' }">
          </IconifyIconOffline>
        </el-tooltip>
        <el-tooltip content="密度" placement="top" effect="light">
          <el-dropdown trigger="click">
            <IconifyIconOffline class="hover:text-blue-500" :icon="rank" :style="{ fontSize: '24px' }">
            </IconifyIconOffline>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$emit('changeTableSize', 'small')">紧凑</el-dropdown-item>
                <el-dropdown-item @click="$emit('changeTableSize', 'defult')">默认</el-dropdown-item>
                <el-dropdown-item @click="$emit('changeTableSize', 'large')">宽松</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-tooltip>
        <el-tooltip content="列设置" placement="top" effect="light">
          <el-dropdown trigger="click" placement="bottom-end" :hide-on-click="false">
            <IconifyIconOffline class="hover:text-blue-500" :icon="setUp" :style="{ fontSize: '24px' }">
            </IconifyIconOffline>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                    @change="handleCheckAllChange">列展示</el-checkbox>
                </el-dropdown-item>
                <el-dropdown-item divided="true"></el-dropdown-item>

                <el-checkbox-group v-model="checkedCols" @change="handleCheckedColsChange">
                  <el-dropdown-item v-for="col in cols">
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
    <el-form :model="form" label-width="120px">
      <el-form-item label="姓名">
        <el-input v-model="form.patientName" />
      </el-form-item>
      <el-form-item label="年龄">
        <el-col :span="11">
          <el-select v-model="form.ageBegin" placeholder="选择年龄范围" style="width: 100%" />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-select v-model="form.ageEnd" placeholder="选择年龄范围" style="width: 100%" />
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.gender">
          <el-radio label="1" border>男性</el-radio>
          <el-radio label="2" border>女性</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="住址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="就诊日期">
        <el-col :span="11">
          <el-date-picker v-model="form.dateBegin" type="date" placeholder="请选择日期范围" style="width: 100%" />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-date-picker v-model="form.dateEnd" placeholder="请选择日期范围" style="width: 100%" />
        </el-col>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="form.contact" />
      </el-form-item>
      <el-form-item label="健康状况">
        <el-input v-model="form.healthStatus" />
      </el-form-item>
      <el-form-item label="就诊原因">
        <el-input v-model="form.reasonForVisit" />
      </el-form-item>
      <el-form-item label="诊断结果">
        <el-input v-model="form.diagnosis" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button>清空</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
