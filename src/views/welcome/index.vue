<script setup lang='ts'>
import { ref, reactive, onMounted, type ObjectEmitsOptions } from "vue";
import 'animate.css'

defineOptions({
  name: ''
})

const titleAnimate = reactive({
  'animate__animated': true,
  'animate__rotateOutUpLeft': false,
  'animate__rotateInUpLeft': true
})
const subTitleAnimate = reactive({
  'animate__animated': true,
  'animate__rotateOutUpLeft': false,
  'animate__rotateInUpLeft': true
})
const subButtonAnimate = reactive({
  'animate__animated': true,
  'animate__rotateOutUpLeft': false,
  'animate__rotateInUpLeft': true
})
const animateCard = ref("animate__wobble")

//更改animateCard的值
function changeAnimateCard(elementId: string, scrollTop: number, animateCard: any, animateCardValue: string) {
  const className = document.getElementById(elementId)
  //获取窗口的高度
  const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  let classNameTop: number = 0
  if (className) {
    classNameTop = className.offsetTop
  }
  if (classNameTop < scrollTop + clientHeight - 400) {
    animateCard.value = animateCardValue
  }

}

function judgingDistance(elementId: string, scrollTop: number, classAnimate: any) {
  const className = document.getElementById(elementId)
  let classNameTop: number = 0
  if (className) {
    classNameTop = className.offsetTop
  }
  if (classNameTop < scrollTop + 100) {
    classAnimate['animate__rotateInUpLeft'] = false
    classAnimate['animate__rotateOutUpLeft'] = true
  } else {
    classAnimate['animate__rotateInUpLeft'] = true
    classAnimate['animate__rotateOutUpLeft'] = false
  }
}

//滚动监听的函数
function scrollListener() {
  //获取滚动条的位置
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  //获取滚动条的高度
  //const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight

  //获取id为title的元素距离顶部的距离
  judgingDistance('title', scrollTop, titleAnimate)
  judgingDistance('subTitle', scrollTop, subTitleAnimate)
  judgingDistance('subButton', scrollTop, subButtonAnimate)
  changeAnimateCard('', scrollTop, animateCard, "animate__wobble")
}
onMounted(() => {
  window.addEventListener('scroll', scrollListener)
})

</script>


