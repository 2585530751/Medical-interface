<script lang="ts" setup>
//接收来自父组件的信息
import { inject, onMounted } from 'vue'
let attribute: unknown = inject('attribute');

onMounted(() => {
    getInformation()
    console.log(post)
})

//定义响应式数组接收数据
interface Attribute {
    attributeName: string       //属性名
    attributeValue: number      //属性所属类别
    attributeLabel: string      //属性所属标签
    attributeData: string[]     //属性内的数据
    isDelete: boolean            //属性是否被删除
    isGroup: boolean             //该属性是否是分组变量
    isInfluence: boolean          //该属性是否是需要判断的影响因素
    isCovariate: boolean          //该属性是否是协变量
}
const getAttribute = reactive<Attribute[]>([{              //响应式对象数组
    attributeName: '',
    attributeValue: 0,
    attributeLabel: '',
    attributeData: [],
    isDelete: false,
    isGroup: false,
    isInfluence: false,
    isCovariate: false
}])

const hasGroupAttribute = computed(() => {                  //判断对象数组中是否有元素的isGroup属性值为true
    return getAttribute.some(attr => attr.isGroup === true);
});
const hasInfluenceAttribute = computed(() => {                  //判断对象数组中是否有元素的isGroup属性值为true
    return getAttribute.some(attr => attr.isInfluence === true);
});


function getInformation() {                                 //将从父组件得到的Attribute信息加入getAttribute响应式对象数组
    if (Array.isArray(attribute)) {
        getAttribute.pop()
        for (let i = 0; i < attribute.length; i++) {
            if (attribute[i].isDelete === false) {
                let obj: any = {
                    attributeName: attribute[i].attributeName,
                    attributeValue: attribute[i].attributeValue,
                    attributeLabel: attribute[i].attributeLabel,
                    attributeData: attribute[i].attributeData,
                    isDelete: attribute[i].isDelete,
                    isGroup: false,
                    isInfluence: false,
                    isCovariate: false
                }
                getAttribute.push(obj)
            }
            else {
                continue
            }
        }
    } else {
        // 如果不是数组，处理这种情况  
        console.log('attribute is not an array');
    }
}

//用户设置匹配方式的相关信息
const matchProportion = ref(1)             //设置匹配比例
const caliper = ref(0)                       //设置卡钳值

const matchManner = ref(1)                 //设置匹配方式
const options = [
    {
        value: 1,
        label: '卡尺匹配(半径匹配)',
    },
    {
        value: 2,
        label: 'K邻近匹配',
        disabled: true,
    },
    {
        value: 3,
        label: '卡尺内最近邻匹配',
        disabled: true,
    },
    {
        value: 4,
        label: '核匹配',
        disabled: true,
    },
    {
        value: 5,
        label: '局部线性回归匹配',
        disabled: true,
    },
    {
        value: 6,
        label: '样条匹配',
        disabled: true,
    }
]
//测试连接flask
import { reactive, ref, computed } from 'vue'
import { message } from '@/utils/message'
import axios from 'axios'
const FPath = 'http://127.0.0.1:5000/preferenceMatching'
const post = reactive({                              //定义响应式发送数据变量
    group: {                                        //分组变量
        attributeName:'',                            //分组变量名
        attributeData:['']                             //分组变量数值
    },                                       
    influence: {                                    //影响因素
        attributeName:'',                            //影响变量名
        attributeData:['']                             //影响变量数值
    },                                   
    covariate: [{                                    //协变量数组
        attributeName:'',                            //协变量名
        attributeData:[]                             //协变量数值
    }],                                   
    matchProportion: matchProportion,                //匹配比例
    matchManner: matchManner,                        //匹配方式
    caliper: caliper                                 //卡钳值
})

const get = ref('')                                 //定义响应式接收数据变量
const onSubmit = () => {                            //上传页面信息
    post.group.attributeName=''
    post.group.attributeData=['']
    post.influence.attributeName=''
    post.influence.attributeData=['']
    post.covariate=[{                                    
        attributeName:'',                            
        attributeData:[]                             
    }]                                                 //变量初始化
    post.covariate.pop()
    for(let i=0;i<getAttribute.length;i++){
        if(getAttribute[i].isGroup===true){
            post.group.attributeName=getAttribute[i].attributeName
            post.group.attributeData=getAttribute[i].attributeData
        }
        if(getAttribute[i].isInfluence===true){
            post.influence.attributeName=getAttribute[i].attributeName
            post.influence.attributeData=getAttribute[i].attributeData
        }
        if(getAttribute[i].isCovariate===true){
            let obj: any = {
                    attributeName:getAttribute[i].attributeName,
                    attributeData:getAttribute[i].attributeData
                }
            post.covariate.push(obj)
        }
    }
    if(post.group.attributeName===''){
        message('未选择分组变量', { type: 'error' })
    }
    else if(post.influence.attributeName===''){
        message('未选择影响因素', { type: 'error' })
    }
    else if(post.covariate.length===0){
        message('未选择协变量', { type: 'error' })
    }
    else if(!Number.isInteger(Number(post.matchProportion))){
        message('匹配比例请输入整数', { type: 'error' })
    }
    else{
    axios.post(FPath, post).then(res => {
        console.log(res.data.count)
        get.value = res.data.message
        //通过axios发送post请求，将mqttM发送给后端，FPath是定义了一个常量表示服务器登录接口的URL地址。
    })
}
}
</script>

