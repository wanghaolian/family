import { get, post } from './request'

export default (Vue) => {
  Vue.prototype.$http = {
    get: get,
    post: post,
  }
}
