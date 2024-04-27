<script setup lang="ts">
import { computed, reactive, ref, watch, type Ref, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { useUserStoreHook } from '@/store/modules/user'
import { message } from '@/utils/message'
import { loginRules, registerRules, forgetRules } from '@/composables/user/rule'
import { forgetPassword } from '@/api/user'
import { isLoggedIn } from '@/utils/auth'
import securityCode from '@/layouts/components/user/securityCode.vue'
const options = [
  {
    value: 'doctor',
    label: '主治医生',
    children: [
      {
        value: 'internist',
        label: '内科',
        children: [
          {
            value: 'cardiovascularInternalMedicine',
            label: '心血管内科',
          },
          {
            value: 'SrespiratoryMedicineDepartment',
            label: '呼吸内科',
          },
          {
            value: 'digestiveMedicineDepartment',
            label: '消化内科',
          },
          {
            value: 'neurologyDepartment',
            label: '神经内科',
          },
          {
            value: 'nephrologyDepartment',
            label: '肾内科',
          },
          {
            value: 'endocrinologyDepartment',
            label: '内分泌科',
          },
          {
            value: 'hematologyDepartment',
            label: '血液内科',
          },
          {
            value: 'rheumatologyAndImmunologyDepartment',
            label: '风湿免疫科',
          },
        ],
      },
      {
        value: 'surgery',
        label: '外科',
        children: [
          {
            value: 'generalSurgeryDepartment',
            label: '普通外科（包括肝胆、胃肠、甲状腺、乳腺等）',
          },
          {
            value: 'neurosurgeryDepartment',
            label: '神经外科',
          },
          {
            value: 'thoracicSurgeryDepartment',
            label: '胸外科',
          },
          {
            value: 'cardiovascularSurgeryDepartment',
            label: '心血管外科',
          },
          {
            value: 'urologyDepartment',
            label: '泌尿外科',
          },
          {
            value: 'orthopedicsDepartment',
            label: '骨科',
          },
          {
            value: 'burnsDepartment',
            label: '烧伤科',
          },
          {
            value: 'plasticSurgeryDepartment',
            label: '整形外科',
          },
        ],
      },
      {
        value: 'obstetricianGynecologist',
        label: '妇产科',
        children: [
          {
            value: 'gynecologyDepartment',
            label: '妇科',
          },
          {
            value: 'obstetricsDepartment',
            label: '产科',
          },
          {
            value: 'familyPlanningDepartment',
            label: '计划生育科',
          },
          {
            value: 'reproductiveMedicineDepartment',
            label: '生殖医学科（或不孕不育科）',
          },
        ],
      },
      {
        value: 'pediatrician',
        label: '儿科',
        children: [
          {
            value: 'pediatricsDepartment',
            label: '小儿科',
          },
          {
            value: 'neonatologyDepartment',
            label: '新生儿科',
          },
        ],
      },
      {
        value: 'ophthalmologyAndOtolaryngologyDepartment',
        label: '五官科',
        children: [
          {
            value: 'otolaryngologyDepartment',
            label: '耳鼻喉科',
          },
          {
            value: 'ophthalmologyDepartment',
            label: '眼科',
          },
          {
            value: 'dentalDepartment',
            label: '口腔科',
          },
        ],
      },
      {
        value: 'dermatologyDepartment',
        label: '皮肤科',
        children: [
        ],
      },
      {
        value: 'psychiatryDepartment',
        label: '精神科',
        children: [
        ],
      },
      {
        value: 'oncologyDepartment',
        label: '肿瘤科',
        children: [
          {
            value: 'oncologyMedicineDepartment',
            label: '肿瘤内科',
          },
          {
            value: 'oncologicSurgeryDepartment',
            label: '肿瘤外科',
          },
          {
            value: 'radiationOncologyDepartment',
            label: '放疗科',
          },
        ],
      },
      {
        value: 'traditionalChineseMedicineDepartment',
        label: '中医科',
        children: [
          {
            value: 'traditionalChineseInternalMedicineDepartment',
            label: '中医内科',
          },
          {
            value: 'traditionalChineseSurgeryDepartment',
            label: '中医外科',
          },
          {
            value: 'acupunctureDepartment',
            label: '针灸科',
          },
          {
            value: 'massageTherapyDepartment',
            label: '推拿科',
          },
        ],
      },
      {
        value: 'rehabilitationMedicineDepartment',
        label: '康复医学科',
        children: [
          {
            value: 'physicalTherapyDepartment',
            label: '物理治疗科',
          },
          {
            value: 'rehabilitationDepartment',
            label: '康复科',
          },
        ],
      },
      {
        value: 'emergencyMedicineDepartment',
        label: '急诊医学科',
        children: [
          {
            value: 'emergencyDepartment',
            label: '急诊科',
          },
          {
            value: 'emergencyCenter',
            label: '急救中心',
          },
        ],
      },
      {
        value: 'anesthesiaAndOperatingDepartment',
        label: '麻醉科与手术室',
        children: [
          {
            value: 'anesthesiologyDepartment',
            label: '麻醉科',
          },
          {
            value: 'operatingRoom',
            label: '手术室',
          },
        ],
      },
      {
        value: 'medicalImagingAndLaboratoryDepartment',
        label: '医学影像科与检验科',
        children: [
          {
            value: 'radiologyDepartment',
            label: '放射科（X光、CT、MRI等）',
          },
          {
            value: 'ultrasonographyDepartment',
            label: '超声科',
          },
          {
            value: 'nuclearMedicineDepartment',
            label: '核医学科',
          },
          {
            value: 'laboratoryDepartment',
            label: '检验科',
          },
        ],
      },
      {
        value: 'pathologyDepartment',
        label: '病理科',
        children: [
          {
            value: 'pathologyExaminationDepartment',
            label: '病理学检查科',
          },
        ],
      },
      {
        value: 'nutritionAndDietaryDepartment',
        label: '营养科与膳食科',
        children: [
          {
            value: 'nutritionDepartment',
            label: '营养科',
          },
          {
            value: 'dietaryDepartment',
            label: '膳食科',
          },
        ],
      },
      {
        value: 'pharmacyDepartment',
        label: '药学部',
        children: [
          {
            value: 'pharmacy',
            label: '药房',
          },
          {
            value: 'pharmacyAdministrationAndClinicalPharmacy',
            label: '药事管理与临床药学',
          },
        ],
      },
      {
        value: 'otherAncillaryDepartments',
        label: '其他辅助科室',
        children: [
          {
            value: 'bloodTransfusionDepartment',
            label: '输血科',
          },
          {
            value: 'supplyRoom',
            label: '供应室',
          },
          {
            value: 'medicalRecordsDepartment',
            label: '病案室',
          },
        ],
      },
    ],
  },
  
  {
    value: 'radiologist',
    label: '影视科阅片员',
    children: [
          {
            value: 'ctReader',
            label: 'CT',
          },
          {
            value: 'mriReader',
            label: 'MRI',
          },
        ],
  },
  {
    value: 'patient',
    label: '患者',
  },
]
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

const dialog = reactive({
  dialogWidth: 350,
  dialogTitle: '登录'
})

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
      Object.keys(fields as object).forEach((key, i) => {
        const propName = fields![key][0].field
        const propMessage = fields![key][0].message as string
        if (i == 0) {
          formEl.resetFields(propName)
          message(propMessage, { type: 'error' })
        }
      })
      loading.value = false
    }
  })
}