<template>
  <!-- https://www.sitapix.com/2018/05/22/adult-business-care-305565.html -->
  <section
    class="kenburns-bottom bg-cover bg-center  dark:bg-slate-300 bg-no-repeat bg-[url('@/assets/images/adult-business-care.jpeg')] bg-blend-multiply">
    <div class="relative isolate px-6 pt-14 lg:px-8 ">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 ">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div
            class="animate__animated animate__rotateInUpLeft relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Announcing our next round of funding. <a href="#" class="font-semibold text-indigo-600"><span
                class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
        <div class="text-center">

          <h1 id="title" :class="titleAnimate" class="text-4xl font-bold tracking-wider sm:text-6xl"
            style="color: #2C3E50;text-shadow: 0px 5px 3px #0a0a0a;">智能医学统计分析平台</h1>


          <p id="subTitle" :class="subTitleAnimate" class="mt-6 text-lg leading-8" style="color:#FC6621">
            针对临床研究人员的一站式医学统计分析平台<br>提供数据治理、数据统计、机器学习分析、智能文章生成服务</p>
          <div id="subButton" :class="subButtonAnimate" class=" mt-10 flex items-center justify-center gap-x-6">
            <a href="#"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get
              started</a>
            <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span
                aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- Container for demo purpose -->
  <section class="dark:bg-gray-800 dark:text-gray-100 ">
    <div class=" max-w-xl p-6 py-12 mx-auto space-y-12 lg:px-8 lg:max-w-7xl">
      <div>
        <p class="text-3xl font-bold tracki text-center sm:text-4xl dark:text-gray-50">我们的特色</p>
        <p class="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-400">
          针对临床研究人员的一站式医学统计分析平台<br>提供数据治理、数据统计、机器学习分析、智能文章生成服务。</p>
      </div>
      <div class="flex-wrap items-center justify-center gap-10 text-center sm:flex">
        <div :class="animateCard"
          class="animate__animated w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
              <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                </path>
              </svg>
            </div>
          </div>
          <h3 class="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            一站式
          </h3>
          <p class="py-4 text-gray-500 text-md dark:text-gray-300">
            囊括多种数据治理、统计分析、机器学习建模及图表绘制方法，一站式解决您的临床研究分析问题。
          </p>
        </div>
        <div
          class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 sm:mt-16 md:mt-20 lg:mt-24 dark:bg-gray-800">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
              <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                </path>
              </svg>
            </div>
          </div>
          <h3 class="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            极简化
          </h3>
          <p class="py-4 text-gray-500 text-md dark:text-gray-300">
            筛选临床常用分析方法，简化分析参数，分析方法组合优化，让您一步就完成高分论文中的分析图表。
          </p>
        </div>
        <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
          <div class="flex-shrink-0">
            <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
              <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                </path>
              </svg>
            </div>
          </div>
          <h3 class="py-4 text-2xl font-semibold text-gray-700 sm:text-xl dark:text-white">
            智能化
          </h3>
          <p class="py-4 text-gray-500 text-md dark:text-gray-300">
            智能选择统计分析方法，一键自动生成结果描述，自动生成森林图、列线图等相关图片。
          </p>
        </div>
      </div>



    </div>

  </section>

  <section class=" dark:bg-gray-700 text-gray-600 body-font py-10 bg-neutral-100">
    <div class="mx-auto max-w-2xl lg:text-center">
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">我们的模型</p>
      <p class="mt-6 text-lg leading-8 text-gray-600">以下模型效果显著巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉巴拉</p>
    </div>
    <div class="container px-5 py-6 mx-auto">
      <div class="flex items-center lg:w-4/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0 pr-5">
          <h2 class="dark:text-white text-gray-900 text-lg title-font font-medium mb-2">早产儿视网膜病变发病风险预测模型</h2>
          <p class="dark:text-slate-300 leading-relaxed text-base">早产儿视网膜病变 (retinopathy of
            prematurity，ROP)是一种视网膜毛细血管发育异常化的早产儿眼底疾病，表现为视网膜缺血、新生血管形成和增生性视网膜病变，严重者可以引起视网膜脱离而导致永久性失明。值得注意的是，ROP作为一种儿童主要致盲性及低视力眼病是可避免且可控的，筛查是其早期发现、早期干预和早期矫治的前提和关键措施，对降低儿童致盲率及视力损伤具有重要意义。因此，需要筛选出ROP潜在的风险因素，建立预测模型进而根据这些临床数据预测ROP的早期风险，优化高风险婴儿的识别，同时也能改善筛查时机和效率，避免对低风险婴儿进行不必要的检查。
          </p>
          <a class="mt-3 text-indigo-500 inline-flex items-center">了解更多
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
        <div class=" h-[calc(100%_-_136.93px)] top-[0.09px] bottom-[136.84px] left-[755.45px] w-[444.53px] ">
          <img class=" top-[calc(50%_-_148.17px)] left-[calc(50%_-_222.26px)] w-[444.53px] h-[296.34px] object-cover"
            alt="" src="@/assets/images/223204025c32859ca61f28c95d8ca42jpg@2x.png" />
        </div>
      </div>
      <div class="flex items-center lg:w-4/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
        <div class=" h-[calc(100%_-_53.54px)] top-[0.09px] bottom-[53.45px] left-[-61.17px] w-[440.03px]  opacity-[0.86]">
          <img class=" top-[calc(50%_-_146.67px)] left-[calc(50%_-_220.01px)] w-[440.03px] h-[293.35px]  object-cover"
            alt="" src="@/assets/images/65208abcec67127d6bcf76052378bbajpg@2x.png" />
        </div>
        <div class=" pl-2 flex-grow sm:text-left text-center mt-6 sm:mt-0">
          <h2 class="dark:text-white text-gray-900 text-lg title-font font-medium mb-2">新冠肺炎死亡风险评分(CDRS)模型</h2>
          <p class="dark:text-slate-300 leading-relaxed text-base">
            研究人群和研究设计我们对2020年2月8日至2020年3月8日在中国武汉市新冠肺炎定点收治机构——华中科技大学同济医学院同济医院住院的295例患者进行回顾性研究。本研究的结果是30天死亡率。
            所有18岁以上的COVID-19患者都有资格参加这项研究。排除标准为:到达时因其他疾病引起的骤停或死亡患者，拒绝气管插管和机械通气患者，其他急性感染或炎症患者，临床资料(年龄或血管活性药物剂量)不完整患者。本研究的流程图Figure
            1所示。</p>
          <a class="mt-3 text-indigo-500 inline-flex items-center">了解更多
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="flex items-center lg:w-4/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
        <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0 pr-5">
          <h2 class="dark:text-white text-gray-900 text-lg title-font font-medium mb-2">识别模型和评分系统</h2>
          <p class="dark:text-slate-300 leading-relaxed text-base">
            由严重急性呼吸综合征冠状病毒2(SARS-CoV-2)引起的疾病已被世界卫生组织命名为冠状病毒病(COVID-19)。到目前为止，新冠肺炎传播迅速，全球几乎所有国家和地区都受到影响。世卫组织已于2020年3月11日宣布COVID-19疫情为全球大流行。
            甲型H1N1流感pdm09病毒引起的季节性流行几乎每年都会导致严重疾病和死亡。临床上发现，我国少数患者同时感染了COVID-19和流感病毒。有鉴于此，迫切需要将COVID-19的特征与H1N1区分开来，这可能在临床实践中发挥重要作用。
            本研究旨在比较COVID-19和甲型H1N1流感患者的流行病学、临床和实验室特征，并建立不同的识别模型和简单的评分系统</p>
          <a class="mt-3 text-indigo-500 inline-flex items-center">了解更多
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
        <div class=" h-[calc(100%_-_136.93px)] top-[0.09px] bottom-[136.84px] left-[755.45px] w-[444.53px] ">
          <img class=" top-[calc(50%_-_148.17px)] left-[calc(50%_-_222.26px)] w-[444.53px] h-[296.34px] object-cover"
            alt="" src="@/assets/images/223204025c32859ca61f28c95d8ca42jpg@2x.png" />
        </div>
      </div>


    </div>
  </section>
  <!-- Container for demo purpose -->
  
