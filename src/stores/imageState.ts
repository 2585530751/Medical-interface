import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import * as cornerstoneTools from '@cornerstonejs/tools';
import type { IToolGroup } from '@cornerstonejs/tools/dist/esm/types';

const {
  Enums: csToolsEnums,
} = cornerstoneTools;
const { MouseBindings } = csToolsEnums;

export const useImageStateStore = defineStore('imageState', () => {
  const leftMouseActive = ref('')
  const toolGroup: Ref<IToolGroup> = ref() as Ref<IToolGroup>
  function bindLeftMouse(newLeftMouseActive:string){
    toolGroup!.value.setToolPassive(leftMouseActive.value);
    leftMouseActive.value = newLeftMouseActive;
    console.log(newLeftMouseActive)
    toolGroup!.value.setToolActive(leftMouseActive.value, {
      bindings: [
        {
          mouseButton: MouseBindings.Primary, // Left Click
        },
      ],
    });
    console.log(leftMouseActive.value)
  }

  return { leftMouseActive, toolGroup, bindLeftMouse }
})