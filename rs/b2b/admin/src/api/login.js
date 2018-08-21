import request from '@/utils/request'
const baseApi = 'http://demo.lbsrj.cn/a-api/'

export function loginByUsername(username, password) {
  const params = {
    username,
    password
  }
  // return request({
  //   url: baseApi + 'login',
  //   method: 'get',
  //   params
  // })
  return new Promise(function(resolve, reject) {
    const response = {
      data: {
        token: ''
      }
    }
    switch (username) {
      case 'admin': response.data.token = 'admin'
        break
      case 'shop': response.data.token = 'shop'
        break
      case 'manufacturer': response.data.token = 'manufacturer'
        break
      default: response.data.token = 'admin'
        break
    }
    resolve(response)
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

