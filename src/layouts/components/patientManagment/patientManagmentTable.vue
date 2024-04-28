<script setup lang="ts">
import type { TableInstance } from 'element-plus'
import editPen from '@iconify-icons/ep/edit-pen'
import deleteUser from '@iconify-icons/ep/delete'
import IonEllipsisHorizontal from '@/assets/svg/IonEllipsisHorizontal.svg?component'
import { computed, ref } from 'vue'

interface User {
  date: string
  name: string
  address: string
}

const parentBorder = ref(false)
const childBorder = ref(false)
const tableData1 = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
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
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
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
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
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
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
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
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
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
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
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
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
]
defineProps<{
  tableSize: string
}>()

const tableRef = ref<TableInstance>()
const tableData = [
  {
    patientID: 1,
    patientName: '张三',
    age: 35,
    gender: '男性',
    contact: '13888888888',
    address: '北京市朝阳区',
    healthStatus: '高血压',
    reasonForVisit: '头痛',
    visitDate: '2022-01-01',
    diagnosis: '高血压引起的头痛',
    followUpNeeded: true,
    followUpVisits: [
      {
        followUpDate: '2022-01-10',
        followUpResult: '血压控制良好，继续药物治疗'
      },
      {
        followUpDate: '2022-02-10',
        followUpResult: '血压略升高，需要增加药物剂量'
      }
    ]
  },
  {
    patientID: 4,
    patientName: '赵六',
    age: 40,
    gender: '女性',
    contact: '13999999999',
    address: '北京市海淀区',
    healthStatus: '高血压',
    reasonForVisit: '头晕',
    visitDate: '2022-03-01',
    diagnosis: '高血压引起的头晕',
    followUpNeeded: false,
    followUpVisits: []
  },
  {
    patientID: 5,
    patientName: '钱七',
    age: 55,
    gender: '男性',
    contact: '13666666666',
    address: '上海市长宁区',
    healthStatus: '冠心病',
    reasonForVisit: '胸痛',
    visitDate: '2022-02-28',
    diagnosis: '冠心病引起的胸痛',
    followUpNeeded: true,
    followUpVisits: [
      {
        followUpDate: '2022-03-15',
        followUpResult: '需要进行血管成形术'
      }
    ]
  },
  {
    patientID: 7,
    patientName: '李四',
    age: 45,
    gender: '女性',
    contact: '13988888888',
    address: '北京市海淀区',
    healthStatus: '高血压',
    reasonForVisit: '头晕',
    visitDate: '2022-05-01',
    diagnosis: '高血压引起的头晕',
    followUpNeeded: true,
    followUpVisits: [
      {
        followUpDate: '2022-05-10',
        followUpResult: '血压控制良好，继续药物治疗'
      },
      {
        followUpDate: '2022-06-10',
        followUpResult: '血压略升高，需要增加药物剂量'
      }
    ]
  },
  {
    patientID: 10,
    patientName: '王五',
    age: 55,
    gender: '男性',
    contact: '13666666666',
    address: '上海市浦东新区',
    healthStatus: '糖尿病',
    reasonForVisit: '口渴',
    visitDate: '2022-03-01',
    diagnosis: '糖尿病引起的口渴',
    followUpNeeded: true,
    followUpVisits: [
      {
        followUpDate: '2022-03-15',
        followUpResult: '血糖控制良好，继续药物治疗'
      },
      {
        followUpDate: '2022-04-15',
        followUpResult: '血糖略升高，需要增加药物剂量'
      }
    ]
  },
  {
    patientID: 14,
    patientName: '王五',
    age: 60,
    gender: '男性',
    contact: '13666666666',
    address: '上海市浦东新区',
    healthStatus: '高血压',
    reasonForVisit: '头痛',
    visitDate: '2022-03-01',
    diagnosis: '高血压引起的头痛',
    followUpNeeded: true,
    followUpVisits: [
      {
        followUpDate: '2022-05-15',
        followUpResult: '血压控制良好，继续药物治疗'
      },
      {
        followUpDate: '2022-06-15',
        followUpResult: '血压略升高，需要增加药物剂量'
      }
    ]
  },
  {
    patientID: 8,
    patientName: '吴八',
    age: 45,
    gender: '男性',
    contact: '13555555555',
    address: '上海市杨浦区',
    healthStatus: '肺癌',
    reasonForVisit: '咳嗽',
    visitDate: '2022-02-28',
    diagnosis: '肺癌引起的咳嗽',
    followUpNeeded: '是',
    followUpVisits: [
      {
        followUpDate: '2022-03-15',
        followUpResult: '需要进行放疗'
      },
      {
        followUpDate: '2022-04-15',
        followUpResult: '放疗效果良好，继续治疗'
      }
    ]
  },
  {
    patientID: 9,
    patientName: '沈九',
    age: 60,
    gender: '女性',
    contact: '13000000000',
    address: '上海市虹口区',
    healthStatus: '心脏病',
    reasonForVisit: '心悸',
    visitDate: '2022-02-25',
    diagnosis: '心脏病引起的心悸',
    followUpNeeded: '是',
    followUpVisits: [
      {
        followUpDate: '2022-03-10',
        followUpResult: '需要调整药物治疗'
      },
      {
        followUpDate: '2022-04-10',
        followUpResult: '药物治疗调整后效果良好'
      }
    ]
  },
  {
    patientID: 10,
    patientName: '刘十',
    age: 30,
    gender: '男性',
    contact: '13200000000',
    address: '北京市西城区',
    healthStatus: '胃炎',
    reasonForVisit: '胃痛',
    visitDate: '2022-01-25',
    diagnosis: '胃炎引起的胃痛',
    followUpNeeded: '否',
    followUpVisits: []
  },
  {
    patientID: 11,
    patientName: '陈十一',
    age: 42,
    gender: '女性',
    contact: '13700000001',
    address: '北京市丰台区',
    healthStatus: '高血压',
    reasonForVisit: '头晕',
    visitDate: '2022-03-05',
    diagnosis: '高血压引起的头晕',
    followUpNeeded: '是',
    followUpVisits: [
      {
        followUpDate: '2022-03-12',
        followUpResult: '血压控制良好，继续药物治疗'
      },
      {
        followUpDate: '2022-04-12',
        followUpResult: '血压略升高，需要增加药物剂量'
      }
    ]
  }
]