<template>
    <div class="parent-div">
        <div class="child-div1">匹配比例:</div>
        <div class="child-div2">
            <el-input size="small" v-model="matchProportion" style="max-width: 100px">
                <template #prepend>1:</template>
            </el-input>
        </div>
        <div class="child-div">匹配方式:</div>
        <div class="child-div2">
            <el-select size="small" v-model="matchManner" placeholder="Select" style="width: 140px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                    :disabled="item.disabled" />
            </el-select>
        </div>
        <div v-if="matchManner === 1" class="child-div">卡钳值:</div>
        <div v-if="matchManner === 1" class="child-div">
            <el-input size="small" v-model="caliper" style="max-width: 100px">
            </el-input>
        </div>
        <div class="child-div">
            <el-button type="success" size="small" round @click="onSubmit()">分析数据</el-button>
        </div>
    </div>
    <el-table :data="getAttribute" style="width: 100%; margin-top:20px">
        <el-table-column label="属性" width="260">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.attributeName }}</span>
                    <span class="text-blue-500"
                        v-if="getAttribute[scope.$index].attributeValue === 1 || getAttribute[scope.$index].attributeValue === 2">(定类)</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="分组变量" width="200">
            <template #default="scope">
                <el-switch
                    v-if="(hasGroupAttribute === false || (scope.row.isGroup === true && hasGroupAttribute === true)) && scope.row.isInfluence===false && scope.row.isCovariate===false"
                    width="40" v-model="scope.row.isGroup" />
                <el-switch v-if="(scope.row.isGroup === false && hasGroupAttribute === true)||scope.row.isInfluence===true ||scope.row.isCovariate===true" disabled width="40"
                    v-model="scope.row.isGroup" />
            </template>
        </el-table-column>
        <el-table-column label="影响因素" width="200">
            <template #default="scope">
                <el-switch
                    v-if="(hasInfluenceAttribute === false || (scope.row.isInfluence === true && hasInfluenceAttribute === true)) && scope.row.isGroup===false && scope.row.isCovariate===false"
                    width="40" v-model="scope.row.isInfluence" />
                <el-switch v-if="(scope.row.isInfluence === false && hasInfluenceAttribute === true)||scope.row.isGroup===true ||scope.row.isCovariate===true" disabled width="40"
                    v-model="scope.row.isInfluence" />
            </template>
        </el-table-column>
        <el-table-column label="协变量" width="200">
            <template #default="scope">
                <el-switch v-if="scope.row.isGroup===true || scope.row.isInfluence===true" disabled  width="40" v-model="scope.row.isCovariate" />
                <el-switch v-if="scope.row.isGroup===false && scope.row.isInfluence===false" width="40" v-model="scope.row.isCovariate" />
            </template>
        </el-table-column>
        <el-table-column label="样例数据">
            <template #default="scope">
                <div style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.attributeData.filter((element: any) => element
                        !== null && element !== undefined && element !== '').slice(0, 10) }}</span>
                </div>
            </template>
        </el-table-column>
    </el-table>

</template>

<style lang="scss" scoped>
.parent-div {
    /* 确保父元素有足够的宽度来容纳子元素 */
    width: 100%;
    /* 或者其他你需要的宽度 */
}

.child-div1 {
    display: inline-block;
    /* 如果需要的话，可以设置宽度和间隔 */
    margin-right: 10px;
    /* 设置间隔 */
    vertical-align: top;
    /* 确保子元素顶部对齐 */
}

.child-div2 {
    display: inline-block;
    /* 如果需要的话，可以设置宽度和间隔 */
    margin-right: 95px;
    /* 设置间隔 */
    vertical-align: top;
    /* 确保子元素顶部对齐 */
}

.child-div:last-child {
    float: right;
}
</style>