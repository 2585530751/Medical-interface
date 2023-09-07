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
</script>

<template>
  <div class="h-screen w-screen flex flex-col">
    <div class=" w-full h-12 ">
      <nav-header></nav-header>
    </div>

    <div class="grow">
      <splitpanes vertical="vertical" class="default-theme dark:bg-gray-950">
        <pane max-size="20" size="10" class="w-1/40">
          <nav-left-sidebar></nav-left-sidebar>
        </pane>
        <pane>
          <splitpanes horizontal="horizontal">
            <pane dark:border-gray-700 dark:bg-gray-800>
              <span>ss</span>
            </pane>
            <pane max-size="40" size="30">
              <span>2.1</span>
            </pane>
          </splitpanes>
        </pane>
        <pane max-size="20" size="15"> 
          <nav-right-sidebar></nav-right-sidebar>
        </pane>
      </splitpanes>
    </div>
  </div>
</template>

<style lang="scss" >

.splitpanes.default-theme .splitpanes__pane{
  background: none!important;
}

</style>
