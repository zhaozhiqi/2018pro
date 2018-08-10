import request from '@/utils/request'
/* 前台接口 */

// export const defaultQuery = {
//   'dateType': 'YESTERDAY',
//   'date': null,
//   'device': 'ALL'
// }

const baseApi = 'http://demo.lbsrj.cn/m-api/'
/* 首页 获取数据 */
export function getHome() {
  return request({
    url: baseApi+'home/get',
    method: 'get'
  })
}
/* 商品分类 */
export function getClassifyList(params) {
  return request({
    url: baseApi+'classify/list',
    method: 'get',
    params
  })
}
/* 商品 */
export function getGoodsList(params) {
  return request({
    url: baseApi+'list',
    method: 'get',
    params
  })
}

export function getGoods(params) {
  return request({
    url: baseApi+'get',
    method: 'get',
    params
  })
}