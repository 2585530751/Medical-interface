<script setup lang="ts">
import biTextIndentRight from '@/assets/svg/BiTextIndentRight.svg?component'
import files from '@iconify-icons/ep/files'
import folder from '@iconify-icons/ep/folder'
import type { IconifyIconOffline } from '@/components/ReIcon'
import arrowRight from '@iconify-icons/ep/arrow-right'
import { ref } from 'vue';
import imagesListDisplay from '@/components/ReImage/imagesListDisplay.vue'
import { useImageStateStore } from '@/store/imageState'

defineOptions({
  name: ''
})
const imagesList = useImageStateStore().imagesList
var display = ref(true)
</script>

<template>
  <div v-show="display" class="divide-x-0 divide-y-4 w-60 divide-double divide-slate-400/25 ">
    <div
      class="flex items-center justify-between flex-nowrap bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <div>
        <el-button-group>
          <el-button text> 序列 </el-button>
          <el-button text> 关联 </el-button>
        </el-button-group>
      </div>

      <div class="flex-none">
        <el-button text size="small" @click="display = !display">
          <biTextIndentRight style="height: 25px; width: 25px"></biTextIndentRight>
        </el-button>
      </div>
    </div>
    <div class="divide-x-0 divide-y-2 divide-slate-400/50 divide-solid">
      <div
        class="flex items-center justify-center py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
      >
        <el-button-group>
          <el-button text bg plain>主要</el-button>
          <el-button text bg plain>最近</el-button>
          <el-button text bg plain>所有</el-button>
        </el-button-group>
      </div>
      <div class="flex flex-col px-4 py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">2023-09-09</span>
          <el-button text>
            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="files"
              :style="{ fontSize: '15px' }"
            ></IconifyIconOffline
            >218
          </el-button>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-500">CT\PT\RTSTRUCT9</span>
          <el-button text>
            <IconifyIconOffline
              class="hover:text-blue-500"
              :icon="folder"
              :style="{ fontSize: '15px' }"
            ></IconifyIconOffline
            >4
          </el-button>
        </div>
      </div>
      <div
        class="flex flex-col justify-center gap-8 py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="flex justify-center w-5/6 flex-nowrap ">
          <div class="w-1/6 ">
            <input type="checkbox" />
          </div>
          <div class="flex flex-col justify-center w-4/6 gap-1">
            <div class="w-full h-full ">
              <img
                src="src/assets/images/{2AA25F20-AE72-4d6e-A136-A3BC0A02152B}.png"
                alt="Your Image"
                class="object-cover w-full h-full border-2 border-solid rounded-lg border-slate-300"
              />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">CTAC</span>
              <span class="text-xs text-gray-500"
                ><IconifyIconOffline
                  class="hover:text-blue-500"
                  :icon="files"
                  :style="{ fontSize: '10px' }"
                ></IconifyIconOffline
                >21</span
              >
            </div>
          </div>
        </div>
        <div class="flex justify-center w-5/6 flex-nowrap">
          <div class="w-1/6 ">
            <input type="checkbox" />
          </div>
          <div class="flex flex-col justify-center w-4/6 gap-1">
            <div class="w-full h-full ">
              <img
                src="src/assets/images/{2AA25F20-AE72-4d6e-A136-A3BC0A02152B}.png"
                alt="Your Image"
                class="object-cover w-full h-full border-2 border-solid rounded-lg border-slate-300"
              />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">CTAC</span>
              <span class="text-xs text-gray-500"
                ><IconifyIconOffline
                  class="hover:text-blue-500"
                  :icon="files"
                  :style="{ fontSize: '10px' }"
                ></IconifyIconOffline
                >21</span
              >
            </div>
          </div>
        </div>
        <div class="flex justify-center w-5/6 flex-nowrap">
          <div class="w-1/6 ">
            <input type="checkbox" />
          </div>
          <div class="flex flex-col justify-center w-4/6 gap-1">
            <div class="w-full h-full">
              <img
                src="src/assets/images/{2AA25F20-AE72-4d6e-A136-A3BC0A02152B}.png"
                alt="Your Image"
                class="object-cover w-full h-full border-2 border-solid rounded-lg border-slate-300"
              />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-xs text-gray-500">CTAC</span>
              <span class="text-xs text-gray-500"
                ><IconifyIconOffline
                  class="hover:text-blue-500"
                  :icon="files"
                  :style="{ fontSize: '10px' }"
                ></IconifyIconOffline
                >21</span
              >
            </div>
          </div>
        </div>
        <imagesListDisplay :imagesList="imagesList"></imagesListDisplay>
      </div>
      
    </div>
  </div>
  <div v-show="!display" @click="display = !display" class="fixed left-0 flex items-center w-4 h-10 bg-gray-300 rounded cursor-pointer top-80 dark:bg-gray-600 hover:dark:bg-gray-300 hover:bg-gray-600">
    <IconifyIconOffline
      class="hover:text-blue-500"
      :icon="arrowRight"
      :style="{ fontSize: '20px' }"
    ></IconifyIconOffline>
  </div>
</template>

<style lang="scss" scoped></style>