<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import {
  provinceAndCityDataPlus,
  provinceAndCityData,
  convertTextToCode,
  regionDataPlus,
  regionData,
  CodeToText
} from '@/utils/chinaArea'

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
  userHeight: null,
  userWeight: null,
  place: ['', '', '']
})

const rules = reactive<FormRules>({
  account: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'change'
    }
  ],
  phoneNumber: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change'
    }
  ],
  userName: [
    {
      required: true,
      message: 'Please select activity userName',
      trigger: 'change'
    }
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`
}))
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between ml-3">
      <el-text size="large">基本信息</el-text>
      <el-button type="default">保存</el-button>
    </div>
    <div class="m-2">
      <el-form
        ref="userRuleFormRef"
        :model="userRuleForm"
        :rules="rules"
        label-width="auto"
        class="w-full"
        :size="formSize"
        :inline="true"
        status-icon
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="userRuleForm.account" class="w-96" disabled />
        </el-form-item>
        <el-form-item label="名称" prop="userName">
          <el-input v-model="userRuleForm.name" class="w-96" />
        </el-form-item>
        <br />
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userRuleForm.email" class="w-96" />
        </el-form-item>
        <el-form-item label="手机" prop="phoneNumber">
          <el-input v-model="userRuleForm.phoneNumber" class="w-96" />
        </el-form-item>
        <el-form-item label="籍贯" prop="place">
          <el-cascader v-model="userRuleForm.place" :options="regionData" class="w-96"/>
        </el-form-item>
        <el-form-item label="住址" prop="address">
          <el-input v-model="userRuleForm.address" class="w-96" />
        </el-form-item>
        <el-form-item label="生日" prop="birthOfDate" >
          <el-date-picker
            v-model="userRuleForm.birthOfDate"
            type="date"
            label="选择日期"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="userRuleForm.gender">
            <el-radio label="1" border>男性</el-radio>
            <el-radio label="2" border>女性</el-radio>
          </el-radio-group>
        </el-form-item>
        <br />
        <el-form-item label="真实姓名" prop="name">
          <el-input v-model="userRuleForm.name" class="w-96" />
        </el-form-item>
        <el-form-item label="身份证号" prop="address">
          <el-input v-model="userRuleForm.address" class="w-96" />
        </el-form-item>
        <el-form-item label="身高" prop="userHeight">
          <el-input v-model="userRuleForm.userHeight" class="w-96" />
        </el-form-item>
        <el-form-item label="体重" prop="userWeight">
          <el-input v-model="userRuleForm.userWeight" class="w-96" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
