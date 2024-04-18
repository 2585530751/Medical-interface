<script setup lang="ts">
import { ref,onMounted, reactive, } from 'vue'
import { ElMessage, UploadUserFile, type UploadInstance } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import type { UploadProps } from 'element-plus'
import select from '@/assets/svg/select.svg?component'
import upload from '@/assets/svg/upload.svg?component'

import { Iphone, Location, OfficeBuilding, Tickets, User } from '@element-plus/icons-vue'
import {
  getUserInformationApi,
  postUserInformationApi
} from "@/api/user"
interface userRuleForm {
  name: string
  account: string
  email: string
  address: string
  phoneNumber: string
  userName: string
  birthOfDate: string
  gender: string
  userHeight: number | null
  userWeight: number | null
  place: string[]
  idCard: string
}

const formSize = ref('default')
const userRuleFormRef = ref<FormInstance>()
const userRuleForm = reactive<userRuleForm>({
  name: '',
  account: '',
  email: '',
  address: '',
  phoneNumber: '',
  userName: '',
  birthOfDate: '',
  gender: '',
  userHeight: 0,
  userWeight: 0,
  place: ['', '', ''],
  idCard: ''
})
function getUserInformation() {                                      //将个人信息界面中用户信息显示到表格中

//   const removeQuotes = computed(() => {
//   return originalString.value.replace(/"/g, '');
// });
getUserInformationApi().then((data) => {
  if (data.success == true) {
    userRuleForm.address = data.data.address.replace(/"/g, '')
    userRuleForm.birthOfDate = data.data.birthOfDate
    userRuleForm.email = data.data.email
    userRuleForm.gender = data.data.gender
    userRuleForm.idCard = data.data.idCard
    userRuleForm.name = data.data.name
    userRuleForm.phoneNumber = data.data.phoneNumber
    const placeStr = data.data.place
    userRuleForm.place[0] = placeStr.substring(0, 2) + '0000'
    if (placeStr.substring(0, 2) == '82' || placeStr.substring(0, 2) == '81') {
      userRuleForm.place[1] = placeStr
      userRuleForm.place.splice(2)
    } else {
      userRuleForm.place[1] = placeStr.substring(0, 4) + '00'
      userRuleForm.place[2] = placeStr
    }
    console.log(userRuleForm.place)
    userRuleForm.userHeight = data.data.userHeight
    userRuleForm.userName = data.data.userName
    userRuleForm.userWeight = data.data.userWeight
    userRuleForm.account = data.data.account
  }

})
}

onMounted(() => {
getUserInformation()
})

const imageUrl = ref('http://localhost:5173/src/assets/images/example2.png')

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  console.log(rawFile)
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const changeAvatarUpload= (file: UploadUserFile) => {
  imageUrl.value = URL.createObjectURL(file.raw!)
  console.log(imageUrl.value)
}

const errorHandler = () => true

const uploadRef = ref<UploadInstance>()

const fileList = ref<UploadUserFile>()

const submitUpload = () => {
  uploadRef.value!.submit()
  console.log(uploadRef.value)
}

function httpRequest(data:any) {
      console.log("自定义上传", data);
    }
</script>

<template>
  <el-card>
    <div class="flex items-center justify-center gap-10">
      <el-descriptions title="用户名" :column="3" size="large" border>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon class="text-lg">
                <user />
              </el-icon>
              用户名
            </div>
          </template>
          {{ userRuleForm.userName }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon class="text-lg">
                <iphone />
              </el-icon>
              电话
            </div>
          </template>
          {{userRuleForm.phoneNumber}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon class="text-lg">
                <location />
              </el-icon>
              位置
            </div>
          </template>
          {{userRuleForm.address}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon class="text-lg">
                <tickets />
              </el-icon>
              邮箱
            </div>
          </template>
          {{userRuleForm.email}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <div class="cell-item">
              <el-icon class="text-lg">
                <office-building />
              </el-icon>
              地址
            </div>
          </template>
          {{ userRuleForm.address }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="flex gap-3">
        <el-avatar
          shape="circle"
          :size="150"
          fit="cover"
          @error="errorHandler"
          :src="imageUrl"
          class="inline-block"
        >
          
        </el-avatar>
        <div class="flex flex-col justify-center gap-4">
          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
            :on-change="changeAvatarUpload"
            ref="uploadRef"
            :http-request="httpRequest"
            v-model="fileList"
          >
            <template #trigger>
              <el-button type="default" :icon="select">选择头像</el-button>
            </template>
          </el-upload>
          <el-button type="default" @click="submitUpload" :icon="upload">上传头像</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.el-descriptions {
  margin-top: 0px;
  padding-top: 0px;
}
.cell-item {
  display: flex;
  align-items: center;
}
</style>
