import request from '@/utils/request'
/* 通用接口 */

// export const defaultQuery = {
//   'dateType': 'YESTERDAY',
//   'date': null,
//   'device': 'ALL'
// }

const baseApi = 'http://demo.lbsrj.cn/c-api/'

/* 获取省市区列表 */
export function getAreaList(params) {
  return request({
    url: baseApi+'area/list',
    method: 'get',
    params
  })
}

/* 图片上传 */
export function getImageUpload(params) {
  return request({
    url: baseApi+'image/upload',
    method: 'post',
    params
  })
}

/**
 * 验证码相关
 * 
 * 获取图片验证码
 * 获取手机验证码
*/

export function getImageCode() {
  return request({
    url: baseApi+'image/code/get',
    method: 'get'
  })
}

export function getMobileCode(params) {
  return request({
    url: baseApi+'mobile/code/get',
    method: 'get',
    params
  })
}
