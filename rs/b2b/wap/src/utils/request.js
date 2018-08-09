import axios from 'axios'
import store from '../store'
// import { getToken } from '@/utils/auth'
// import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/loading'
import router from '../router'

// 创建axios实例
const service = axios.create({
  //baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   config.headers['X-Token'] = 'admin' // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  // showFullScreenLoading()
  //console.log('showFullScreenLoading()')
  config.data = JSON.stringify(config.data)
  config.headers = {
    'Content-Type':'application/x-www-from-urlencoded'
  }

  return config
}, error => {
  // Do something with request error
  console.log(error,'request') // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    // tryHideFullScreenLoading()
    console.log('tryHideFullScreenLoading()')
    const res = response.data
    if (res.code !== 200) {
      this.$message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        this.$messagebox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  err => {
    // tryHideFullScreenLoading()
    console.log('tryHideFullScreenLoading()')
    if (err.request) {
      switch (err.request.status) {
        case 0:
          console.log('0')
          // window.location = 'http://admin.boosj.com:8018/admin/boCommon!goIndexPage.action'
          break
        case 401:
          console.log('401')
          window.location = 'http://admin.boosj.com:8018/admin/boCommon!goIndexPage.action'
          break
        case 403:
          console.log('403')
          router.push({ path: '/404' })
          break
        case 404:
          console.log('404')
          break
        case 405:
          console.log('405')
          break
        case 500:
      }
    }
    // tryHideFullScreenLoading()
    console.log('tryHideFullScreenLoading()')
    console.log(err.request)// for debug
    this.$message({
      message: err.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(err)
  }
)

export default service
