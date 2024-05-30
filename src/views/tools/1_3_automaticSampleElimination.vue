<script setup lang='ts'>
//模拟将json文件改成Excel文件
function downloadExcel() {
    console.log()
}
import XLSX from 'xlsx'
function jsonToExcel(jsonData: any, fileName = 'test.xlsx') {
    // 创建一个新的工作簿  
    const wb = XLSX.utils.book_new();
    // 转换JSON数据到工作表，假设jsonData是一个包含对象的数组，每个对象代表一行数据  

    const a = JSON.parse(JSON.stringify(jsonData));//进行深拷贝从而不影响输入进来的原数组（先转换成字符串再重新转换成数组，这样a就不指向原json文件的地址了）
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

// 示例JSON数据  
const jsonData = [
    { 'zi': '门窗安装-0101', 'time': 8, 'start': 1, 'end': 8 },
    { 'zi': '墙面方正、垂直度-0102', 'time': 8, 'start': 1, 'end': 8 },
    { 'zi': '空鼓-0103', 'time': 8, 'start': 1, 'end': 8 }
];
</script>

<template>
    <div>
        <el-button type="success" size="small" round @click="jsonToExcel(jsonData)">保存</el-button>
    </div>
</template>