const registerRuleFormRef = ref<FormInstance>()
const registerRuleForm = reactive({
  account: '',
  password: '',
  checkPassword: '',
  // email: '',
  phoneNumber: '',
  permissionName: [],
  verificationCode: '',
  inputCode: ''
})
const onRegister = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      useUserStoreHook()
        .register({
          account: registerRuleForm.account,
          password: registerRuleForm.password,
          phoneNumber: registerRuleForm.phoneNumber,
          permissionName: registerRuleForm.permissionName[registerRuleForm.permissionName.length-1]
        })
        .then((res) => {
          if (res.success) {
            //获取后端路由
            message('注册成功！请重新登录！', { type: 'success' })
            emits('loginWindowClose')
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
      Object.keys(fields as object).forEach((key, i) => {
        const propName = fields![key][0].field
        const propMessage = fields![key][0].message as string
        if (i == 0) {
          formEl.resetFields(propName)
          message(propMessage, { type: 'error' })
        }
      })
      loading.value = false
    }
  })
}

const forgetRuleFormRef = ref<FormInstance>()
const forgetRuleForm = reactive({
  account: '',
  phoneNumber: '',
  password: '',
  checkPassword: '',
  verificationCode: '',
  inputCode: ''
})
const onForgetPassword = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      forgetPassword({
        account: forgetRuleForm.account,
        password: forgetRuleForm.password,
        phoneNumber: forgetRuleForm.phoneNumber
      })
        .then((res) => {
          if (res.success) {
            //获取后端路由
            message('修改成功！', { type: 'success' })
            dialog.dialogTitle = '登录'
            Object.keys(forgetRuleForm).forEach((key) => {
              forgetRuleForm[key as keyof typeof forgetRuleForm] = ''
            })
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
      Object.keys(fields as object).forEach((key, i) => {
        const propName = fields![key][0].field
        const propMessage = fields![key][0].message as string
        if (i == 0) {
          formEl.resetFields(propName)
          message(propMessage, { type: 'error' })
        }
      })
      loading.value = false
    }
  })
}

