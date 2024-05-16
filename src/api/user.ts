import { http } from '@/utils/http'
import { baseUrlApi } from './utils'

export type UserResult = {
  success: boolean
  code: number
  msg: string
  data: {
    /** 用户名 */
    username: string
    /** 当前登陆用户的角色 */
    roles: Array<string>
    /** `token` */
    accessToken: string

    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: number
  }
}

export type RefreshTokenResult = {
  success: boolean
  code: number
  msg: string
  data: {
    /** `token` */
    accessToken: string
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: number
  }
}

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>(
    'post',
    baseUrlApi('user/login'),
    { data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>(
    'post',
    baseUrlApi('user/refreshToken'),
    { data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const register = (data?: object) => {
  return http.request<UserResult>(
    'post',
    baseUrlApi('user/register'),
    { data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const forgetPassword = (data?: object) => {
  return http.request<UserResult>(
    'post',
    baseUrlApi('user/updatePasswordByPhoneNumber'),
    { data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const isAccountExisted = (params?: object) => {
  return http.request<UserResult>(
    'post',
    baseUrlApi('user/isAccountExisted'),
    { params },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const deleteSingleImageById = (params?: object) => {
  return http.request<any>('get', baseUrlApi('image/deleteSingleImageById'), { params })
}

export const getUserInformationApi = (params?: object) => {
  return http.request<any>("get", baseUrlApi("user/getUserInfo"))
}

export const updateUserAddressApi = (data?: object) => {
  return http.request<any>("post", baseUrlApi("user/updateUserAddress"), { data }, {
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}

// export const postUserInformationApi =(params?: object) =>{
//   return http.request<any>("post",baseUrlApi("user/updateUserInfo"),{params})
// }


export const postUserInformationApi = (params?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('user/updateUserInfo'),
    { params },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const setHeadIconApi = (data?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('user/setHeadIcon'),
    { data },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export const getHeadIconApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('user/getHeadIcon'))
}

export const postPatientInformationApi = (data?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('patient/addOne'),
    { data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const getPatientInformationApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('patient/getAllPatientInformation'))
}

export const getPatientStudyPageApi = (data?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('study/getPatientStudyPage'),
    { data },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const setExcelApi = (data?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('tool/addTool'),
    { data },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}

export const getExcelApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('tool/getToolInfoByUserId'))
}

export const getExcelByToolIdApi = (params?: object) => {
  return http.request<any>('get', baseUrlApi('tool/getToolInfoByToolId'), { params })
}

export const updateExcelApi = (data?: object) => {
  return http.request<any>(
    'post',
    baseUrlApi('tool/updateTool'),
    { data },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
}
