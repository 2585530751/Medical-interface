<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { useUserStoreHook } from '@/store/modules/user'
import { message } from '@/utils/message'
import { loginRules } from '@/composables/user/rule'
import { useRouter, useRoute } from 'vue-router'
import { isLoggedIn } from '@/utils/auth'

defineOptions({
  name: ''
})

const props = defineProps<{
  loginWindowOpen?: boolean
}>()

const emits = defineEmits<{
  loginWindowClose: [] // 具名元组语法
}>()

let centerDialogVisible = props.loginWindowOpen

watch(
  () => {
    return props.loginWindowOpen
  },
  (value, prevValue) => {
    centerDialogVisible = value
  }
)

const ruleFormRef = ref<FormInstance>()
const loading = ref(false)
const ruleForm = reactive({
  account: 'admin',
  password: 'admin123'
})
const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      useUserStoreHook()
        .loginByUsername({ account: ruleForm.account, password: ruleForm.password })
        .then((res) => {
          if (res.success) {
            //获取后端路由
            message(res.msg, { type: 'success' })
            emits('loginWindowClose')
            isLoggedIn.value = true
          } else {
            message(res.msg, { type: 'error' })
          }
        })
        .catch((err) => {
          message(err, { type: 'error' })
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      Object.keys(fields as object).forEach((key,i) => {
                    const propName=fields![key][0].field
                    const propMessage=fields![key][0].message as string
                    if(i==0){
                        formEl.resetFields(propName)
                        message(propMessage, { type: 'error' })
                    }
                })
      loading.value = false
    }
  })
}
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    @close="$emit('loginWindowClose')"
    title="登录"
    width="350px"
    center
  >
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="loginRules" size="large">
      <el-form-item
        :rules="[
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ]"
        prop="account"
      >
        <el-input clearable v-model="ruleForm.account" placeholder="账号" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input clearable show-password v-model="ruleForm.password" placeholder="密码" />
      </el-form-item>
    </el-form>
    <div class="flex justify-between py-3">
      <div class="text-blue-300 cursor-pointer hover:text-red-400">忘记密码</div>
      <div class="text-blue-300 cursor-pointer hover:text-red-400">注册</div>
    </div>
    <el-button
      class="w-full"
      size="large"
      type="primary"
      :loading="loading"
      @click="onLogin(ruleFormRef)"
    >
      登录
    </el-button>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
