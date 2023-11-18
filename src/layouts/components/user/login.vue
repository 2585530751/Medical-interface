<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { useUserStoreHook } from '@/store/modules/user'
import { message } from '@/utils/message'
import { loginRules } from '@/composables/user/rule'
import { useRouter, useRoute } from 'vue-router'
defineOptions({
  name: ''
})
const router = useRouter()
const route = useRoute()

const props = defineProps<{
  loginWindowOpen?: boolean
}>()

defineEmits<{
  loginWindowClose: [] // 具名元组语法
}>()

const centerDialogVisible = computed(() => {
  console.log(props.loginWindowOpen)
  return props.loginWindowOpen
})

const ruleFormRef = ref<FormInstance>()
const loading = ref(false)
const ruleForm = reactive({
  username: 'admin',
  password: 'admin123'
})
const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      useUserStoreHook()
        .loginByUsername({ account: '123456', password: '123456' })
        .then((res) => {
          if (res.success) {
            //获取后端路由
            router.push('/imageOperation')
            message('登录成功', { type: 'success' })
          } else {
            loading.value = false
            console.log(fields)
            return fields
          }
        })
    }
  })
}
</script>

<template>
  <el-dialog v-model="centerDialogVisible" title="登录" width="300px" center>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="loginRules" size="large">
      <el-form-item
        :rules="[
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }
        ]"
        prop="username"
      >
        <el-input clearable v-model="ruleForm.username" placeholder="账号" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input clearable show-password v-model="ruleForm.password" placeholder="密码" />
      </el-form-item>
      <el-button
        class="w-full mt-4"
        size="default"
        type="primary"
        :loading="loading"
        @click="onLogin(ruleFormRef)"
      >
        登录
      </el-button>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('loginWindowClose')">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
