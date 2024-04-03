<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, type UploadInstance } from 'element-plus'

import type { UploadProps } from 'element-plus'

import select from '@/assets/svg/select.svg?component'
import upload from '@/assets/svg/upload.svg?component'

import { Iphone, Location, OfficeBuilding, Tickets, User } from '@element-plus/icons-vue'

const imageUrl = ref('http://localhost:5173/src/assets/images/example2.png')

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const errorHandler = () => true

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value!.submit()
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
          吴成磊
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
          18100000000
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
          Suzhou
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
          <el-tag size="small">2585530751@qq.com</el-tag>
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
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
      <div class="flex gap-3">
        <el-avatar
          shape="circle"
          :size="150"
          src="https://empty"
          @error="errorHandler"
          class="inline-block"
        >
          <img :src="imageUrl" />
        </el-avatar>
        <div class="flex flex-col justify-center gap-4">
          <el-upload
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :auto-upload="false"
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
