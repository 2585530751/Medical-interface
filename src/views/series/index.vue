<script setup lang="ts">
import seriesTable from '@/layouts/components/series/seriesTable.vue'
import seriesSelection from '@/layouts/components/series/selection.vue'
import { ref, onMounted } from 'vue'
import {useSeriesStateStore } from '@/store/modules/seriesState'

const seriesStateStore =useSeriesStateStore()
const tableSize = ref('default')
const tableCols = ref(['序列名称', '序列格式', '图像数量', '患者姓名', '序列日期', '序列时间', '序列描述'])

const handleSizeChange = (val: number) => {
  seriesStateStore.seriesPagination.pageSize = val
  seriesStateStore.getSeriesListPage()
}
const handleCurrentChange = (val: number) => {
  seriesStateStore.seriesPagination.currentPage = val
  seriesStateStore.getSeriesListPage()
}
</script>

<template>
  <div class="flex flex-col w-4/5 h-full mx-auto gap-y-5">
    <series-selection
      @change-table-size="(size) => (tableSize = size)"
      @change-table-cols="(cols) => (tableCols = cols)"
    ></series-selection>
    <series-table :tableSize="tableSize" :tableCols="tableCols"></series-table>
    <el-card>
      <el-pagination
        class="justify-center"
        :current-page="seriesStateStore.seriesPagination.currentPage"
        :page-size="seriesStateStore.seriesPagination.pageSize"
        :small="false"
        :disabled="false"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="seriesStateStore.seriesPagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
