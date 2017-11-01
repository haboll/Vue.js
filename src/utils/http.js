
import $ from 'jquery'
import Q from 'q'
import appConfig from '@/api/config'
import auth from '../auth'
$.support.cors = true

let ERROR_CODE = {
  'login': {
    '-4': '用户名或者密码错误',
    '-3': '没有找到此用户',
    '-5': '请输入合法的用户名或者密码',
    '-7': '用户没有登录该客户端的权限'
  },
  'postExamGroup': {
    '-5': '成绩导入失败',
    '-6': '已存在此考试成绩',
    '-7': '你没有权限对该班级进行操作',
    '-12': '班级或成绩文件不存在'
  },
  'default': {
    '-2': '登陆过期',
    '-3': '未找到数据',
    '-5': '参数不正确',
    '-6': '数据重复',
    '-7': '你没有执行此操作的权限',
    '-12': '你操作的对象不存在',
    '-14': '服务器返回了一个IO错误',
    '401': '你没有执行此操作的权限,请确定你是否是管理员，或者身份信息已过期，请重新登录',
    '404': '你访问的资源不存在（404）',
    '500': '服务器返回了一个错误',
    '-255': '服务器返回了一个错误',
    '-15': '你的账号已经在别处登录,请重新登录',
    '0': '请求失败,请检查网络'
  }
}

export const getErrorMsg = function (code, type) {
  code = code.toString()
  if (!type || !ERROR_CODE[type]) {
    return ERROR_CODE['default'][code] || `未知错误:${code}`
  }
  if (ERROR_CODE[type][code]) {
    return ERROR_CODE[type][code]
  } else {
    return ERROR_CODE['default'][code] || `未知错误:${code}`
  }
}
let http = function (url, config, type) {
  type = type || 'default'
  if (typeof url === 'string') {
    if (typeof config === 'string') {
      type = config
      config = {
        url: url
      }
    } else if (typeof config === 'object') {
      config.url = url
    } else {
      config = {
        url: url
      }
    }
  } else {
    type = config
    config = url
  }
  if (!config.headers) {
    config.headers = {}
  }
  config.headers.Authorization = auth.getToken() ? `CAuth ${auth.getToken()}` : ''
  config.url = `${appConfig.apiHost}${config.url}`
  let deferred = Q.defer()
  let ajax = $.ajax(config)
    .done(function (res) {
      if (res.State || res.State === 0) {
        if (res.State >= 0) {
          deferred.resolve(res)
        } else {
          deferred.reject({
            code: res.State,
            msg: getErrorMsg(res.State, type)
          })
        }
      }
    })
    .fail(function (error) {
      if (error.statusText === 'abort') {
        deferred.reject({
          code: error.status,
          abort: true
        })
      } else {
        deferred.reject({
          code: error.status,
          msg: getErrorMsg(error.status, type),
          abort: false
        })
      }
    })
  return {
    request: ajax,
    promise: deferred.promise
  }
}
export default http

