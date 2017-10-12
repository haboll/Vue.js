/**
 * 创建于：12/10/17
 * 创建人：栗子哥哥
 * 说明：登录验证模块
 */

import http from '@/utils/http'
import store from 'store'
export const TOKEN_KEY = 'ef_token'
export const USER_KEY = 'ef_user'
export const ROLE_KEY = 'ef_role'
export const USER_INFO = 'ef_user_info'
const Auth = {
  authorize (uname, psd, cb) {
    let data = {
      CurPwd: psd,
      ClientId: 3,
      Role: 0,
      PwdMode: 1
    }
    if (/^\d*$/gi.test(uname)) {
      Object.assign(data, {
        LoginType: 2,
        Name: uname
      })
    } else if (/[^@]+@[^@]+\.[^@]+$/gi.test(uname)) {
      Object.assign(data, {
        LoginType: 3,
        Name: uname
      })
    } else {
      Object.assign(data, {
        LoginType: 1,
        Name: uname
      })
    }
    http({
      type: 'post',
      url: '/Token',
      data: data
    }).promise
      .then((res) => {
        let data = res.Data
        store.set(TOKEN_KEY, data.Token)
        store.set(USER_KEY, data.FileToken)
        store.set(USER_INFO, data.Extra.UserInfo)
        cb(null, data)
      })
      .catch((err) => {
        cb(err)
      })
  },
  isAuthorized () {
    if (store.get(TOKEN_KEY)) {
      return true
    } else {
      return false
    }
  },
  unAuthorize (cb) {
    store.remove(TOKEN_KEY)
    store.remove(USER_KEY)
    store.remove(ROLE_KEY)
    store.remove(USER_INFO)
    http({
      type: 'delete',
      url: '/Token'
    }).promise
      .then((res) => {
        cb()
      })
      .catch((err) => {
        cb(err)
      })
  },
  getToken () {
    return store.get(TOKEN_KEY)
  },
  getUser () {
    return store.get(USER_INFO) || {}
  },
  getRoleType () {
    return store.get(ROLE_KEY) || {}
  }
}

export default Auth

