import axios from 'axios' // 引入
import { ElMessage } from 'element-plus'
import { filterParams } from '@/utils/index'
const config = {
  // baseURL: baseURL,
  // 因为跨域了，所以这里如果写的话会自动拼接，会有两份，所以隐藏了
  timeout: 3000000, // 设置最大请求时间
}
const _axios = axios.create(config)

// /* 请求拦截器（请求之前的操作） */
_axios.interceptors.request.use(
  (config) => {
    // 如果有需要在这里开启请求时的loading动画效果
    // config.headers.Authorization = getToken  //添加token,需要结合自己的实际情况添加，
    return config
  },
  (err) => Promise.reject(err),
)

// /* 请求之后的操作 */
_axios.interceptors.response.use(
  (res) => {
    // 在这里关闭请求时的loading动画效果
    // 这里用于处理返回的结果，比如如果是返回401无权限，可能会是跳回到登录页的操作，结合自己的业务逻辑写
    // 一定结合自己的后端的返回代码进行操作
    // if (res.data.code === 401) {
    //   console.log('无权限操作')
    // }

    // if (res.data.code === 0) {
    //     console.log(res.data.data);

    //     return res.data.data;
    // }
    return res
  },
  (err) => {
    if (err) {
      // 在这里关闭请求时的loading动画效果
      location.href = `${location.origin}/#/login`
    }
    return Promise.reject(err)
  },
)

// 封装post,get方法
// 按理来说应该也可以封装其他的方法
const net = {
  get(url = '', params = {}) {
    return new Promise((resolve, reject) => {
      _axios({
        url,
        params: { ...params },
        headers: {
          'content-type': 'application/json',
        },
        method: 'GET',
      })
        .then((res) => {
          if (res.status === 200 && res.data.code === 0) {
            resolve({
              ...res.data.data,
              code: res.data.code,
              message: res.data.msg,
            })
          } else {
            ElMessage({
              type: 'error',
              message: res.data.msg || '系统异常，稍后再试',
            })
          }
          // return res;
          return resolve(res.data.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  post(url = '', params = {}) {
    const currParams = filterParams(params)
    let currUrl = url
    if (url.indexOf('/list') && currParams.pageSize) {
      currUrl = `${url}?pageSize=${params.pageSize}&pageNum=${params.pageNum}`

      delete currParams.pageSize
      delete currParams.pageNum
    }

    return new Promise((resolve, reject) => {
      _axios({
        url: currUrl,
        data: { ...currParams },
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
        .then((res) => {
          if (res.status === 200 && res.data.code === 0) {
            resolve({
              ...res.data.data,
              code: res.data.code,
              message: res.data.msg,
            })
          } else {
            ElMessage({
              type: 'error',
              message: res.data.msg || '系统异常，稍后再试',
            })
          }
          // return res;
          return resolve(res.data.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

// 暴露所写的内容
export default net
