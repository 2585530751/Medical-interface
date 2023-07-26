<script setup lang='ts'>
defineOptions({
    name: 'imageTable'
})
import { ref } from 'vue'

import type { TableColumnCtx, TableInstance } from 'element-plus'

import { ElMessageBox } from 'element-plus'

const drawer = ref(false)
const drawer2 = ref(false)
const direction = ref('rtl')
const radio1 = ref('Option 1')
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure you want to close this?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
function cancelClick() {
  drawer2.value = false
}
function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
    .then(() => {
      drawer2.value = false
    })
    .catch(() => {
      // catch error
    })
}
//
const parentBorder = ref(false)
const childBorder = ref(false)
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
            {
                Description: 'Body 4.0 CE',
                Series: '3',
                成像设备: 'SM',
                Instances: '10',
            },
            {
                Description: 'Body 3.0 CE',
                Series: '2',
                成像设备: 'CT',
                Instances: '120',
            },
        ],
    },
]
const tableRef = ref<TableInstance>()

const resetDateFilter = () => {
    tableRef.value!.clearFilter(['date'])
}
// TODO: improvement typing when refactor table
const clearFilter = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    tableRef.value!.clearFilter()
}
// const filterTag = (value: string, row: User) => {
//   return row.tag === value
// }
// const filterHandler = (
//   value: string,
//   row: User,
//   column: TableColumnCtx<User>
// ) => {
//   const property = column['property']
//   return row[property] === value
// }
</script>

<template>
    <el-drawer v-model="drawer2" :direction="direction">
    <template #header>
      <h4>set title by slot</h4>
    </template>
    <template #default>
      <div>
        <el-radio v-model="radio1" label="Option 1" size="large"
          >Option 1</el-radio
        >
        <el-radio v-model="radio1" label="Option 2" size="large"
          >Option 2</el-radio
        >
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">cancel</el-button>
        <el-button type="primary" @click="confirmClick">confirm</el-button>
      </div>
    </template>
  </el-drawer>
    <div class="mx-auto w-4/5 flex flex-row  ">
        <div class=" basis-1/6">
            <p style="white-space: nowrap;display:inline;" class=" w-9">共0条</p>
            <el-button round>上传</el-button>
            <el-button round>刷新</el-button>
        </div>

        <div class=" basis-1/6"></div>
        <div class=" basis-4/6">
            <div class="mt-4   w-1/3 " style="display: inline;">
                <el-input v-model="input3" placeholder="Please input 姓名" class="w-1/3 input-with-select "
                    style="display: ;">
                    <template #prepend>
                        <el-button :icon="Search" />
                    </template>
                    <template #append>
                        <el-select v-model="select" placeholder="Select" style="width: 115px">
                            <el-option label="姓名" value="1" />
                            <el-option label="成像设备" value="2" />
                            <el-option label="日期" value="3" />
                        </el-select>
                    </template>
                </el-input>
            </div>
        </div>
        <el-button round type="primary" style="margin-left: 16px" @click="drawer2 = true">高级筛选</el-button>


    </div>
    <div class=" mx-auto w-4/5">
        switch parent border: <el-switch v-model="parentBorder" /> switch child
        border: <el-switch v-model="childBorder" />
        <el-table :data="tableData" :border="parentBorder" style="width: 100%">
            <el-table-column type="expand">
                <template #default="props">
                    <el-button type="primary">Basic Viewer</el-button>
                    <el-button type="primary">Total Metabolic Tumor Volume</el-button>
                    <el-button type="primary">Microscopy</el-button>
                    <div m="4">
                        <p m="t-0 b-2">State: {{ props.row.state }}</p>
                        <p m="t-0 b-2">City: {{ props.row.city }}</p>
                        <p m="t-0 b-2">Address: {{ props.row.address }}</p>
                        <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
                        <h3>Family</h3>
                        <el-table :data="props.row.family" :border="childBorder">
                            <el-table-column label="Description" prop="Description" />
                            <el-table-column label="Series" prop="Series" />
                            <el-table-column label="成像设备" prop="成像设备" />
                            <el-table-column label="Instances" prop="Instances" />
                        </el-table>
                    </div>
                </template>
            </el-table-column>
            <el-table-column sortable label="Date" prop="date" />
            <el-table-column label="Name" prop="name" />
            <el-table-column label="MRN" prop="mrn" />
            <el-table-column label="Description" prop="Description" />
            <el-table-column label="Accession" prop="Accession" />
            <el-table-column label="记录医生" prop="note" />
            <el-table-column label="检查部位" prop="Check" />
            <el-table-column label="状态" prop="state" />
            <el-table-column label="id" prop="equipment" />
            <el-table-column prop="equip" label="成像设备" width="100" :filters="[
                { text: 'AR', value: 'AR' },
                { text: 'AU', value: 'AU' },
                { text: 'OCR', value: 'OCR' },
                { text: 'BMD', value: 'BMD' },
                { text: 'OBDUS', value: 'OBDUS' },
                { text: 'CT', value: 'CT' },
            ]" :filter-method="filterTag" filter-placement="bottom-end">
                <template #default="scope">
                    <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.tag
                    }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default>
                    <el-button link type="primary" size="small" @click="handleClick">Detail</el-button>
                    <el-button link type="primary" size="small">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style lang='scss' scoped></style>
