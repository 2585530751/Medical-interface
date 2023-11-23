import Cookies from 'js-cookie'
import { storageSession } from '@pureadmin/utils'
import { useUserStoreHook } from '@/store/modules/user'
import { ref } from 'vue';

export interface DataInfo<T> {
  /** token */
  accessToken: string
  /** `accessToken`的过期时间（时间戳） */
  expires: T
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string
  /** 用户名 */
  userName?: string
  /** 当前登陆用户的角色 */
  roles?: Array<string>
}

export const sessionKey = 'user-info'
export const TokenKey = 'authorized-token'

/** 获取`token` */
export function getToken(): DataInfo<number> {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey)!)
    : storageSession().getItem(sessionKey)
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`userName`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的sessionStorage里（浏览器关闭自动销毁）
 */
export function setToken(data: DataInfo<Date>) {
  let expires = 0
  const { accessToken, refreshToken } = data
  expires = new Date(data.expires).getTime() // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
  const cookieString = JSON.stringify({ accessToken, expires })

  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: (expires - Date.now()) / 86400000
      })
    : Cookies.set(TokenKey, cookieString)

  function setSessionKey(userName: string, roles: Array<string>) {
    useUserStoreHook().SET_USERNAME(userName)
    useUserStoreHook().SET_ROLES(roles)
    storageSession().setItem(sessionKey, {
      refreshToken,
      expires,
      userName,
      roles
    })
  }

  if (data.userName && data.roles) {
    const { userName, roles } = data
    setSessionKey(userName, roles)
  } else {
    const userName = storageSession().getItem<DataInfo<number>>(sessionKey)?.userName ?? ''
    const roles = storageSession().getItem<DataInfo<number>>(sessionKey)?.roles ?? []
    setSessionKey(userName, roles)
  }
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
  Cookies.remove(TokenKey)
  sessionStorage.clear()
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return 'Bearer ' + token
}

export async function checkAuthStatus() {
  // 检查 'user-info' 是否存在于 sessionStorage 中
  const userStorage = sessionStorage.getItem('user-info');
  const isLoggedIn = ref(false);
  if (userStorage) {
    // 用户已登录；将 isLoggedIn 设置为 true 并填充 userInfo
    isLoggedIn.value = true
  } else {
    // 'user-info' 不存在；检查 cookie 中的 'authorized-token'
    const authorizedToken = getToken;

    if (authorizedToken) {
      // 调用后端刷新令牌
      try {
        const refreshedData = await refreshTokens(authorizedToken)
        // 在 sessionStorage 中更新 'user-info'
        sessionStorage.setItem('user-info', JSON.stringify(refreshedData))
        isLoggedIn.value = true
      } catch (error) {
        // 处理令牌刷新错误（例如，重定向到登录页）
        console.error('刷新令牌失败：', error)
      }
    }else{
      // 如果在 cookie 中未找到 'authorized-token'，用户未登录
      isLoggedIn.value = false
    }
  }
}
