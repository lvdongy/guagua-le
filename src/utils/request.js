import axios from 'axios'
import config from '../../config.js'
// import { formatFormParams } from '@/utils/tools.js'
console.log(config)// del
const instance = axios.create({
  baseURL: getBaseURL()
})

function getBaseURL() {
  // 开发环境直接返回代理关键字
  if(config.env === 'development') {
    return '/proxy_api'
  }
  // 假如配置了betaHostKeyword，则检测当前是否是测试服，是的话返回测试服api域名
  if(config.betaHostKeyword && location.host.includes(config.betaHostKeyword)) {
    return config.api.beta
  }
  return config.api[config.env]
}

instance.interceptors.request.use(
  config => {
    // TODO:假如传参需要x-www-form-urlencoded格式
    // if(config.method === 'post' || config.method === 'get'){
    //     config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    //     if(config.method === 'post'){
    //         config.data = formatFormParams(config.data);
    //     }
    // }
    // TODO:end
    config.headers['Cache-Control'] = 'no-cache'
    return config
  },

  error => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  response => {
    if(response.data && +response.data.code === config.successApiCode) {
      return response.data
    }else{
      // TODO:返回结果错误处理
      return Promise.reject(response.data)
    }
  },

  error => {
    // TODO:返回结果错误处理
    return Promise.reject(error)
  }
)

export default instance
