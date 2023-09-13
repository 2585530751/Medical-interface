<script setup lang="ts">
defineOptions({
  name: ''
})
import type { IconifyIconOffline } from '@/components/ReIcon'

import link from '@iconify-icons/ep/link'
import camera from '@iconify-icons/ep/camera'
</script>

<template>
  <div
    class="relative isolate overflow-hidden dark:bg-gray-800  bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0"
  >
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <svg
        class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="e813992c-7d03-4cc4-a2bd-151760b470a0"
            width="200"
            height="200"
            x="50%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
            stroke-width="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          stroke-width="0"
          fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
        />
      </svg>
    </div>
    <div
      class=" mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10"
    >
      <div
        class="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
      >
        <div class="lg:pr-4">
          <div class="lg:max-w-lg">
            
            <h1 class="dark:text-white mt-2 text-3xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
              ROC曲线
            </h1>
            <p class="text-base text-center font-semibold leading-7 text-indigo-600">摘要</p>
            <p class="dark:text-white mt-6 text-xl leading-8 text-gray-700 indent-8 ">
              早产儿视网膜病变 (retinopathy of
              prematurity，ROP)是一种视网膜毛细血管发育异常化的早产儿眼底疾病，表现为视网膜缺血、新生血管形成和增生性视网膜病变，严重者可以引起视网膜脱离而导致永久性失明。值得注意的是，ROP作为一种儿童主要致盲性及低视力眼病是可避免且可控的，筛查是其早期发现、早期干预和早期矫治的前提和关键措施，对降低儿童致盲率及视力损伤具有重要意义。因此，需要筛选出ROP潜在的风险因素，建立预测模型进而根据这些临床数据预测ROP的早期风险，优化高风险婴儿的识别，同时也能改善筛查时机和效率，避免对低风险婴儿进行不必要的检查。
            </p>
            <div class="flex justify-end pt-10">
              <el-button type="primary"
                ><template #icon><IconifyIconOffline :icon="link"> </IconifyIconOffline> </template
                >文章链接</el-button
              >
              <el-button type="primary"
                ><template #icon><IconifyIconOffline :icon="camera"> </IconifyIconOffline> </template
                >算法模型</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-1 lg:row-start-1 lg:overflow-hidden"
      >
        <img
          class="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
          src="@/assets/images/test1.png"
          alt=""
        />
      </div>
      <div
        class="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:gap-x-8 lg:px-8"
      >
        <div class="lg:pr-4 ">
          <div class="text-base leading-7 text-gray-700 dark:text-white">
            <p class="indent-8 dark:text-white">
              XGboost（extreme Gradient Boosting）是基于GDBT（Gradient Boosting Decision
              Tree）算法的改进算法。
              传统的GDBT模型在优化中只使用一阶导数，而XGBoost对代价函数进行二阶泰勒展开，并在代价函数中加入正则化项以获得更好的性能。
              弱回归树的集合，它们按顺序添加到模型中，以最大化预测性能并最小化模型复杂性。
              同时XGboost增加了复杂度控制模型，从随机森林中学习减少计算量，使得模型不易过拟合。
              基于以上特点，XGboost在医学领域的预测模型构建和风险识别方面受到了越来越多的关注。
            </p><p class="indent-8 dark:text-white">XGboost (extreme Gradient Boosting) is an improved algorithm based on the GDBT
              (Gradient Boosting Decision Tree) algorithm. Traditional GDBT Model uses only the
              first derivative in the optimization, but XGBoost preforms the second-order Taylor
              expansion of the cost function and adds a regularization item into the cost function
              for better performance.As an integrated learning algorithm, it combines the
              predictions from an ensemble of weak regression trees, which are added sequentially to
              the model in order to maximize predictive performance and minimize model complexity.
              At the same time, XGboost adds a complexity control model and learns from random
              forests to reduce the calculation, making the model not easy to over-fitting. With
              above characteristics, XGboost has been draw more attention for prediction model
              constructing and risk identification in medical field .
            </p>
            
            <p class="mt-8 indent-8">
              In recent years, deep learning has been widely used to segment medical images and
              assist physicians in better diagnosis and treatment of diseases. Anthrax is a serious
              infectious disease that has a worldwide distribution. One of the most important ways
              to diagnose this disease is the microscopic examination of slides containing tissue
              samples of patients. The state-of-the-art models for segmentation of the slide images
              are based on deep neural networks and have encoder-decoder architecture, such as fully
              convolutional network, UNet, and their variants. Skip connections play a key role in
              such models. However, in many of these models, the skip connections only aggregate
              features related to the same scales of the encoder and decoder sections, which
              degrades the quality of the segmentation. We propose an improved UNet-based
              architecture to segment microscopic images of patient tissue samples. The proposed
              model, called IRUNet, takes the advantage of inception and residual blocks in the skip
              connections and combines multi-scale features in order to extract better features for
              segmentation. Also, to extract powerful representations in the encoder section,
              several convolutional networks have been used as the backbone and their effect on the
              segmentation results has been investigated. The experimental results show that despite
              many challenges in the field of microscopic image analysis such as high image
              resolution, different contrasts, image artifacts, object crowding, and overlapping,
              IRUNet has better performance on medical image segmentation compared to the
              state-of-the-art models. It achieves the precision of 92.8%, the recall rate of 93%,
              and the Dice score of 92.9% which are outstanding results.
            </p>
            <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              No server? No problem.
            </h2>
            <p class="mt-6">
              Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu
              ipsum urna nibh. Pharetra, euismod vitae interdum mauris enim, consequat vulputate
              nibh. Maecenas pellentesque id sed tellus mauris, ultrices mauris. Tincidunt enim
              cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis ipsum eu a sed
              convallis diam.
            </p>

            <ul role="list" class="mt-8 space-y-8 text-gray-600 ">
              <li class="flex gap-x-3">
                <svg
                  class="mt-1 h-5 w-5 flex-none text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span
                  ><strong class="font-semibold text-gray-900 ">Push to deploy.</strong> Lorem ipsum,
                  dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit
                  eaque, iste dolor cupiditate blanditiis ratione.</span
                >
              </li>
              <li class="flex gap-x-3">
                <svg
                  class="mt-1 h-5 w-5 flex-none text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span
                  ><strong class="font-semibold text-gray-900">SSL certificates.</strong> Anim aute
                  id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
                  commodo.</span
                >
              </li>
              <li class="flex gap-x-3">
                <svg
                  class="mt-1 h-5 w-5 flex-none text-indigo-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span
                  ><strong class="font-semibold text-gray-900">Database backups.</strong> Ac
                  tincidunt sapien vehicula erat auctor pellentesque rhoncus. Et magna sit morbi
                  lobortis.</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
