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

/**
 * 商品 
 * 
 * 商品列表
 * 商品详情
*/

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

/**
 * 拼团 
 * 
 * 开团/参团
 * 根据拼团ID获取拼团实例列表
 * 店铺拼团信息列表
*/

export function getGroupAdd(params) {
  return request({
    url: baseApi+'shop/groupPurchase/add',
    method: 'post',
    params
  })
}

export function getGroupCaseList(params) {
  return request({
    url: baseApi+'shop/groupPurchase/case/list',
    method: 'get',
    params
  })
}

export function getGroupsList(params) {
  return request({
    url: baseApi+'shop/groupPurchase/list',
    method: 'get',
    params
  })
}

/**
 * 登录 
 * 
 * 登录
*/

export function login(params) {
  return request({
    url: baseApi+'login',
    method: 'get',
    params
  })
}

/**
 * 注册 
 * 
 * 入驻
 * 消费者注册
*/

export function storeRegister(params) {
  return request({
    url: baseApi+'business/enter',
    method: 'post',
    params
  })
}

export function register(params) {
  return request({
    url: baseApi+'register',
    method: 'post',
    params
  })
}

/**
 * 店铺相关 
 * 
 * 获取店铺分类列表
 * 获取店铺详情
 * 获取店铺详情列表
*/

export function getShopClassList(params) {
  return request({
    url: baseApi+'shop/classify/list',
    method: 'get',
    params
  })
}

export function getShop(params) {
  return request({
    url: baseApi+'shop/get',
    method: 'get',
    params
  })
}

export function getShopList(params) {
  return request({
    url: baseApi+'shop/list',
    method: 'get',
    params
  })
}

