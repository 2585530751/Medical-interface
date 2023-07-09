<script setup lang='ts'>
import { reactive,onMounted, type ObjectEmitsOptions } from "vue";
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
function judgingDistance(elementId:string,scrollTop:number,classAnimate:any){
  const title = document.getElementById(elementId)
  let titleTop:number=0
  if (title) {
     titleTop= title.offsetTop
  }
  if (titleTop < scrollTop+100) {
    classAnimate['animate__rotateInUpLeft'] = false
    classAnimate['animate__rotateOutUpLeft'] = true
  }else{
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
  //获取窗口的高度
  //const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
  //获取id为title的元素距离顶部的距离
  judgingDistance('title',scrollTop,titleAnimate)
  judgingDistance('subTitle',scrollTop,subTitleAnimate)
  judgingDistance('subButton',scrollTop,subButtonAnimate)
}
onMounted(() => {
  window.addEventListener('scroll', scrollListener)
})

</script>


<template>
  <!-- https://www.sitapix.com/2018/05/22/adult-business-care-305565.html -->
<section class="kenburns-bottom bg-cover bg-center  dark:bg-slate-300 bg-no-repeat bg-[url('@/assets/images/adult-business-care.jpeg')] bg-blend-multiply">
    <div class="relative isolate px-6 pt-14 lg:px-8 " >
    <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 ">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="animate__animated animate__rotateInUpLeft relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Announcing our next round of funding. <a href="#" class="font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
      <div class="text-center">
        
        <h1 id="title" :class="titleAnimate" class="text-4xl font-bold tracking-wider sm:text-6xl" style="color: #2C3E50;">智能医学统计分析平台</h1>

       
        <p id="subTitle" :class="subTitleAnimate" class="mt-6 text-lg leading-8" style="color:#FC6621">针对临床研究人员的一站式医学统计分析平台<br>提供数据治理、数据统计、机器学习分析、智能文章生成服务</p>
        <div id="subButton" :class="subButtonAnimate" class=" mt-10 flex items-center justify-center gap-x-6">
          <a href="#" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
          <a href="#" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
  </div>
</section>


  <!-- Container for demo purpose -->
  <section class="dark:bg-gray-800 dark:text-gray-100">
		<div class=" max-w-xl p-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
			<div>
				<h2 class="text-3xl font-bold tracki text-center sm:text-5xl dark:text-gray-50">我们的特色</h2>
				<p class="max-w-3xl mx-auto mt-4 text-xl text-center dark:text-gray-400">针对临床研究人员的一站式医学统计分析平台-提供数据治理、数据统计、机器学习分析、智能文章生成服务。</p>
			</div>
            <div>
                <div class="flex-wrap items-center justify-center gap-10 text-center sm:flex">
                <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 dark:bg-gray-800">
                    <div class="flex-shrink-0">
                        <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                            <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
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
                <div class="w-full px-4 py-4 mt-6 bg-white rounded-lg shadow-lg sm:w-1/2 md:w-1/2 lg:w-1/4 sm:mt-16 md:mt-20 lg:mt-24 dark:bg-gray-800">
                    <div class="flex-shrink-0">
                        <div class="flex items-center justify-center w-12 h-12 mx-auto text-white bg-indigo-500 rounded-md">
                            <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
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
                            <svg width="20" height="20" fill="currentColor" class="w-6 h-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
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

		</div>
    
	</section>
  
<!-- Container for demo purpose -->
</template>

<style lang='scss' scoped>
.ep-button {
  margin: 4px;
}
.ep-button + .ep-button {
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
