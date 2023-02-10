import axios from 'axios'
import { filterParams } from '@/utils/utils'
import { Message } from 'ant-design-vue'
import router from '../router'

const promiseArr = {}
const CancelToken = axios.CancelToken
let cancel = {}

// 创建axios实例
const service = axios.create({
  baseURL: process.env.API_SERVER,
  timeout: 60000, // 请求超时时间
})

service.interceptors.request.use(config => {

  // 发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url] && promiseArr[config.url].data === config.data) {
    promiseArr[config.url].cancel('cancel')
  }

  promiseArr[config.url] = { data: config.data || config.params, cancel }

  return config

}, error => Promise.reject(error))

service.interceptors.response.use((res) => {
  // 服务器报错
  if (res.data.code >= 500 && res.data.code < 600) {
    Message.error('服务器睡着啦，请再次尝试，谢谢！')
    return Promise.reject(res.data)
  } else if (res.data.code !== 401) { // 正常响应
    if (Number(res.data.code) !== 200 && Number(res.data.code) !== 10001) {
      Message.error(res.data.message)
      return Promise.reject(res.data)
    } else {
      return Promise.resolve(res.data.data)
    }
  } else {
    const whiteList = [''] // 不重定向白名单
    if (!whiteList.includes(router.currentRoute.path)) {
      // 不在白名单的
      Message.destroy()
      Message.error('不在白名单的')
      return Promise.reject(res.data)
    } else {
      return Promise.reject(res.data)
    }
  }
}, error => Promise.reject(error))

const request = (url, method, params, headers) => {

  const obj = {
    GET: 'params',
    POST: 'data',
  }

  const cancelToken = new CancelToken(c => {
    cancel = c
  })

  return service({
    url,
    method,
    [obj[method]]: filterParams(params),
    cancelToken,
    headers: headers ? headers.headers : {},
  })
}

const get = (url, params, headers) => request(url, 'GET', params, headers)

const post = (url, params, headers) => request(url, 'POST', params, headers)

export {
  get,
  post,
  service,
}
