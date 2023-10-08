<script setup lang="ts">
import patientTable from '@/layouts/components/patient/patientTable.vue'
import patientSelection from '@/layouts/components/patient/selection.vue'
import { ref, onMounted } from 'vue'

const tableSize = ref('default')

const pageSize = ref(100)
const currentPage = ref(4)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<template>
  <div class="flex flex-col h-full w-4/5 mx-auto gap-y-5">
    <patient-selection @change-table-size="(size) => (tableSize = size)"></patient-selection>
    <patient-table :tableSize="tableSize"></patient-table>
    <el-card >
      <el-pagination class=" justify-center"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[100, 200, 300, 400]"
        :small="false"
        :disabled="false"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
