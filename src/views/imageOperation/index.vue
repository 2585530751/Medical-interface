
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
import stackImagesView from '@/layouts/components/imageOperation/stackImagesView.vue';
import pngjpgImageDisplay from '@/layouts/components/imageOperation/pngjpgImageDisplay.vue';
</script>

<template>
  <div class="flex flex-col w-screen h-screen">
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
                ><div class="w-full h-full bg-center bg-no-repeat bg-contain bg-origin-border">
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
      <div class="flex flex-row w-full h-full gap-1">
        <div
          class="z-10 flex-none border-t-2 border-b-0 border-l-0 border-r-2 border-solid dark:border-stone-900 border-stone-200"
        >
          <nav-left-sidebar></nav-left-sidebar>
        </div>
        <div class="w-full border-t-2 border-b-0 border-l-2 border-r-2 border-solid dark:border-stone-900 border-stone-200">
          <splitpanes class="h-full default-theme" horizontal>
            <pane size="100"><pngjpgImageDisplay></pngjpgImageDisplay></pane>
            <pane size="0">
              <span>2</span>
            </pane>
          </splitpanes>
        </div>
        <div
          class="flex-none overflow-x-hidden overflow-y-auto border-t-2 border-b-0 border-l-2 border-r-0 border-solid navHeight dark:border-stone-900 border-stone-200">
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