</template>

<style lang='scss' scoped>
.ep-button {
  margin: 4px;
}

.ep-button+.ep-button {
  margin-left: 0;
  margin: 4px;
}

.kenburns-bottom {
  -webkit-animation: kenburns-bottom 5s ease-out 1.5s both;
  animation: kenburns-bottom 5s ease-out 1.5s both;
}

@-webkit-keyframes kenburns-bottom {
  0% {
    -webkit-transform: scale(0.97) translateY(0);
    transform: scale(0.97) translateY(0);
    -webkit-transform-origin: 50% 84%;
    transform-origin: 50% 84%;
  }

  100% {
    -webkit-transform: scale(1.015) translateY(15px);
    transform: scale(1.015) translateY(15px);
    -webkit-transform-origin: bottom;
    transform-origin: bottom;
  }
}

@keyframes kenburns-bottom {
  0% {
    -webkit-transform: scale(0.97) translateY(0);
    transform: scale(0.97) translateY(0);
    -webkit-transform-origin: 50% 84%;
    transform-origin: 50% 84%;
  }

  100% {
    -webkit-transform: scale(1.015) translateY(15px);
    transform: scale(1.015) translateY(15px);
    -webkit-transform-origin: bottom;
    transform-origin: bottom;
  }
}
</style>