const filterGender = (value: string, row: any, column: any) => {
  return row.gender === value
}
</script>

<template>
  <el-card class="box-card">
    <el-table ref="tableRef" :data="tableData" style="width: 100% " stripe="True"
      :default-sort="{ prop: 'visitDate', order: 'descending' }" :size="tableSize">
      <el-table-column type="expand">

        <template #default="props">
          <div class="common-layout">
            <el-container>
              <el-aside width="60px"></el-aside>
              <el-main>
                <div class="flex flex-col">
                  <h>患者信息:</h>
                  <p>自我描述:</p>
                </div>
              </el-main>
            </el-container>
          </div>

          <div class="common-layout">
         <el-container>
          <el-aside width="60px"></el-aside>
          <el-main>
          <el-table :data="tableData1" :border="parentBorder" style="width: 100%" size="small">
            <el-table-column type="expand">
              <template #default="props">
                <div m="4">
                  <h3>随访记录</h3>
                  <el-table :data="tableData1">
                    <el-table-column label="图片" prop="date" width="150px" />
                    <el-table-column label="图像ID" prop="date" />
                    <el-table-column label="图像名称" prop="date" />
                    <el-table-column label="操作" prop="date">
                      <template #default="scope">
                        <el-button link type="primary" size="small" @click=""><template #icon>
                            <IconifyIconOffline :icon="editPen"></IconifyIconOffline>
                          </template>
                          查看</el-button>
                        <el-popconfirm title="你确定要删除他吗?" @confirm="">
                          <template #reference>
                            <el-button link type="primary" size="small">
                              <template #icon>
                                <IconifyIconOffline :icon="deleteUser"></IconifyIconOffline>
                              </template>
                              删除</el-button>
                          </template>
                        </el-popconfirm>
                        <el-button :icon="IonEllipsisHorizontal" link type="primary" />
                      </template>

                    </el-table-column>
                  </el-table>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="检查时间" prop="date" sortable />
            <el-table-column label="检查部位" prop="date" />
            <el-table-column label="成像设备" prop="date" />
            <el-table-column label="图像描述" prop="date" />
            <el-table-column label="序列数量" prop="date" />
            <el-table-column label="上传医生" prop="date" />
            <el-table-column label="上传时间" prop="date" />
            <el-table-column label="操作" prop="date">
              <template #default="scope">
                <el-button link type="primary" size="small" @click=""><template #icon>
                    <IconifyIconOffline :icon="editPen"></IconifyIconOffline>
                  </template>
                  查看</el-button>
                <el-popconfirm title="你确定要删除他吗?" @confirm="">
                  <template #reference>
                    <el-button link type="primary" size="small">
                      <template #icon>
                        <IconifyIconOffline :icon="deleteUser"></IconifyIconOffline>
                      </template>
                      删除</el-button>
                  </template>
                </el-popconfirm>

                <el-button :icon="IonEllipsisHorizontal" link type="primary" />
              </template>
            </el-table-column>
          </el-table>
          </el-main>
          <el-aside width="60px"></el-aside>
        </el-container>
        </div>
        </template>
      </el-table-column>
      <el-table-column label="就诊日期" prop="visitDate" sortable />
      <el-table-column label="姓名" prop="patientName" />
      <el-table-column label="性别" prop="gender" :filters="[
        { text: '男性', value: '男性' },
        { text: '女性', value: '女性' }
      ]" :filter-method="filterGender" filter-placement="top-end" />
      <el-table-column sortable label="年龄" prop="age" />
      <el-table-column label="联系方式" prop="contact" />
      <el-table-column label="住址" prop="address" />
      <el-table-column label="健康状况" prop="healthStatus" />
      <el-table-column label="就诊原因" prop="reasonForVisit" />
      <el-table-column label="诊断结果" prop="diagnosis" />
      <el-table-column fixed="right" label="操作" width="200">
        <template #default>
          <el-button link type="primary" size="small" @click=""><template #icon>
              <IconifyIconOffline :icon="editPen"></IconifyIconOffline>
            </template>
            修改</el-button>
          <el-popconfirm title="你确定要删除他吗?">
            <template #reference>
              <el-button link type="primary" size="small">
                <template #icon>
                  <IconifyIconOffline :icon="deleteUser"></IconifyIconOffline>
                </template>
                删除</el-button>
            </template>
          </el-popconfirm>

          <el-button :icon="IonEllipsisHorizontal" link type="primary" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style lang="scss" scoped></style>
