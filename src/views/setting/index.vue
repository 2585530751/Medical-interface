<script setup lang='ts'>
import { ref } from "vue"
defineOptions({
    name: ''
    
})
const count = ref(0)
function increment() {
    count.value++
}

const activeNames = ref(['1'])
const handleChange = (val: string[]) => {
    console.log(val)
}
function moveWindow() {  
        // 将窗口移动到屏幕坐标 (100, 100)  
        window.moveTo(0, 0);  
    }  
</script>

<template>
    <div class="common-layout ">

        <el-container>
            <el-affix :offset="100">
                <el-aside width="400px" class="h-screen">
                    <el-scrollbar class="common-layout">
                        <el-collapse  v-model="activeNames" @change="handleChange">
                            <el-collapse-item title="新手入门" class="w-96" name="1">
                                
                                <div class="mb-4">
                                    <el-button  key="button.text" class="w-96" text>
                                        <a href="#A1" class="w-96">锚点1</a>
                                    </el-button>
                                   
                                </div>
                                <div class="mb-4">
                                    <el-button  key="button.text" class="w-96" text>
                                        <a href="#A2" class="w-96">锚点2</a>
                                    </el-button>
                                </div>
                                <div >
                                    <el-button  key="button.text" class="w-96" text>
                                        <a href="#A3" class="w-96">锚点3</a>
                                    </el-button>
                                </div>
                                
                            </el-collapse-item>
                            <el-collapse-item title="Feedback" name="2">
                                <div class="mb-4">
                                    <el-button  key="button.text" class="w-96" text>
                                        你好                                       
                                    </el-button>
                                </div>
                                <div class="mb-4">
                                    <el-button  key="button.text" class="w-96" text>
                                        你好
                                    </el-button>
                                </div>
                                <div >
                                    <el-button  key="button.text" class="w-96" text>
                                        你好
                                    </el-button>
                                </div>
                            </el-collapse-item>
                            <el-collapse-item title="Efficiency" name="3">
                                
                            </el-collapse-item>
                            <el-collapse-item title="Controllability" name="4">
                                
                            </el-collapse-item>
                        </el-collapse>
                    </el-scrollbar>
                </el-aside>
            </el-affix>





            <el-main>
                <el-container>
                    <el-header class="text-4xl mx-auto" id="A1">标题1</el-header>
                    <el-main>内容</el-main>
                </el-container>
                <el-container>
                    <el-header class="text-4xl mx-auto" id="A2">标题2</el-header>
                    <el-main>内容</el-main>
                </el-container>
                <el-container>
                    <el-header class="text-4xl mx-auto" id="A3">标题3</el-header>
                    <el-main>内容</el-main>
                </el-container>
                <el-container>
                    <el-header class="text-4xl mx-auto">标题4</el-header>
                    <el-main>内容</el-main>
                </el-container>
                <el-container>
                    <el-header class="text-4xl mx-auto">标题</el-header>
                    <el-main>内容</el-main>
                </el-container>
                <el-container>
                    <el-header class="text-4xl mx-auto">标题</el-header>
                    <el-main>内容</el-main>
                </el-container>

            </el-main>
        </el-container>
    </div>
</template>

<style scoped>
.scrollbar-demo-item {

    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    /* background: var(--el-color-primary-light-9); */

    color: var(--el-color-primary);
}

.fixed-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 500px;
    background-color: #fff;
    /* 或者你想要的任何颜色 */
    z-index: 10;
    /* 确保导航栏位于其他内容之上 */
}

.content {
    margin-top: 60px;
    /* 导航栏的高度，确保内容不会被导航栏遮挡 */
}

</style>