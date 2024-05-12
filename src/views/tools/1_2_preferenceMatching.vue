<template>
    <div class="loginContainer">
        <el-button plain type="text" style="position:absolute;left:20px;top:20px;font-size:18px;"
            @click="back">返回</el-button>
        <div class="formBOX">
            <div style="font-weight:600;font-size:24px;margin-bottom:20px;">vue中读取excel文件内的内容</div>
            <div style="display:flex;flex-direction:column;justify-content:space-between;">
                <el-upload class="upload-demo" ref="upload" accept=".xls,.xlsx" action="" :on-change="uploadExcel"
                    :show-file-list="false" :auto-upload="false">
                    <el-button slot="trigger" size="large">导入excel</el-button>
                </el-upload>
            </div>
        </div>
        <div style="display:flex;">
            <div style="margin-top:20px;width:40%;overflow:scroll;">
                <div style="height:calc(100vh - 300px)">
                    <div class="liStyle">
                        <div v-for="item in menuData" class="itemClass">
                            <div>{{ item }}</div>
                        </div>
                    </div>
                    <div class="liStyle" v-for="item in tableData">
                        <div v-for="son in item.arr" class="itemClass">
                            <div>{{ item[son] }}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="margin-top:20px;width:40%;margin-left:10%">
                <el-table v-if="tableData2.length" :data="tableData2" stripe border height="calc(100vh - 300px)" size="small">
                    <el-table-column v-for="(item, index) in  menuData" :key="index" :prop="item" :label="item"
                        width="150">
                        <template #default="scope">
                            <span class="overflow-ellipsis">{{ scope.row[item] }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

        </div>

        <div style="返回数据"></div>
    </div>
</template>
<!-- 读取excel文件内容 -->
<script lang="ts" setup>
import { ref } from 'vue'
import XLSX from 'xlsx'
const menuData: any = ref([])
const tableData: any = ref([])
const tableData2: any = ref([])
const state = ref({
    fileList: [],
    excelData: [],
    tableHead: [],
    sheetList: [] as any[],
    allSheetObj: {} as any,
    tableExcelHead: [] as string[],
    excelTableData: [],
})
const uploadExcel = (file: any, fileList: any) => {
    let files = { 0: file.raw }
    const fileReader = new FileReader()
    fileReader.onload = (e: any) => {
        try {
            const workbook = XLSX.read(e.target.result, {
                type: 'binary'
            })
            const wsname = workbook.SheetNames[0] // 取第一张表
            const ws: any = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])// 生成json表格内容
            const data: any = []
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
            tableData.value = data
            tableData2.value = ws
            menuData.value = Object.keys(ws[0])
            console.log(tableData2.value)
          
        } catch (err) {
            console.log(err)
        }
    }
    fileReader.readAsBinaryString(files[0])
}

const back = async () => {
    window.history.back()

}
</script>
<style lang="scss" scoped>
.loginContainer {
    height: 100vh;
    width: 100vw;
    padding: 60px;
    cursor: pointer;
    overflow: hidden;
    box-sizing: border-box;
}

.loginTitle {
    margin: 20px auto;
}

.formBOX {
    width: 80%;
}

.liStyle {
    width: 100%;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
}

.itemClass {
    padding: 2px 6px;
    min-width: 120px;
}
</style>