const validateCheckPass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码！'))
  } else if (value !== registerRuleForm.password) {
    callback(new Error('两次密码不相同！'))
  } else {
    callback()
  }
}

const validateCheckPass1 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请确认密码！'))
  } else if (value !== forgetRuleForm.password) {
    callback(new Error('两次密码不相同！'))
  } else {
    callback()
  }
}

onMounted(() => {
  makeCode(4)
})

//验证码功能
const isFetching = ref(false)
const timer: Ref<NodeJS.Timer | null> = ref(null)
const countdown = ref(60)

async function fetchVerificationCode() {
  if (isFetching.value) return // 如果正在获取验证码，则直接返回
  isFetching.value = true // 标记为正在获取验证码
  forgetRuleForm.verificationCode = generateRandomCode().toString() // Convert the generated random code to a string
  registerRuleForm.verificationCode = forgetRuleForm.verificationCode // Convert the generated random code to a string
  // 启动倒计时
  startCountdown()
}

function generateRandomCode() {
  // 生成一个六位数的随机验证码
  return Math.floor(100000 + Math.random() * 900000)
}

function startCountdown() {
  // 清除之前的计时器（如果有的话）
  if (timer.value) {
    clearInterval(timer.value)
  }

  timer.value = setInterval(() => {
    if (countdown.value <= 0) {
      if (timer.value) {
        clearInterval(timer.value) // 清除计时器
      }
      countdown.value = 60 // 重置倒计时
      isFetching.value = false // 允许重新获取验证码
      forgetRuleForm.verificationCode = '' // 清空验证码
    } else {
      countdown.value-- // 更新倒计时
    }
  }, 1000)
}

//图像验证码
const identifyCode = ref('')

function refreshCode() {
  forgetRuleForm.inputCode = ''
  registerRuleForm.inputCode = ''
  identifyCode.value = '' //输入框置空
  makeCode(4) //验证码长度为4
}

function makeCode(length: number) {
  let code = ''
  for (let i = 0; i < length; i++) {
    const r = Math.floor(Math.random() * 36)
    if (r < 10) {
      code += r
    } else {
      code += String.fromCharCode(r - 10 + 65)
    }
  }
  identifyCode.value = code
  localStorage.setItem('code', code)
}
</script>

