<script setup lang="ts">
import { toggleDark, isDark } from '@/composables'; 
</script>

<template>
  <button @click="toggleDark()">
    

    <span class="ml-2">{{ isDark }}</span>
  </button>
</template>