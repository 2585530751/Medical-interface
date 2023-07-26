<script setup lang='ts'>
import type { IconifyIconOffline } from "@/components/ReIcon";
import arrowDown from "@iconify-icons/ep/arrow-down";
import arrowUp from "@iconify-icons/ep/arrow-up"
import { ref } from "vue";
import 'animate.css';

const selectedOption = ref({
  type: '全部',
  year: '全部',
  sort: '综合',
});

const collapsed = ref(true);

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
};



function select(kind: string, option: string) {
  switch (kind) {
    case 'type':
      selectedOption.value.type = option;
      break;
    case 'year':
      selectedOption.value.year = option;
      break;
    case 'sort':
      selectedOption.value.sort = option;
      break;
    default:
      console.error('Invalid kind parameter');
  }
}

</script>

<template>
  <div class="container w-2/3 mx-auto  ">
    <div class=" flex justify-between h-10 ">
      <div class=" text-xl">
        算法模型
      </div>
      <div class=" self-center cursor-pointer hover:text-blue-500" @click="toggleCollapsed">
        <div v-if="collapsed">收起<IconifyIconOffline :icon="arrowUp"></IconifyIconOffline>
        </div>
        <div v-else>展开<IconifyIconOffline :icon="arrowDown"></IconifyIconOffline>
        </div>
        </div>
      </div>

      <div class=" h-2 relative bottom-3"><el-divider border-style="dashed" /></div>
      <Transition name="zoom">
        <div v-if="collapsed">
          <div class="overflow-x-auto space-y-4">
            <div class="flex flex-nowrap text-gray-600 dark:text-gray-200">
              <div class="w-20">
                <a class=" cursor-pointer">类型:</a>
              </div>
              <div class="flex w-full gap-8">
                <a class=" cursor-pointer" :class="{ 'selected': selectedOption.type === '全部' }"
                  @click="select('type', '全部')">全部</a>
                <a class=" cursor-pointer" :class="{ 'selected': selectedOption.type === '临床研究' }"
                  @click="select('type', '临床研究')">临床研究</a>
                <a class=" cursor-pointer " :class="{ 'selected': selectedOption.type === '预测模型' }"
                  @click="select('type', '预测模型')">预测模型</a>
                <a class=" cursor-pointer " :class="{ 'selected': selectedOption.type === '图形分割' }"
                  @click="select('type', '图形分割')">图形分割</a>
              </div>
            </div>
            <div class="flex flex-nowrap text-gray-600 dark:text-gray-200">
              <div class="w-20">
                <a class=" cursor-pointer">年份:</a>
              </div>
              <div class="flex w-full gap-8">
                <a class="cursor-pointer" :class="{ 'selected': selectedOption.year === '全部' }"
                  @click="select('year', '全部')">全部</a>
                <a class="cursor-pointer" :class="{ 'selected': selectedOption.year === '2023' }"
                  @click="select('year', '2023')">2023</a>
                <a class="cursor-pointer" :class="{ 'selected': selectedOption.year === '2022' }"
                  @click="select('year', '2022')">2022</a>
                <a class="cursor-pointer" :class="{ 'selected': selectedOption.year === '2021' }"
                  @click="select('year', '2021')">2021</a>
                <a class="cursor-pointer" :class="{ 'selected': selectedOption.year === '2020' }"
                  @click="select('year', '2020')">2020</a>
                <a class="cursor-pointer" :class="{ 'selected': selectedOption.year === '2019' }"
                  @click="select('year', '2019')">2019</a>
                <a class="cursor-pointer" :class="{ 'selected': selectedOption.year === '2018' }"
                  @click="select('year', '2018')">2018</a>
                <a class="cursor-pointer" :class="{ 'selected': selectedOption.year === '2017' }"
                  @click="select('year', '2017')">2017</a>
                <a class="cursor-pointer" :class="{ 'selected': selectedOption.year === '2016' }"
                  @click="select('year', '2016')">2016</a>
                <a class="cursor-pointer" :class="{ 'selected': selectedOption.year === '2015' }"
                  @click="select('year', '2015')">2015</a>
              </div>
            </div>
            <div class="flex flex-nowrap text-gray-600 dark:text-gray-200 mb-3">
              <div class="w-20">
                <a class=" cursor-pointer">排序:</a>
              </div>
              <div class="flex w-full gap-8">
                <a class=" cursor-pointer" :class="{ 'selected': selectedOption.sort === '综合' }"
                  @click="select('sort', '综合')">综合</a>
                <a class=" cursor-pointer" :class="{ 'selected': selectedOption.sort === '创建时间' }"
                  @click="select('sort', '创建时间')">创建时间</a>
                <a class=" cursor-pointer" :class="{ 'selected': selectedOption.sort === '评分' }"
                  @click="select('sort', '评分')">评分</a>
              </div>
            </div>
          </div>
        </div>
      </Transition>


    </div>
</template>

<style lang='scss' scoped>
.selected {
  background-color: #EDF1F2;
  color: #444444;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

a {
  padding-left: 8px;
  padding-right: 8px;
  line-height: 30px;
  border-radius: 10px
}

a:hover {
  color: #42B4E7;
}

.zoom-enter-active {
  animation: zoom-in 0.3s reverse ease-in;
}

.zoom-leave-active {
  animation: zoom-in 0.3s ease-out;
}

@keyframes zoom-in {
  0% {
    transform: scale(1, 1);
    transform-origin: top;
    opacity: 1;
  }

  50% {
    transform: scale(1, 0.5);
    transform-origin: top;
    opacity: 0.5;
  }

  100% {
    transform: scale(1, 0);
    transform-origin: top;
    opacity: 0;
  }
}
</style>
