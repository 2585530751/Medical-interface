<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
//通过toolId获取相应的Excel文件
import { getExcelByToolIdApi} from '@/api/user'
function getExcelByToolId(value:any){
    getExcelByToolIdApi(value).then((data)=>{
          console.log(data)
    })
}


//定义点击按钮跳转到相应界面
function scrollToTarget(target: any) {
    const targetPosition = document.getElementById(target)?.offsetTop;
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}
//实现模糊搜索相应内容

interface Tree {
    key: string;
    value: string;
}
const restaurants = ref<Tree[]>([])
const tree: Tree[] = [
    { value: "全面的影像阅片功能", key: "1" },
    { value: "智能图像识别与处理", key: "2" },
    { value: "多维度数据统计分析", key: "3" },
    { value: "用户友好的交互界面", key: "4" },
    { value: "高度安全性与数据保护", key: "5" },
]
var input = ref('')
function find() {
    for(let i=0;i<tree.length;i++){
    if(tree[i].value.includes(input.value)){
    scrollToTarget(tree[i].key)}
}
}

const querySearch = (queryString: string,cb: any) => {
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
}

const createFilter = (queryString: string) => {
  return (restaurant: Tree) => {
    return (
      restaurant.value.toLowerCase().includes(queryString.toLowerCase()) 
    )
  }
}

const loadAll = () => {
  return tree
}
onMounted(() => {
  restaurants.value = loadAll()
  getExcelByToolId(toolId)
})
//下面使用上一个界面传来的文件路径参数
import { useRoute } from 'vue-router';
const param = useRoute();  
const toolId = param.query.route;         //routeValue就是上一个界面的值

//实现router-link局部切换
import { shallowRef } from 'vue'
import dataEditing from "@/views/tools/dataEditing.vue"
var currentComp = shallowRef(dataEditing)

function changeCurrentComp(comp: any): void {
  currentComp.value = comp
}
</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="400px" class="">
                <el-container>
                    <el-header>
                        <div class="mt-4">
                            <el-autocomplete v-model="input" style="width: 100%" placeholder="Please input" clearable :fetch-suggestions="querySearch">
                                <template #append>
                                    <el-button @click="find" :icon="Search" />
                                </template>
                            </el-autocomplete>
                        </div>

                    </el-header>

                    <div style="width: 100%" class="text-xl text-gray-600 font-bold">
                        &nbsp&nbsp&nbsp&nbsp&nbsp数据整理
                    </div>
                    <button  @click="changeCurrentComp(dataEditing)"
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">1.数据编辑
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">2.倾向性匹配
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">3.样本自动剔除
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">4.变量自动剔除
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">5.一般数据填补
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">6.多重插补
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">7.异常值处理
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">8.数据标准化
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">9.哑变量重编码
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">10.样本均衡
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">11.数据拆分
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">12.分组重编码
                    </button>
                    <button @click=""
                        class="border-none text-slate-500 bg-white hover:text-blue-300 hover:cursor-pointer focus:text-blue-500 h-10 text-xs focus:bg-blue-100 focus:font-bold smallpaddingleft">13.一般数据填补
                    </button>


                </el-container>
            </el-aside>

            <el-main class="bg-gray-50">
                <component :is="currentComp" />

            </el-main>

            <el-aside width="300px" class="flex-align">
                <el-container>
                    <div>
                        <el-card style="width: 99%">

                            <img src="https://pics1.baidu.com/feed/35a85edf8db1cb13c53a6574f525294993584bfa.jpeg?token=78585a61ddf3f4fff2343f556d62dc4b"
                                style="width: 100%" />
                        </el-card>
                        <div class="block text-center">
                            <el-carousel height="300px">
                                <el-carousel-item style="height: 180px">
                                    <div class="bg-white">
                                        <img src="https://img1.baidu.com/it/u=1265080550,1732343281&fm=253&fmt=auto&app=138&f=JPEG?w=824&h=500"
                                            style="width: 100%" />
                                    </div>
                                </el-carousel-item>
                                <el-carousel-item style="height: 260px">
                                    <div class="bg-white">
                                        <img src="https://5b0988e595225.cdn.sohucs.com/images/20190819/9a7ca57153d1410c932c76c01dd71c86.jpeg"
                                            style="width: 100%" />
                                    </div>
                                </el-carousel-item>
                                <el-carousel-item style="height: 200px">
                                    <div class="bg-white">
                                        <img src="https://www.sinaimg.cn/dy/slidenews/11_img/2009_36/271_1652_712306.jpg"
                                            style="width: 100%" />
                                    </div>
                                </el-carousel-item>
                            </el-carousel>
                        </div>
                    </div>
                </el-container>
            </el-aside>
        </el-container>
    </div>
</template>

<style scoped>
.middlepaddingleft {
    padding-left: 30px;
    text-align: left;
    width: 90%;
}

.smallpaddingleft {
    padding-left: 30px;
    text-align: left;
    width: 90%;
}
</style>