<template>
  <el-dialog
    v-model="centerDialogVisible"
    @close="$emit('loginWindowClose')"
    :title="dialog.dialogTitle"
    :width="dialog.dialogWidth"
    center
  >
    <div v-show="dialog.dialogTitle === '登录'">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="loginRules" size="large">
        <el-form-item prop="account">
          <el-input clearable v-model="ruleForm.account" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input clearable show-password v-model="ruleForm.password" placeholder="密码" />
        </el-form-item>
      </el-form>
      <div class="flex justify-between py-3">
        <div
          class="text-blue-300 cursor-pointer hover:text-red-400"
          @click="dialog.dialogTitle = '忘记密码'"
        >
          忘记密码
        </div>
        <div
          class="text-blue-300 cursor-pointer hover:text-red-400"
          @click="dialog.dialogTitle = '注册'"
        >
          注册
        </div>
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
    </div>
    <div v-show="dialog.dialogTitle === '注册'">
      <el-form
        ref="registerRuleFormRef"
        :model="registerRuleForm"
        :rules="registerRules"
        size="large"
      >
        <el-form-item prop="account">
          <el-input clearable v-model="registerRuleForm.account" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            clearable
            show-password
            v-model="registerRuleForm.password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item
          :rules="[
            {
              required: true,
              validator: validateCheckPass,
              trigger: 'blur'
            }
          ]"
          prop="checkPassword"
        >
          <el-input
            clearable
            v-model="registerRuleForm.checkPassword"
            show-password
            placeholder="确定密码"
          />
        </el-form-item>
        <!-- <el-form-item prop="email">
          <el-input clearable v-model="registerRuleForm.email" placeholder="邮箱" />
        </el-form-item> -->
        <el-form-item prop="phoneNumber">
          <el-input clearable v-model="registerRuleForm.phoneNumber" placeholder="电话" />
        </el-form-item>
        <el-form-item prop="verificationCode">
          <el-input clearable v-model="registerRuleForm.verificationCode" placeholder="手机验证码">
            <template #append>
              <el-button
                :size="isFetching ? 'small' : 'default'"
                :type="isFetching ? 'success' : 'primary'"
                :disabled="isFetching"
                @click="fetchVerificationCode"
              >
                {{ isFetching ? countdown + 's后重发' : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="inputCode">
          <el-input
            clearable
            v-model="registerRuleForm.inputCode"
            autocomplete="off"
            placeholder="验证码"
          >
            <template #append>
              <securityCode :identifyCode="identifyCode" @click="refreshCode()"></securityCode>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="身份：">
          <el-cascader :options="options" :show-all-levels="false" v-model="registerRuleForm.permissionName"/>
          <!-- <el-radio-group v-model="registerRuleForm.permissionName"> -->
            <!-- <el-radio  value="doctor" label="doctor" :border="true" size="default">医生</el-radio>
            <el-radio  value="patient" label="patient" :border="true" size="default">患者</el-radio>
            <el-radio  value="filmreviewer" label="filmreviewer" :border="true" size="default">阅片员</el-radio> -->
          <!-- </el-radio-group> -->
        </el-form-item>
      </el-form>
      <div class="flex justify-between py-3">
        <div
          class="text-blue-300 cursor-pointer hover:text-red-400"
          @click="dialog.dialogTitle = '登录'"
        >
          已有账号，立即登录
        </div>
        <div class="text-green-600 hover:text-red-400">注册即同意注册协议</div>
      </div>
      <el-button
        class="w-full"
        size="large"
        type="primary"
        :loading="loading"
        @click="onRegister(registerRuleFormRef)"
      >
        注册
      </el-button>
    </div>
    <div v-show="dialog.dialogTitle === '忘记密码'">
      <el-form ref="forgetRuleFormRef" :model="forgetRuleForm" :rules="forgetRules" size="large">
        <el-form-item prop="account">
          <el-input clearable v-model="forgetRuleForm.account" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="phoneNumber">
          <el-input clearable v-model="forgetRuleForm.phoneNumber" placeholder="手机号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input clearable show-password v-model="forgetRuleForm.password" placeholder="密码" />
        </el-form-item>
        <el-form-item
          :rules="[
            {
              required: true,
              validator: validateCheckPass1,
              trigger: 'blur'
            }
          ]"
          prop="checkPassword"
        >
          <el-input
            clearable
            v-model="forgetRuleForm.checkPassword"
            show-password
            placeholder="确定密码"
          />
        </el-form-item>
        <el-form-item prop="verificationCode">
          <el-input clearable v-model="forgetRuleForm.verificationCode" placeholder="手机验证码">
            <template #append>
              <el-button
                :size="isFetching ? 'small' : 'default'"
                :type="isFetching ? 'success' : 'primary'"
                :disabled="isFetching"
                @click="fetchVerificationCode"
              >
                {{ isFetching ? countdown + 's后重发' : '获取验证码' }}
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="inputCode">
          <el-input
            clearable
            v-model="forgetRuleForm.inputCode"
            autocomplete="off"
            placeholder="验证码"
          >
            <template #append>
              <securityCode
                :identifyCode="identifyCode"
                canvasId="forgetCanvas"
                @click="refreshCode()"
              ></securityCode>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="flex justify-between py-3">
        <div
          class="text-blue-300 cursor-pointer hover:text-red-400"
          @click="dialog.dialogTitle = '登录'"
        >
          登录
        </div>
        <div
          class="text-blue-300 cursor-pointer hover:text-red-400"
          @click="dialog.dialogTitle = '注册'"
        >
          注册
        </div>
      </div>
      <el-button
        class="w-full"
        size="large"
        type="primary"
        :loading="loading"
        @click="onForgetPassword(forgetRuleFormRef)"
      >
        修改密码
      </el-button>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>
