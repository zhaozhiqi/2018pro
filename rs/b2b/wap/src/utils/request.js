import axios from 'axios'
import store from '../store'
import Cookies from 'js-cookie'
// import { getToken } from '@/utils/auth'
// import { showFullScreenLoading, tryHideFullScreenLoading } from '@/utils/loading'
import { Indicator, Toast } from 'mint-ui'
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
  Indicator.open({
    text: '加载中...',
    spinnerType: 'snake'
  })
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
    // setTimeout(()=>{
    //   Indicator.close()
    // },1000)
    Indicator.close()
    const res = response.data
    if (res.code !== 200) {
      const msg = res.msg ? res.msg : res.message
      Toast({
        message: msg,
        duration: 2 * 1000
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
    Indicator.close()
    if (err.request) {
      switch (err.request.status) {
        case 0:
        case 401:
          let hasLogin = Cookies.get('WPH_USER_LOGIN')
          if(hasLogin !== undefined && hasLogin !== null){ // 已经登陆
            console.log('0')
            Toast({
              message: err.message,
              duration: 2 * 1000
            })
          }else{
            Toast({
              message: '请先登陆',
              duration: 2 * 1000
            })
            router.push({path:'/login',query:{ Rurl: router.fullPath}})
          }
          break
        case 403:
          console.log('403')
        case 404:
          console.log('404')
        case 405:
          console.log('405')
        case 500:
          Toast({
            message: err.message,
            duration: 2 * 1000
          })
          break
        default:
        Toast({
          message: err.message,
          duration: 2 * 1000
        })
        break
      }
    }
    console.log(err.request)// for debug
    return Promise.reject(err)
  }
)

export default service
