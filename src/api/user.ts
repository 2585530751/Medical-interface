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
