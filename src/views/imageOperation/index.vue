<script setup lang="ts">
defineOptions({
  name: ''
})
import { ref, reactive } from 'vue'
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import navHeader from '@/layouts/components/imageOperation/header.vue'
import navLeftSidebar from '@/layouts/components/imageOperation/leftSidebar.vue'
import navRightSidebar from '@/layouts/components/imageOperation/rightSidebar.vue'
import imageDisplay from '@/layouts/components/imageOperation/imageDisplay.vue'
</script>

<template>
  <div class="h-screen w-screen flex flex-col">
    <div class="w-full h-12">
      <nav-header></nav-header>
    </div>

    <!-- <div class="grow">
      <splitpanes vertical="vertical" class="default-theme dark:bg-gray-950">
        <pane max-size="20" size="15" min-size="15">
          <nav-left-sidebar></nav-left-sidebar>
        </pane>
        <pane>
          <splitpanes horizontal="horizontal">
            <pane dark:border-gray-700 dark:bg-gray-800 size="100">
              <span
                ><div class="bg-origin-border bg-no-repeat bg-center bg-contain h-full w-full">
                  <image-display></image-display>
                </div>
              </span>
            </pane>
            <pane max-size="40" size="0">
              <span>2.1</span>
            </pane>
          </splitpanes>
        </pane>
        <pane max-size="20" size="15" min-size="15">
          <nav-right-sidebar></nav-right-sidebar>
        </pane>
      </splitpanes>
    </div> -->
    <div class="grow">
      <div class="h-full w-full flex flex-row gap-1">
        <div
          class="z-10 flex-none border-r-2 border-t-2 border-b-0 border-l-0 border-solid dark:border-stone-900 border-stone-200"
        >
          <nav-left-sidebar></nav-left-sidebar>
        </div>
        <div class="w-full border-r-2 border-t-2 border-b-0 border-l-2 border-solid dark:border-stone-900 border-stone-200">
          <splitpanes class="default-theme h-full" horizontal>
            <pane size="100"><image-display></image-display> </pane>
            <pane size="0">
              <span>2</span>
            </pane>
          </splitpanes>
        </div>
        <div
          class=" overflow-y-auto overflow-x-hidden navHeight flex-none border-r-0 border-t-2 border-b-0 border-l-2 border-solid dark:border-stone-900 border-stone-200">
          <nav-right-sidebar></nav-right-sidebar>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.splitpanes.default-theme .splitpanes__pane {
  background: none !important;
}
.navHeight {  
  height: calc(100vh - 50px);  
}
</style>
