<script setup lang="ts">
import biTextIndentRight from '@/assets/svg/BiTextIndentRight.svg?component'
import files from '@iconify-icons/ep/files'
import folder from '@iconify-icons/ep/folder'
import type { IconifyIconOffline } from '@/components/ReIcon'
import arrowRight from '@iconify-icons/ep/arrow-right'
import { ref } from 'vue';
defineOptions({
  name: ''
})
var display = ref(true)
</script>

<template>
  <div v-show="display" class="w-60 divide-double divide-y-4 divide-slate-400/25 divide-x-0 ">
    <div
      class="flex flex-nowrap justify-between items-center bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
    >
      <div>
        <el-button-group>
          <el-button text> 序列 </el-button>
          <el-button text> 关联 </el-button>
        </el-button-group>
      </div>

      <div class="flex-none">
        <el-button text type="small" @click="display = !display">
          <biTextIndentRight style="height: 25px; width: 25px"></biTextIndentRight>
        </el-button>
      </div>
    </div>
    <div class="divide-slate-400/50 divide-y-2 divide-x-0 divide-solid">
      <div
        class="flex justify-center items-center py-2 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
      >
        <el-button-group>
          <el-button text bg plain>主要</el-button>
          <el-button text bg plain>最近</el-button>
          <el-button text bg plain>所有</el-button>
        </el-button-group>
      </div>
      <div class="flex flex-col py-2 px-4 bg-stone-50 dark:border-gray-700 dark:bg-gray-800">
        <div class="flex justify-between items-center">
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
        <div class="flex justify-between items-center">
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
        class="flex justify-center flex-col py-2 gap-8 bg-stone-50 dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="w-5/6 flex flex-nowrap justify-center ">
          <div class="w-1/6 ">
            <input type="checkbox" />
          </div>
          <div class="w-4/6 flex flex-col justify-center gap-1">
            <div class="w-full h-full ">
              <img
                src="src/assets/images/{2AA25F20-AE72-4d6e-A136-A3BC0A02152B}.png"
                alt="Your Image"
                class="object-cover w-full h-full rounded-lg border-2 border-slate-300 border-solid"
              />
            </div>
            <div class="flex justify-between items-center">
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
        <div class="w-5/6 flex flex-nowrap justify-center">
          <div class="w-1/6 ">
            <input type="checkbox" />
          </div>
          <div class="w-4/6 flex flex-col justify-center gap-1">
            <div class="w-full h-full ">
              <img
                src="src/assets/images/{2AA25F20-AE72-4d6e-A136-A3BC0A02152B}.png"
                alt="Your Image"
                class="object-cover w-full h-full rounded-lg border-2 border-slate-300 border-solid"
              />
            </div>
            <div class="flex justify-between items-center">
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
        <div class="w-5/6 flex flex-nowrap justify-center">
          <div class="w-1/6 ">
            <input type="checkbox" />
          </div>
          <div class="w-4/6 flex flex-col justify-center gap-1">
            <div class="w-full h-full">
              <img
                src="src/assets/images/{2AA25F20-AE72-4d6e-A136-A3BC0A02152B}.png"
                alt="Your Image"
                class="object-cover w-full h-full rounded-lg border-2 border-slate-300 border-solid"
              />
            </div>
            <div class="flex justify-between items-center">
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
        
      </div>
      
    </div>
  </div>
  <div v-show="!display" @click="display = !display" class="cursor-pointer fixed top-80 left-0 h-10 w-4 flex items-center bg-gray-300 dark:bg-gray-600 rounded hover:dark:bg-gray-300 hover:bg-gray-600">
    <IconifyIconOffline
      class="hover:text-blue-500"
      :icon="arrowRight"
      :style="{ fontSize: '20px' }"
    ></IconifyIconOffline>
  </div>
</template>

<style lang="scss" scoped></style>
