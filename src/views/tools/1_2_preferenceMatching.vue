<script lang="ts" setup>
//接收来自父组件的信息
import { inject, onMounted } from 'vue'
let attribute: unknown = inject('attribute');

onMounted(() => {
    getInformation()
    // console.log(post)
})

//定义响应式数组接收数据
interface Attribute {
    attributeName: string       //属性名
    attributeValue: number      //属性所属类别
    attributeLabel: string      //属性所属类别标签
    attributeData: any[]     //属性内的数据
    isDelete: boolean            //属性是否被删除
    isGroup: boolean             //该属性是否是分组变量
    isInfluence: boolean          //该属性是否是需要判断的影响因素
    isCovariate: boolean          //该属性是否是协变量
    fontColor: boolean           //分辨是否是哑变量添加出来的
    dataImputation: number        //数据填补方式
    attributeIndex: number         //下标
    missingRate: number           //缺失率
}
const getAttribute = reactive<Attribute[]>([{              //响应式对象数组
    attributeName: '',
    attributeValue: 0,
    attributeLabel: '',
    attributeData: [],
    isDelete: false,
    isGroup: false,
    isInfluence: false,
    isCovariate: false,
    fontColor: false,
    dataImputation: 0,
    attributeIndex: 0,
    missingRate: 0
}])

const hasGroupAttribute = computed(() => {                  //判断对象数组中是否有元素的isGroup属性值为true
    return getAttribute.some(attr => attr.isGroup === true);
});
const hasInfluenceAttribute = computed(() => {                  //判断对象数组中是否有元素的isGroup属性值为true
    return getAttribute.some(attr => attr.isInfluence === true);
});

let j = 0
function getInformation() {                                 //将从父组件得到的Attribute信息加入getAttribute响应式对象数组
    if (Array.isArray(attribute)) {
        getAttribute.pop()

        for (let i = 0; i < attribute.length; i++) {
            if (attribute[i].isDelete === false) {
                let missingNumber = 0
                for (let k = 0; k < attribute[i].attributeData.length; k++) {
                    if (attribute[i].attributeData[k] === null || attribute[i].attributeData[k] === undefined || attribute[i].attributeData[k] === '') {
                        missingNumber = missingNumber + 1
                    }
                }
                const missingRate = missingNumber / attribute[i].attributeData.length
                let obj: any = {
                    attributeName: attribute[i].attributeName,
                    attributeValue: attribute[i].attributeValue,
                    attributeLabel: attribute[i].attributeLabel,
                    attributeData: attribute[i].attributeData,
                    isDelete: attribute[i].isDelete,
                    isGroup: false,
                    isInfluence: false,
                    isCovariate: false,
                    fontColor: false,
                    dataImputation: 0,
                    attributeIndex: j,
                    missingRate: missingRate
                }
                getAttribute.push(obj)
                j = j + 1
            }
            else {
                continue
            }
        }
    } else {
        // 如果不是数组，处理这种情况  
        // console.log('attribute is not an array');
    }
}

