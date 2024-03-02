<script setup lang="ts">
import files from '@iconify-icons/ep/files'
import timer from '@iconify-icons/ep/timer'
import folder from '@iconify-icons/ep/folder'
import { imageUrl } from '@/api/utils'

const props = defineProps<{
  imagesList: ImageInfo
}>()

defineOptions({
  name: ''
})

console.log(props.imagesList)
</script>

<template>
  <div class="flex justify-center w-5/6 flex-nowrap">
    <div class="w-1/6">
      <input type="checkbox" />
    </div>
    <div class="flex flex-col justify-center w-4/6 gap-1 ">
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-500">
          {{ props.imagesList.imageEquipment }}
        </span>
        <span class="text-xs text-gray-500"
          ><IconifyIconOffline
            class="hover:text-blue-500"
            :icon="timer"
            :style="{ fontSize: '10px' }"
          ></IconifyIconOffline
          >{{ props.imagesList.imageCheckTime }}</span
        >
      </div>
      <div class="w-full h-full">
        <el-image
          fit="cover"
          class="border-2 border-solid rounded-lg border-slate-300"
          :src="imageUrl + props.imagesList.singleImageList[0].singleImagePath"
          :crossorigin="'anonymous'"
        />
      </div>
      <div class="flex items-center justify-between">
        <span class="text-xs text-gray-500">
          {{ props.imagesList.patientName }}
        </span>
        <span class="text-xs text-gray-500"
          ><IconifyIconOffline
            class="hover:text-blue-500"
            :icon="files"
            :style="{ fontSize: '10px' }"
          ></IconifyIconOffline
          >{{ props.imagesList.imageCount }}</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
