<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import type { SeriesInfo } from '@/types/series'
import seriesDicom from '@/components/ReImage/seriesDicom.vue'
import { basicImageUrl } from '@/api/utils'
import { DArrowRight } from '@element-plus/icons-vue'

const props = defineProps<{
  diagnosticResultWindowOpen?: boolean
  seriesInfo: SeriesInfo
}>()

console.log('props.seriesInfo', props.seriesInfo)

const diagnosticResult = reactive({
  seriesId: props.seriesInfo.seriesId,
  doctorView: ''
})

const emits = defineEmits<{
  diagnosticResultWindowClose: [] // 具名元组语法
}>()

let centerDialogVisible = ref(props.diagnosticResultWindowOpen)

watch(
  () => {
    return props.diagnosticResultWindowOpen
  },
  (value, prevValue) => {
    centerDialogVisible.value = value
  }
)
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    @close="$emit('diagnosticResultWindowClose')"
    title="诊断意见"
    width="60%"
    center
  >
    <div class="flex items-center justify-between w-full">
      <div
        class="flex flex-col items-center justify-center w-full gap-2"
        v-if="
          props.seriesInfo.seriesPreviewPath != null && props.seriesInfo.seriesPreviewPath != ''
        "
      >
        <el-text>初始序列预览</el-text>
        <el-image
          :src="basicImageUrl + props.seriesInfo.seriesPreviewPath"
          :crossorigin="'anonymous'"
          v-show="
            props.seriesInfo.seriesPreviewPath.endsWith('.png') ||
            props.seriesInfo.seriesPreviewPath.endsWith('.jpg') ||
            props.seriesInfo.seriesPreviewPath.endsWith('.jpeg')
          "
        />
        <seriesDicom
          class="size-56"
          keyValue="DiagnosticPreview"
          :series-info="props.seriesInfo"
          :series-path="props.seriesInfo.seriesPreviewPath"
          v-show="props.seriesInfo.seriesPreviewPath.endsWith('.dcm')"
        />
      </div>

      <el-icon
        v-if="
          props.seriesInfo.markSeriesPreviewPath != null &&
          props.seriesInfo.markSeriesPreviewPath != ''
        "
        size="48"
        class="block"
        ><DArrowRight
      /></el-icon>

      <div
        class="flex flex-col items-center justify-center w-full gap-2"
        v-if="
          props.seriesInfo.markSeriesPreviewPath != null &&
          props.seriesInfo.markSeriesPreviewPath != ''
        "
      >
        <el-text>已阅序列预览</el-text>
        <el-image
          :src="basicImageUrl + props.seriesInfo.markSeriesPreviewPath"
          :crossorigin="'anonymous'"
          v-show="
            props.seriesInfo.markSeriesPreviewPath.endsWith('.png') ||
            props.seriesInfo.markSeriesPreviewPath.endsWith('.jpg') ||
            props.seriesInfo.markSeriesPreviewPath.endsWith('.jpeg')
          "
        />
        <seriesDicom
          class="size-56"
          keyValue="MarkDiagnosticPreview"
          :series-info="props.seriesInfo"
          :series-path="props.seriesInfo.markSeriesPreviewPath"
          v-show="props.seriesInfo.markSeriesPreviewPath.endsWith('.dcm')"
        />
      </div>
    </div>

    <el-form ref="ruleFormRef" :model="diagnosticResult" label-position="top">
      <el-form-item label="医生建议" prop="doctorView">
        <el-input
          v-model="diagnosticResult.doctorView"
          type="textarea"
          placeholder="请输入成像描述"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <span class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary"> 下一步 </el-button>
        </span>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