//用户设置匹配方式的相关信息
const matchProportion = ref(1)             //设置匹配比例
const caliper = ref(0)                       //设置卡钳值
const missingValueProportion = ref(0)        //设置缺失率
const matchManner = ref(1)                 //设置匹配方式
const sampleMissingValueHandling = ref(1)                 //样本缺失处理方式
const matchMannerOptions = [
    {
        value: 1,
        label: '卡尺匹配(半径匹配)',
    },
    {
        value: 2,
        label: 'K邻近匹配',

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

const sampleMissingValueHandlingOptions = [
    {
        value: 1,
        label: '样本自动剔除',
    },
    {
        value: 2,
        label: '变量自动剔除',

    },
    {
        value: 3,
        label: '一般数据填补',
        disabled: true,
    },
    {
        value: 4,
        label: '多重插补',
        disabled: true,
    },
    {
        value: 5,
        label: '异常值处理',
        disabled: true,
    },
    {
        value: 6,
        label: '数据标准化',
        disabled: true,
    }
]
//测试连接flask
import { reactive, ref, computed, watch } from 'vue'
import { message } from '@/utils/message'
import axios from 'axios'
const FPath = 'http://127.0.0.1:5001/preferenceMatching'
const post = reactive({                              //定义响应式发送数据变量
    group: {                                        //分组变量
        attributeName: '',                            //分组变量名
        attributeData: ['']                             //分组变量数值
    },
    influence: {                                    //影响因素
        attributeName: '',                            //影响变量名
        attributeData: ['']                             //影响变量数值
    },
    covariate: [{                                    //协变量数组
        attributeName: '',                            //协变量名
        attributeData: []                             //协变量数值
    }],
    matchProportion: matchProportion,                //匹配比例
    matchManner: matchManner,                        //匹配方式
    caliper: caliper,                                 //卡钳值
    sampleMissingValueHandling: sampleMissingValueHandling,    //样本缺失处理方式
    missingValueProportion: missingValueProportion         //缺失率
})

const get = ref('')                                 //定义响应式接收数据变量
const onSubmit = () => {                            //上传页面信息
    post.group.attributeName = ''
    post.group.attributeData = ['']
    post.influence.attributeName = ''
    post.influence.attributeData = ['']
    post.covariate = [{
        attributeName: '',
        attributeData: []
    }]                                                 //变量初始化
    post.covariate.pop()
    for (let i = 0; i < getAttribute.length; i++) {
        if (getAttribute[i].isGroup === true) {
            post.group.attributeName = getAttribute[i].attributeName
            post.group.attributeData = getAttribute[i].attributeData
        }
        if (getAttribute[i].isInfluence === true) {
            post.influence.attributeName = getAttribute[i].attributeName
            post.influence.attributeData = getAttribute[i].attributeData
        }
        if (getAttribute[i].isCovariate === true) {
            let obj: any = {
                attributeName: getAttribute[i].attributeName,
                attributeData: getAttribute[i].attributeData
            }
            post.covariate.push(obj)
        }
    }
    if (post.group.attributeName === '') {
        message('未选择分组变量', { type: 'error' })
    }
    else if (post.influence.attributeName === '') {
        message('未选择影响因素', { type: 'error' })
    }
    else if (post.covariate.length === 0) {
        message('未选择协变量', { type: 'error' })
    }
    else if (!Number.isInteger(Number(post.matchProportion))) {
        message('匹配比例请输入整数', { type: 'error' })
    }
    else {
        axios.post(FPath, post).then(res => {
            // console.log(res.data.count)
            get.value = res.data.pdfUrl
            console.log(get.value)
            //通过axios发送post请求，将mqttM发送给后端，FPath是定义了一个常量表示服务器登录接口的URL地址。
            // 创建一个指向该Blob的URL  

            // // 创建一个<a>标签，并设置href为Blob的URL，然后模拟点击下载  
            const link = document.createElement('a');
            link.href = get.value;
            link.download = 'example.pdf'; // 设置下载文件的文件名  
            document.body.appendChild(link);
            link.click(); // 模拟点击下载文件  
            document.body.removeChild(link); // 下载完成后移除<a>标签
        })
    }
}

//哑变量重编码设置
import { ElMessageBox } from 'element-plus'
import { stringify } from 'querystring';

interface dummyVariable {
    dummyVariableName: string       //哑变量名
    dummyVariableClass: number       //哑变量所属类
    dummyVariableValue: number       //哑变量所对应的值，仅0或1  
}

const dummyVariable = reactive<dummyVariable[]>([
    {
        dummyVariableName: '',
        dummyVariableClass: 0,
        dummyVariableValue: 1
    }
])

const dialogVisible = ref(false)
function removeDuplicates(array: any) {                 //去重函数
    return [...new Set(array)];
}
let remove = []               //去重结果保存在这里
const rowIndex = ref(-1)          //记录当前点击的重编码页面所属的数组下标
function reEncoding(index: any) {
    rowIndex.value = index
    remove = []
    dialogVisible.value = true,
        remove = removeDuplicates(getAttribute[index].attributeData)       //去重
    dummyVariable.length = 0                          //初始化哑变量表的值
    reEncodingClassOptions.length = 0                          //初始化选项表
    if (remove.length >= 40) {
        reEncodingValue.value = 1
    }
    else {
        for (let i = 0; i < remove.length; i++) {          //将种类加入列表
            let obj: any = {
                dummyVariableName: remove[i],
                dummyVariableClass: 0,
                dummyVariableValue: 1
            }
            dummyVariable.push(obj)
        }
        for (let i = 0; i < remove.length; i++) {         //将分类选项加入列表
            let obj: any = {
                value: i,
                latel: i
            }
            reEncodingClassOptions.push(obj)
        }
    }
}

const handleClose = (done: () => void) => {
    ElMessageBox.confirm('Are you sure to close this dialog?')
        .then(() => {

            done()
        })
        .catch(() => {
            // catch error
        })
}

function cancel() {
    dialogVisible.value = false

    reEncodingValue.value = 0
}

function primary() {
    if (reEncodingValue.value === 0) {                  //手动选择分类的具体操作
        // console.log(getAttribute[rowIndex.value])

        let classCopy: any = [{
            classNumber: -1,                            //记录用户输入了多少种类型的数据
            classValue: -1                               //记录重编码后的数据
        }]
        classCopy.pop()
        for (let i = 0; i < dummyVariable.length; i++) {

            classCopy.push({ classNumber: dummyVariable[i].dummyVariableClass, classValue: dummyVariable[i].dummyVariableValue })
        }
        classCopy = Array.from(new Map(classCopy.map((item: { classNumber: any; }) => [item.classNumber, item])).values());  //根据classNumber去重
        let classNameClass = []             //[['武汉','长沙'],['南昌'],['北京']]
        for (let i = 0; i < classCopy.length; i++) {
            let dummyVariableNameList: unknown[] = []
            for (let j = 0; j < dummyVariable.length; j++) {
                if (dummyVariable[j].dummyVariableClass === classCopy[i].classNumber) {
                    dummyVariableNameList.push(dummyVariable[j].dummyVariableName)
                }
            }
            classNameClass.push(dummyVariableNameList)
        }
        // console.log(classNameClass)
        for (let i = 0; i < classCopy.length; i++) {
            let reEncodingList = []
            for (let j = 0; j < getAttribute[rowIndex.value].attributeData.length; j++) {
                if (classNameClass[i].includes(getAttribute[rowIndex.value].attributeData[j])) {
                    reEncodingList.push(Number(classCopy[i].classValue))
                }
                else {
                    reEncodingList.push(0)
                }
            }
            let missingNumber = 0
            for (let k = 0; k < reEncodingList.length; k++) {
                if (reEncodingList[k] === null || reEncodingList[k] === undefined) {
                    missingNumber = missingNumber + 1
                }
            }
            const missingRate = missingNumber / reEncodingList.length
            let obj: any = {
                attributeName: getAttribute[rowIndex.value].attributeName + '_类别' + i.toString(),
                attributeValue: getAttribute[rowIndex.value].attributeValue,
                attributeLabel: getAttribute[rowIndex.value].attributeLabel,
                attributeData: reEncodingList,
                isDelete: getAttribute[rowIndex.value].isDelete,
                isGroup: false,
                isInfluence: false,
                isCovariate: false,
                fontColor: true,
                dataImputation: 0,
                attributeIndex: j,
                missingRate: missingRate,
            }
            getAttribute.push(obj)
            j = j + 1
            console.log(getAttribute)
        }
    }
    else if (reEncodingValue.value === 1) {                         //阈值分类
        const Data = []
        for (let i = 0; i < getAttribute[rowIndex.value].attributeData.length; i++) {
            for (let j = 0; j < dataClassification.length; j++) {
                if (Number(getAttribute[rowIndex.value].attributeData[i]) < dataClassification[j].thresholdNumber) {
                    Data.push(Number(dataClassification[j].thresholdValue))
                    break
                }
            }
        }
        let missingNumber = 0
        for (let k = 0; k < Data.length; k++) {
            if (Data[k] === null || Data[k] === undefined) {
                missingNumber = missingNumber + 1
            }
        }
        const missingRate = missingNumber / Data.length
        let obj: any = {
            attributeName: getAttribute[rowIndex.value].attributeName + '（阈值分类）',
            attributeValue: getAttribute[rowIndex.value].attributeValue,
            attributeLabel: getAttribute[rowIndex.value].attributeLabel,
            attributeData: Data,
            isDelete: getAttribute[rowIndex.value].isDelete,
            isGroup: false,
            isInfluence: false,
            isCovariate: false,
            fontColor: true,
            dataImputation: 0,
            attributeIndex: j,
            missingRate: missingRate,
        }
        getAttribute.push(obj)
        j = j + 1
    }
    dialogVisible.value = false
    reEncodingValue.value = 0
    dataClassification.length = 0
    thresholdClassification.value = 0
}

const reEncodingValue = ref(0)

const reEncodingOptions = [
    {
        value: 0,
        label: '手动选择分类',
        disabled: false,
    },
    {
        value: 1,
        label: '阈值分类',
        disabled: false,
    }
]

const reEncodingClassOptions = [
    {
        value: 0,
        label: '',

    }
]
const thresholdClassification = ref(0)               //响应用户输入阈值
interface dataClassification {
    thresholdName: string
    thresholdNumber: number
    thresholdValue: number
    isDisable: boolean
}
const dataClassification = reactive<dataClassification[]>([])
watch(thresholdClassification, (newVal, oldVal) => {
    dataClassification.length = 0
    for (let i = 0; i < (Number(thresholdClassification.value) + 1); i++) {
        let obj: any = {
            thresholdName: '阈值' + (i + 1).toString(),
            thresholdNumber: 0,
            thresholdValue: 0,
            isDisable: false
        }
        dataClassification.push(obj)
    }
});

watch(dataClassification, (newVal, oldVal) => {
    dataClassification[dataClassification.length - 1].thresholdNumber = Infinity
    dataClassification[dataClassification.length - 1].isDisable = true
    dataClassification.sort((a, b) => a.thresholdNumber - b.thresholdNumber);
    // 现在 dataClassification 数组已经按照 thresholdNumber 排序了  
});


const dataImputationOptions = [
    {
        value: 0,
        label: '中位数填补(向下取整)',
    },
    {
        value: 1,
        label: '均数填补',
    },
    {
        value: 2,
        label: '众数填补',
    },
    {
        value: 3,
        label: '常数填补',
    },
    {
        value: 4,
        label: '线性插值法',
    },
]

const dialogVisibleConst = ref(false)   //常数填补响应式
const constValue = ref(0)
const constInput = ref('')       //常数填补内容响应式
const constOptions = [
    {
        value: 0,
        label: '数字',
    },
    {
        value: 1,
        label: '字符',
    },
]
const complementIndex = ref(-1)
function constPrimary() {                 //常数填补法具体操作
    if (constValue.value === 0) {
        for (let i = 0; i < getAttribute[complementIndex.value].attributeData.length; i++) {
            if (getAttribute[complementIndex.value].attributeData[i] === null || getAttribute[complementIndex.value].attributeData[i] === undefined) {
                getAttribute[complementIndex.value].attributeData[i] = Number(constInput.value)
            }
        }
    }

    if (constValue.value === 1) {
        for (let i = 0; i < getAttribute[complementIndex.value].attributeData.length; i++) {
            if (getAttribute[complementIndex.value].attributeData[i] === null || getAttribute[complementIndex.value].attributeData[i] === undefined) {
                getAttribute[complementIndex.value].attributeData[i] = constInput.value.toString()
            }
        }
    }
    let missingNumber = 0
    for (let k = 0; k < getAttribute[complementIndex.value].attributeData.length; k++) {
        if (getAttribute[complementIndex.value].attributeData[k] === null || getAttribute[complementIndex.value].attributeData[k] === undefined || getAttribute[complementIndex.value].attributeData[k] === '') {
            missingNumber = missingNumber + 1
        }
    }
    getAttribute[complementIndex.value].missingRate = missingNumber / getAttribute[complementIndex.value].attributeData.length
    dialogVisibleConst.value = false
}


//线性插值法
import * as echarts from 'echarts';
import { min } from '@pureadmin/utils';
const dialogVisibleLinear = ref(false)       //线性插值法界面展现响应式
const dependentVariable = ref(0)          //选择因变量响应式
const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

let dependentVariableList = []      //因变量数组
let inDependentVariableList = []     //自变量数组
let dependentName = ''                 //因变量变量名
let independentName = ''               //自变量变量名
function dependentAccess() {
    chartInstance?.dispose()
    dependentName = getAttribute[dependentVariable.value].attributeName
    independentName = getAttribute[complementIndex.value].attributeName
    dependentVariableList = getAttribute[dependentVariable.value].attributeData
    inDependentVariableList = getAttribute[complementIndex.value].attributeData
    const valueList = [[0, 0]]
    valueList.pop()
    for (let i = 0; i < dependentVariableList.length; i++) {
        let obj = []
        obj.push(inDependentVariableList[i])
        obj.push(dependentVariableList[i])
        valueList.push(obj)
    }

    chartInstance = echarts.init(chartRef.value);
    var option = {
        xAxis: {
            name: independentName,
            min: min(inDependentVariableList) - 1
        },
        yAxis: {
            name: dependentName,

        },
        series: [
            {
                type: 'scatter',
                data: valueList
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    chartInstance.setOption(option); // 初始设置配置项
}
function dialogVisibleLinearPrimary() {        //确认使用线性回归
    chartInstance?.dispose()
    dialogVisibleLinear.value = false
}

function dialogVisibleLinearCancel() {            //不使用线性回归
    chartInstance?.dispose()
    dialogVisibleLinear.value = false
}

function findMode(array: any) {                          //寻找众数的函数
    // 创建一个对象来存储每个元素的计数  
    const countMap = <any>{};
    let maxCount = 0;
    let modes = [];

    // 遍历数组并计数  
    for (let i = 0; i < array.length; i++) {
        const num = array[i];
        if (countMap[num]) {
            countMap[num]++;
        } else {
            countMap[num] = 1;
        }

        // 更新最大计数和众数数组  
        if (countMap[num] > maxCount) {
            maxCount = countMap[num];
            modes = [num];
        } else if (countMap[num] === maxCount) {
            modes.push(num);
        }
    }
    // 返回众数数组  
    return modes;
}
function dataImputationAccept(index: any, dataImputation: any) {
    if (dataImputation === 0) {                                      //采用中位数填补
        if (typeof getAttribute[index].attributeData[0] === typeof '') {
            message('字符数据无法采用中位数填补', { type: 'error' })
        }
        else {
            let a = []
            for (let i = 0; i < getAttribute[index].attributeData.length; i++) {
                a.push(getAttribute[index].attributeData[i])
            }
            a = a.filter(item => item !== null && item !== undefined);
            const middle = a[Math.floor(a.length / 2)]

            for (let i = 0; i < getAttribute[index].attributeData.length; i++) {
                if (getAttribute[index].attributeData[i] === null || getAttribute[index].attributeData[i] === undefined) {
                    getAttribute[index].attributeData[i] = middle
                }
            }
            let missingNumber = 0
            for (let k = 0; k < getAttribute[index].attributeData.length; k++) {
                if (getAttribute[index].attributeData[k] === null || getAttribute[index].attributeData[k] === undefined || getAttribute[index].attributeData[k] === '') {
                    missingNumber = missingNumber + 1
                }
            }
            getAttribute[index].missingRate = missingNumber / getAttribute[index].attributeData.length
            message(getAttribute[index].attributeName + '已采用中位数填补成功', { type: 'success' })
        }
    }
    if (dataImputation === 1) {                                      //采用均数填补
        if (typeof getAttribute[index].attributeData[0] === typeof '') {
            message('字符数据无法采用均数填补', { type: 'error' })
        }
        else {
            let a = []
            for (let i = 0; i < getAttribute[index].attributeData.length; i++) {
                a.push(getAttribute[index].attributeData[i])
            }
            a = a.filter(item => item !== null && item !== undefined);
            let average = 0
            for (let i = 0; i < a.length; i++) {
                average = average + Number(a[i])
            }
            average = average / a.length
            for (let i = 0; i < getAttribute[index].attributeData.length; i++) {
                if (getAttribute[index].attributeData[i] === null || getAttribute[index].attributeData[i] === undefined) {
                    getAttribute[index].attributeData[i] = average
                }
            }
            let missingNumber = 0
            for (let k = 0; k < getAttribute[index].attributeData.length; k++) {
                if (getAttribute[index].attributeData[k] === null || getAttribute[index].attributeData[k] === undefined || getAttribute[index].attributeData[k] === '') {
                    missingNumber = missingNumber + 1
                }
            }
            getAttribute[index].missingRate = missingNumber / getAttribute[index].attributeData.length
            message(getAttribute[index].attributeName + '已采用均数填补成功', { type: 'success' })
        }
    }
    if (dataImputation === 2) {                                      //采用众数填补
        let a = []
        for (let i = 0; i < getAttribute[index].attributeData.length; i++) {
            a.push(getAttribute[index].attributeData[i])
        }
        a = a.filter(item => item !== null && item !== undefined);
        let mode = []
        mode = findMode(a)
        for (let i = 0; i < getAttribute[index].attributeData.length; i++) {
            if (getAttribute[index].attributeData[i] === null || getAttribute[index].attributeData[i] === undefined) {
                getAttribute[index].attributeData[i] = mode[0]
            }
        }
        let missingNumber = 0
        for (let k = 0; k < getAttribute[index].attributeData.length; k++) {
            if (getAttribute[index].attributeData[k] === null || getAttribute[index].attributeData[k] === undefined || getAttribute[index].attributeData[k] === '') {
                missingNumber = missingNumber + 1
            }
        }
        getAttribute[index].missingRate = missingNumber / getAttribute[index].attributeData.length
        message(getAttribute[index].attributeName + '已采用众数填补成功', { type: 'success' })
    }
    if (dataImputation === 3) {                                    //采用常数填补
        dialogVisibleConst.value = true
        complementIndex.value = index
    }
    if (dataImputation === 4) {                                     //采用线性插值法
        dialogVisibleLinear.value = true
        complementIndex.value = index
    }
}

//将本页面的数据保存为Excel文件
import XLSX from 'xlsx'
function saveasExcel(fileName = 'test.xlsx') {
    let jsonArray = []; // 用于存储JSON对象的数组  

    // 获取第一个元素的attributeData长度，作为循环次数  
    let rowCount = getAttribute[0].attributeData.length;
    // 遍历每一行数据  
    for (let i = 0; i < rowCount; i++) {
        let obj:any = {}; // 当前行的对象  

        // 遍历所有列（getAttribute数组中的元素）  
        for (let j = 0; j < getAttribute.length; j++) {
            // 使用attributeName作为键，attributeData[i]作为值  
            obj[getAttribute[j].attributeName] = getAttribute[j].attributeData[i];
        }

        // 将当前行的对象添加到jsonArray中  
        jsonArray.push(obj);
    }
    const wb = XLSX.utils.book_new();
    // 转换JSON数据到工作表，假设jsonData是一个包含对象的数组，每个对象代表一行数据  
    const a = JSON.parse(JSON.stringify(jsonArray));//进行深拷贝从而不影响输入进来的原数组（先转换成字符串再重新转换成数组，这样a就不指向原json文件的地址了）
    a.forEach((item: any) => {
        item.attributeData = JSON.stringify(item.attributeData);
    });  //将数据预处理为字符串
    // console.log(JSON.parse(a[0].attributeData))        //！！！！！！利用这个方法可以把字符串重新变回数组！！！！！！
    const ws = XLSX.utils.json_to_sheet(a);
    // 将工作表添加到工作簿中，并命名为'Sheet1'  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    // 生成Excel文件的二进制数据  
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    // 创建一个Blob对象，并设置MIME类型为Excel文件  
    const blob = new Blob([s2ab(wbout)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    // 创建一个指向该Blob的URL  
    const url = URL.createObjectURL(blob);
    // 创建一个<a>标签，并设置href为Blob的URL，然后模拟点击下载  
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName; // 设置下载文件的文件名  
    document.body.appendChild(link);
    link.click(); // 模拟点击下载文件  
    document.body.removeChild(link); // 下载完成后移除<a>标签  
    // 释放URL对象，以避免内存泄漏  
    URL.revokeObjectURL(url);

}

// 辅助函数，用于将二进制字符串转换为ArrayBuffer对象（如果需要的话）  
function s2ab(s: any) {
    const buffer = new ArrayBuffer(s.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buffer;
}

const jsonData = [
    { 'zi': '门窗安装-0101', 'time': 8, 'start': 1, 'end': 8 },
    { 'zi': '墙面方正、垂直度-0102', 'time': 8, 'start': 1, 'end': 8 },
    { 'zi': '空鼓-0103', 'time': 8, 'start': 1, 'end': 8 }
];
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
                <el-option v-for="item in matchMannerOptions" :key="item.value" :label="item.label" :value="item.value"
                    :disabled="item.disabled" />
            </el-select>
        </div>
        <div v-if="matchManner === 1" class="child-div">卡钳值:</div>
        <div v-if="matchManner === 1" class="child-div2">
            <el-input size="small" v-model="caliper" style="max-width: 100px">
            </el-input>
        </div>
        <div class="child-div">样本缺失处理方式:</div>
        <div class="child-div2">
            <el-select size="small" v-model="sampleMissingValueHandling" placeholder="Select" style="width: 140px">
                <el-option v-for="item in sampleMissingValueHandlingOptions" :key="item.value" :label="item.label"
                    :value="item.value" :disabled="item.disabled" />
            </el-select>
        </div>
        <div v-if="sampleMissingValueHandling === 1" class="child-div">缺失率:</div>
        <div v-if="sampleMissingValueHandling === 1" class="child-div2">
            <el-input size="small" v-model="missingValueProportion" style="max-width: 100px">
            </el-input>
        </div>
        <div class="child-div">
            <el-button type="success" size="small" round @click="saveasExcel()">保存预处理数据</el-button>
        </div>
        <div class="child-div">
            <el-button type="success" size="small" round @click="onSubmit()">分析数据</el-button>
        </div>

    </div>
    <el-table :data="getAttribute" style="width: 100%; margin-top:20px">
        <el-table-column label="属性" width="260">
            <template #default="scope">
                <div v-if="scope.row.fontColor === false" style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.attributeName }}</span>
                    <span class="text-blue-500"
                        v-if="getAttribute[scope.$index].attributeValue === 1 || getAttribute[scope.$index].attributeValue === 2">(定类)</span>
                </div>
                <div v-if="scope.row.fontColor === true" style="display: flex; align-items: center">
                    <span style="margin-left: 10px" class="text-blue-500">{{ scope.row.attributeName }}</span>
                    <span class="text-blue-500"
                        v-if="getAttribute[scope.$index].attributeValue === 1 || getAttribute[scope.$index].attributeValue === 2">(定类)</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="分组变量" width="200">
            <template #default="scope">
                <el-switch
                    v-if="(hasGroupAttribute === false || (scope.row.isGroup === true && hasGroupAttribute === true)) && scope.row.isInfluence === false && scope.row.isCovariate === false"
                    width="40" v-model="scope.row.isGroup" />
                <el-switch
                    v-if="(scope.row.isGroup === false && hasGroupAttribute === true) || scope.row.isInfluence === true || scope.row.isCovariate === true"
                    disabled width="40" v-model="scope.row.isGroup" />
            </template>
        </el-table-column>
        <el-table-column label="影响因素" width="200">
            <template #default="scope">
                <el-switch
                    v-if="(hasInfluenceAttribute === false || (scope.row.isInfluence === true && hasInfluenceAttribute === true)) && scope.row.isGroup === false && scope.row.isCovariate === false"
                    width="40" v-model="scope.row.isInfluence" />
                <el-switch
                    v-if="(scope.row.isInfluence === false && hasInfluenceAttribute === true) || scope.row.isGroup === true || scope.row.isCovariate === true"
                    disabled width="40" v-model="scope.row.isInfluence" />
            </template>
        </el-table-column>
        <el-table-column label="协变量" width="200">
            <template #default="scope">
                <el-switch v-if="scope.row.isGroup === true || scope.row.isInfluence === true" disabled width="40"
                    v-model="scope.row.isCovariate" />
                <el-switch v-if="scope.row.isGroup === false && scope.row.isInfluence === false" width="40"
                    v-model="scope.row.isCovariate" />
            </template>
        </el-table-column>
        <el-table-column label="缺失率" width="200">
            <template #default="scope">
                <div v-if="scope.row.missingRate === 0" style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.missingRate }}</span>
                </div>
                <div class="text-red-500" v-if="scope.row.missingRate !== 0" style="display: flex; align-items: center">
                    <span style="margin-left: 10px">{{ scope.row.missingRate.toFixed(4) }}</span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="一般数据填补" width="300">
            <template #default="scope">
                <el-select class="child-div1" v-model="scope.row.dataImputation" placeholder="Select" size="small"
                    style="width: 120px">
                    <el-option v-for="item in dataImputationOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
                <el-button class="child-div1 " size="small" type="success"
                    @click="dataImputationAccept(scope.$index, scope.row.dataImputation)">确定</el-button>
            </template>

        </el-table-column>
        <el-table-column label="哑变量设置" width="200">
            <template #default="scope">
                <el-button size="small" type="success" @click="reEncoding(scope.$index)">数据转换</el-button>
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
    <el-dialog class="font-bold" center v-model="dialogVisible" title="哑变量设置" width="600" :before-close="handleClose">
        <div class="parent-div justify-center">
            <div class="dialog">
                编码方式：
            </div>
            <div class="dialog">
                <el-select v-model="reEncodingValue" placeholder="Select" size="small" style="width: 140px">
                    <el-option v-for="item in reEncodingOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div>
        </div>
        <div v-if="reEncodingValue === 0" style="margin-top:20px">
            <div class="flex justify-center font-bold">若数据种类多于40种,此页面不会展示数据</div>
            <el-table :data="dummyVariable" style="width: 100%">
                <el-table-column prop="dummyVariableName" label="类名" width="160px" />
                <el-table-column label="所属类" width="200px">
                    <template #default="scope">
                        <el-select v-model="scope.row.dummyVariableClass" placeholder="Select" size="small"
                            width="50px">
                            <el-option v-for="item in reEncodingClassOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="类值">
                    <template #default="scope">
                        <el-input size="small" v-model="scope.row.dummyVariableValue" style="width: 150px"
                            placeholder="Please input" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="parent-div" v-if="reEncodingValue === 1" style="margin-top: 20px;">
            <div class="child-div1">请输入您想设置几个分界点:</div>
            <el-input class="child-div1" size="small" v-model="thresholdClassification" style="max-width: 100px">
            </el-input>
            <el-table :data="dataClassification" style="width: 100%;margin-top: 20px;">
                <el-table-column prop="thresholdName" label="" width="180" />
                <el-table-column label="最大值">
                    <template #default="scope">
                        <el-input v-if="scope.row.isDisable === false" size="small" v-model="scope.row.thresholdNumber"
                            style="max-width: 100px">
                        </el-input>
                        <el-input v-if="scope.row.isDisable === true" disabled size="small"
                            v-model="scope.row.thresholdNumber" style="max-width: 100px">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column label="设定值">
                    <template #default="scope">
                        <el-input size="small" v-model="scope.row.thresholdValue" style="max-width: 100px">
                        </el-input>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <template #footer>
            <div class="dialog-footer">

                <el-button @click="cancel()">Cancel</el-button>
                <el-button type="primary" @click="primary()">
                    Confirm
                </el-button>

            </div>
        </template>
    </el-dialog>
    <el-dialog center v-model="dialogVisibleConst" title="常数填补" width="500">
        <div>
            <div class="child-div1">填补的数据类型:</div>
            <div class="child-div1">
                <el-select v-model="constValue" placeholder="Select" size="small" style="width: 140px">
                    <el-option v-for="item in constOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </div>
        </div>
        <div style="margin-top: 20px;">
            <div class="child-div1">请输入填充的数据:</div>
            <div class="child-div1">
                <el-input v-model="constInput" style="width: 140px" size="small" />
            </div>
        </div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisibleConst = false">取消</el-button>
                <el-button type="primary" @click="constPrimary()">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog center :show-close="false" v-model="dialogVisibleLinear" title="线性插值法" width="600">
        <div style="margin-top: 10px;margin-left: 20px;">
            <div class="child-div1">请选择因变量:</div>
            <div class="child-div1">
                <el-select v-model="dependentVariable" placeholder="Select" size="small" style="width: 140px">
                    <el-option v-for="item in getAttribute" :key="item.attributeIndex" :label="item.attributeName"
                        :value="item.attributeIndex" />
                </el-select>
            </div>
            <div class="child-div1">
                <el-button size="small" type="success" @click="dependentAccess()">确认</el-button>
            </div>
        </div>
        <div style="margin-top: 10px;margin-left: 20px;">
            散点图预览
        </div>
        <div ref="chartRef" style="width: 100%;height:400px;"></div>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisibleLinearCancel()">取消</el-button>
                <el-button type="primary" @click="dialogVisibleLinearPrimary()">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

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
    margin-right: 50px;
    /* 设置间隔 */
    vertical-align: top;
    /* 确保子元素顶部对齐 */
}

.child-div:last-child {
    float: right;
}

.dialog {
    display: inline-block;
    /* 如果需要的话，可以设置宽度和间隔 */
    margin-right: 5px;
    /* 设置间隔 */
    vertical-align: top;
    /* 确保子元素顶部对齐 */
}
</style>