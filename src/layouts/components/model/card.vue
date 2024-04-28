<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { getAllModelsInfoApi } from '@/api/model'
import { onMounted, ref } from 'vue'

defineOptions({
  name: 'card'
})

const modelInfoLists = ref([])

function getAllModelsInfo() {
  getAllModelsInfoApi().then((res: any) => {
    console.log(res)
  })
}

onMounted(() => {
  getAllModelsInfo()
})


</script>

<template>
  <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap justify-center -m-4">
        <div v-for="(modelInfo,index) in modelInfoLists" :key="index" class="p-4 md:w-1/4">
          <div class="h-full overflow-hidden border-2 border-gray-200 rounded-lg border-opacity-60">
            <img
              class="object-cover object-center w-full lg:h-48 md:h-36"
              src="@/assets/images/example2.png"
              alt="blog"
            />
            <div class="p-6">
              <h2 class="mb-1 text-xs font-medium tracking-widest text-gray-400 title-font">
                CATEGORY
              </h2>
              <h1 class="mb-3 text-lg font-medium text-gray-900 title-font dark:text-white">
                ROC曲线
              </h1>
              <p class="mb-3 leading-relaxed">
                两组患者第3天、第5天、第7天误吸风险等级人数情况相比如表10所示，第3天和第5天P＞0.05差异无统计学意义，第7天误吸风险等级人数情况相比P＜0.05差异有统计学意义。
              </p>
              <div class="flex flex-wrap items-center">
                <a class="flex items-center text-indigo-500 md:mb-2 lg:mb-0">
                  <router-link class="flex items-center" to="/model/modelDescription"
                    >Learn More</router-link
                  >
                  <svg
                    class="w-4 h-4 ml-2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <span
                  class="inline-flex items-center py-1 pr-3 ml-auto mr-3 text-sm leading-none text-gray-400 border-r-2 border-gray-200 lg:ml-auto md:ml-0"
                >
                  <svg
                    class="w-4 h-4 mr-1"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle></svg
                  >1.2K
                </span>
                <span class="inline-flex items-center text-sm leading-none text-gray-400">
                  <svg
                    class="w-4 h-4 mr-1"
                    stroke="currentColor"
                    stroke-width="2"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                    ></path></svg
                  >6
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
