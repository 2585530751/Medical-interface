<script setup lang="ts">
import studyTable from '@/layouts/components/studyList/studyTable.vue'
import studySelection from '@/layouts/components/studyList/selection.vue'
import { ref, onMounted } from 'vue'

const tableSize = ref('default')

const pageSize = ref(10)
const currentPage = ref(1)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<template>
  <div class="flex flex-col w-4/5 h-full mx-auto gap-y-5">
    <study-selection @change-table-size="(size) => (tableSize = size)"></study-selection>
    <study-table :tableSize="tableSize"></study-table>
    <el-card >
      <el-pagination class="justify-center "
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
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
