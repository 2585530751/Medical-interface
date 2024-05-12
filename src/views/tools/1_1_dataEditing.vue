<script setup lang='ts'>
//下面使用index界面传来的文件路径参数
import { useRoute } from 'vue-router';
import { basicImageUrl } from '@/api/utils'
const param = useRoute();
const toolRoute = param.query.toolRoute;         //routeValue就是上一个界面的值
const fileRoute = basicImageUrl + toolRoute        //文件的具体申请路径

//测试
import { onMounted, } from 'vue'
import XLSX from 'xlsx'
onMounted(() => {
    test1()
})

function test1() {
    fetch(fileRoute)          //输入文件路径fileRoute
        .then((response: Response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob(); // 获取 Blob 对象  
        })
        .then((blob: Blob) => {
            console.log(blob)    //看看文件大小吧~~~
            // 你可以在这里使用 FileReader 或其他方法将 Blob 转换为 ArrayBuffer 或其他格式  
            // 然后使用 Excel 解析库（如 SheetJS 的 xlsx.js）来解析内容  
            // 示例：使用 FileReader 转换为 ArrayBuffer  
            const reader = new FileReader();
            reader.onload = (event: ProgressEvent<FileReader>) => {
                if (event.target && event.target.result) {
                    const arrayBuffer: ArrayBuffer = event.target.result as ArrayBuffer;
                    // 假设你已经有了一个处理 ArrayBuffer 的函数  
                    // processArrayBuffer(arrayBuffer);  
                    // 或者直接使用 xlsx.js 来解析  
                    const workbook: XLSX.WorkBook = XLSX.read(arrayBuffer, { type: 'array' });
                    console.log(workbook) //看看那个表到底有些啥
                    const wsname = workbook.SheetNames[0] // 取第一张表
                    const ws: any = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])// 生成json表格内容,此处的ws就是一个对象
                    console.log(ws)
                    const data: any = []                          //将数据保存在data中，data中每一个元素保存了一行的所有数据
                    ws.map((item: any) => { 
                        let obj: any = {
                            arr: []
                        }
                        Object.values(item).map((child: any, index: number) => {
                            obj.arr.push('name' + index)
                            obj[`name${index}`] = child
                        })
                        data.push(obj)
                    })
                    console.log(data)                   
                }
            };
            reader.readAsArrayBuffer(blob);
        })
        .catch((error: Error) => {
            console.error('Error fetching the file:', error);
        });
}
</script>
<template>
    <div>dataEditing</div>
    <div :src="basicImageUrl + toolRoute">
        {{ basicImageUrl + toolRoute }}
    </div>
</template>
<style></style>