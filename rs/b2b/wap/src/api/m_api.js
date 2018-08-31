import request from '@/utils/request'
/* 前台接口 */

// export const defaultQuery = {
//   'dateType': 'YESTERDAY',
//   'date': null,
//   'device': 'ALL'
// }

const baseApi = 'http://demo.aooooz.com/m-api/'
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
 * 购物车 
 * 
 * 保存购物车结算
 * 删除购物车商品
 * 获取购物车信息
 * 获取购物车结算商品信息
 * 添加购物车
*/

export function saveCartBalance(params) {
  return request({
    url: baseApi+'cart/balance',
    method: 'post',
    params
  })
}

export function delCart(params) {
  return request({
    url: baseApi+'cart/del',
    method: 'post',
    params
  })
}

export function getCart() {
  return request({
    url: baseApi+'cart/get',
    method: 'get'
  })
}

export function getCartBalance(params) {
  return request({
    url: baseApi+'cart/get/balance',
    method: 'get',
    params
  })
}

export function cartSave(params) {
  return request({
    url: baseApi+'cart/save',
    method: 'post',
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
 * 填充拼团结算商品信息
 * 获取拼团结算商品信息
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

export function setGroupCaseInfo(params) {
  return request({
    url: baseApi+'shop/groupPurchase/balance',
    method: 'post',
    params
  })
}

export function getGroupCaseInfo() {
  return request({
    url: baseApi+'shop/groupPurchase/get/balance',
    method: 'get'
  })
}

/**
 * 登录 
 * 
 * 登录
 * 登出
*/

export function login(params) {
  return request({
    url: baseApi+'login',
    method: 'post',
    params
  })
}

export function loginOut() {
  return request({
    url: baseApi+'logout',
    method: 'post'
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

export function adminRegister(params) {
  return request({
    url: baseApi+'register',
    method: 'post',
    params
  })
}

/**
 * 消息相关 
 * 
 * 获取消息详情
 * 获取消息列表
*/

export function getNotice(arg) {
  const params = {
    id:arg
  }
  return request({
    url: baseApi+'notice/get',
    method: 'get',
    params
  })
}

export function getNoticeList(params) {
  return request({
    url: baseApi+'notice/list',
    method: 'get',
    params
  })
}

/**
 * 订单相关 
 * 
 * 取消订单
 * 确认订单
 * 创建订单
 * 获取订单详情
 * 获取订单数量
 * 获取订单列表
 * 申请退款
 * 获取店铺订单详情
 * 获取店铺订单列表
*/


export function cancelOrder(arg) {
  const params = {
    orderNo : arg
  }
  return request({
    url: baseApi+'order/cancel',
    method: 'post',
    params
  })
}

export function confirmedOrder(arg) {
  const params = {
    orderNo : arg
  }
  return request({
    url: baseApi+'order/confirmed',
    method: 'post',
    params
  })
}

export function createOrder(params) {
  return request({
    url: baseApi+'order/create',
    method: 'post',
    params
  })
}

export function getOrder(params) {
  return request({
    url: baseApi+'order/get',
    method: 'get',
    params
  })
}

export function getOrderCount() {
  return request({
    url: baseApi+'order/get/count',
    method: 'get'
  })
}

export function getOrderList(params) {
  return request({
    url: baseApi+'order/list',
    method: 'get',
    params
  })
}

export function refundOrder(arg) {
  const params = {
    orderNo:arg
  }  
  return request({
    url: baseApi+'order/refund',
    method: 'post',
    params
  })
}

export function getShopOrder(params) {
  return request({
    url: baseApi+'order/shop/get',
    method: 'get',
    params
  })
}

export function getShopOrderlist(params) {
  return request({
    url: baseApi+'order/shop/list',
    method: 'get',
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

/**
 * 收货地址 
 * 
 * 删除收货地址
 * 获取收货地址
 * 获取收货地址列表
 * 新增收货地址
 * 修改收货地址
*/

export function delAddress(arg) {
  const params = {
    id: arg
  }
  return request({
    url: baseApi+'address/del',
    method: 'post',
    params
  })
}

export function getAddress(arg) {
  const params = {
    id: arg
  }
  return request({
    url: baseApi+'address/get',
    method: 'get',
    params
  })
}

export function getAddressList() {
  return request({
    url: baseApi+'address/list',
    method: 'get'
  })
}

export function addAddress(params) {
  return request({
    url: baseApi+'address/save',
    method: 'post',
    params
  })
}

export function updateAddress(params) {
  return request({
    url: baseApi+'address/update',
    method: 'post',
    params
  })
}

/**
 * 用户信息相关
 * 
 * 获取用户信息
 * 重置密码
*/

export function getUserInfo() {
  return request({
    url: baseApi+'user/get',
    method: 'get'
  })
}

export function postUserResetPassword(oldPassword,newPassword) {
  const params = {
    oldPassword,
    newPassword
  }
  return request({
    url: baseApi+'user/reset/password',
    method: 'post',
    params
  })
}
