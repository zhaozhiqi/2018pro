import request from '@/utils/request'
const baseApi = 'http://demo.aooooz.com/a-api/'

export function loginByUsername(username, password) {
  const params = {
    account: username,
    password
  }
  return request({
    url: baseApi + 'login',
    method: 'post',
    params
  })
  // return new Promise(function(resolve, reject) {
  //   const response = {
  //     data: {
  //       token: ''
  //     }
  //   }
  //   switch (username) {
  //     case 'admin': response.data.token = 'admin'
  //       break
  //     case 'shop': response.data.token = 'shop'
  //       break
  //     case 'manufacturer': response.data.token = 'manufacturer'
  //       break
  //     default: response.data.token = 'admin'
  //       break
  //   }
  //   resolve(response)
  // })
}

export function logout() {
  return request({
    url: baseApi + 'logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: baseApi + 'user/get',
    method: 'get'
  })
}

