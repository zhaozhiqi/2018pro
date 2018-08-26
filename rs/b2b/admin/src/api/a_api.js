import request from '@/utils/request'
/* 后台接口 */

// export const defaultQuery = {
//   'dateType': 'YESTERDAY',
//   'date': null,
//   'device': 'ALL'
// }

const baseApi = 'http://demo.lbsrj.cn/a-api/'

/**
 * 入驻审核相关接口
 *
 * 审核商家入驻信息
 * 获取商家入驻信息
 * 获取商家入驻信息列表
*/
export function postBusinessEnterAudit(params) {
  return request({
    url: baseApi + 'bussiness/enter/auditing/auditing',
    method: 'post',
    params
  })
}

export function getBusinessEnterAudit(id) {
  const params = {
    id: id
  }
  return request({
    url: baseApi + 'bussiness/enter/auditing/get',
    method: 'get',
    params
  })
}

export function getBusinessEnterAuditList(params) {
  return request({
    url: baseApi + 'bussiness/enter/auditing/list',
    method: 'get',
    params
  })
}

/**
 * 商品分类相关接口
 *
 * 获取全部分类列表
 * 删除分类
 * 获取分类列表
 * 新增分类列表
 * 更新分类信息
*/
export function getClassifyAllList(params) {
  return request({
    url: baseApi + 'classify/listVo',
    method: 'get',
    params
  })
}

export function postClassifyDel(id) {
  const params = {
    id: id
  }
  return request({
    url: baseApi + 'classify/del',
    method: 'post',
    params
  })
}

export function getClassifyList(params) {
  return request({
    url: baseApi + 'classify/list',
    method: 'get',
    params
  })
}

export function postClassifySave(params) {
  return request({
    url: baseApi + 'classify/save',
    method: 'post',
    params
  })
}

export function postClassifyUpdate(params) {
  return request({
    url: baseApi + 'classify/update',
    method: 'post',
    params
  })
}

/**
 * 商品相关
 *
 * 获取所有店铺商品列表
 * 删除店铺商品
 * 修改店铺商品
 * 获取店铺商品列表
 * 新增店铺商品
 */

export function getGoodsList(params) {
  return request({
    url: baseApi + 'all/list',
    method: 'get',
    params
  })
}

export function postBatchDel(params) {
  return request({
    url: baseApi + 'batch/del',
    method: 'post',
    params
  })
}

export function postBatchUpdata(params) {
  return request({
    url: baseApi + 'batch/update',
    method: 'post',
    params
  })
}

export function getStoreGoodsList(params) {
  return request({
    url: baseApi + 'list',
    method: 'get',
    params
  })
}

export function postBatchSave(params) {
  return request({
    url: baseApi + 'save',
    method: 'post',
    params
  })
}

/**
 * 首页Banner相关
 *
 * 删除首页banner
 * 获取首页banner列表
 * 新增首页banner
 * 更新首页banner信息
 * 更新首页banner列表排序
*/

export function postHomeBannerDel(id) {
  const params = {
    id: id
  }
  return request({
    url: baseApi + 'home/banner/del',
    method: 'post',
    params
  })
}

export function getHomeBannerList() {
  return request({
    url: baseApi + '/home/banner/list',
    method: 'get'
  })
}

export function postHomeBannerSave(params) {
  return request({
    url: baseApi + 'home/banner/save',
    method: 'post',
    params
  })
}

export function postHomeBannerUpdateInfo(params) {
  return request({
    url: baseApi + 'home/banner/updateInfo',
    method: 'post',
    params
  })
}

export function postHomeBannerUpdateSort(params) {
  return request({
    url: baseApi + 'home/banner/updateSort',
    method: 'post',
    params
  })
}

/**
 * 首页头条相关
 *
 * 删除首页头条
 * 获取首页头条列表
 * 新增首页头条
 * 更新首页头条信息
 * 更新首页头条列表排序
*/

export function postHomeHeadlineDel(id) {
  const params = {
    id: id
  }
  return request({
    url: baseApi + 'home/headline/del',
    method: 'post',
    params
  })
}

export function getHomeHeadlineList() {
  return request({
    url: baseApi + '/home/headline/list',
    method: 'get'
  })
}

export function postHomeHeadlineSave(params) {
  return request({
    url: baseApi + 'home/headline/save',
    method: 'post',
    params
  })
}

export function postHomeHeadlineUpdateInfo(params) {
  return request({
    url: baseApi + 'home/headline/updateInfo',
    method: 'post',
    params
  })
}

export function postHomeHeadlineUpdateSort(params) {
  return request({
    url: baseApi + 'home/headline/updateSort',
    method: 'post',
    params
  })
}

/**
 * 订单相关
 *
 * 确认发货
 * 确认退款
 * 获取店铺订单详情
 * 获取店铺订单列表
*/

export function postOrderDelivery(params) {
  return request({
    url: baseApi + 'order/delicery',
    method: 'post',
    params
  })
}

export function postOrderRedund(orderNo) {
  const params = {
    orderNo: orderNo
  }
  return request({
    url: baseApi + 'order/refund',
    method: 'post',
    params
  })
}

export function getShopOrder(orderNo) {
  const params = {
    orderNo: orderNo
  }
  return request({
    url: baseApi + 'order/shop/get',
    method: 'get',
    params
  })
}

export function getShopOrderList(params) {
  return request({
    url: baseApi + 'order/shop/list',
    method: 'get',
    params
  })
}

/**
 * 产品授权信息相关
 *
 * 获取产品授权信息列表（all）
 * 获取产品授权信息列表
 * 审核授权信息
 * 提交授权信息
*/

export function getAuthorizeInfoAllList(params) {
  return request({
    url: baseApi + 'product/authorizeInfo/all/list',
    method: 'get',
    params
  })
}

export function getAuthorizeInfoList(params) {
  return request({
    url: baseApi + 'product/authorizeInfo/list',
    method: 'get',
    params
  })
}

export function postAuthorizeInfoAudit(params) {
  return request({
    url: baseApi + 'product/authorizeInfo/auditing',
    method: 'post',
    params
  })
}

export function postAuthorizeInfoSubmit(params) {
  return request({
    url: baseApi + 'product/authorizeInfo/submit',
    method: 'post',
    params
  })
}

/**
 * 产品相关接口
 *
 * 审核产品
 * 获取产品详情(byCode)
 * 获取产品详情(byId)
 * 获取产品列表
 * 新增产品
 * 更新产品详情
*/

export function postProductAudit(params) {
  return request({
    url: baseApi + 'product/auditing',
    method: 'post',
    params
  })
}

export function getProductByCode(code) {
  const params = {
    code: code
  }
  return request({
    url: baseApi + 'product/getByCode',
    method: 'get',
    params
  })
}

export function getProductById(id) {
  const params = {
    id: id
  }
  return request({
    url: baseApi + 'product/getById',
    method: 'get',
    params
  })
}

export function getProductList(params) {
  return request({
    url: baseApi + 'product/list',
    method: 'get',
    params
  })
}

export function postProductSave(params) {
  return request({
    url: baseApi + 'product/save',
    method: 'post',
    params
  })
}

export function postProductUpdate(params) {
  return request({
    url: baseApi + 'product/update',
    method: 'post',
    params
  })
}

/**
 * 系统设置相关
 *
 * 获取设置信息
 * 设置未支付订单自动关闭时长
 * 设置未确认订单自动确认时长
 * 设置用户确认收货转账至商户时长（影响用户退款，转账后用户将无法在平台进行退款需联系商户处理）
 * 设置B2C用户商品范围
 * 设置拼团优惠比例
 * 设置订单扣点比例
*/

export function getSetting() {
  return request({
    url: baseApi + 'setting/get',
    method: 'get'
  })
}

export function postSetAutoCancelOrderTime(arg) {
  const params = {
    time: arg
  }
  return request({
    url: baseApi + 'setting/setAutoCancelOrderTime',
    method: 'post',
    params
  })
}

export function postSetAutoConfirmedOrderTime(arg) {
  const params = {
    time: arg
  }
  return request({
    url: baseApi + 'setting/setAutoConfirmedOrderTime',
    method: 'post',
    params
  })
}

export function postSetAutoTransferAccountsTime(arg) {
  const params = {
    time: arg
  }
  return request({
    url: baseApi + 'setting/setAutoTransferAccountsTime',
    method: 'post',
    params
  })
}

export function postSetB2CGoodsRange(arg) {
  const params = {
    range: arg
  }
  return request({
    url: baseApi + 'setting/setB2CGoodsRange',
    method: 'post',
    params
  })
}

export function postSetGroupPurchasePreferentialRatio(arg) {
  const params = {
    ratio: arg
  }
  return request({
    url: baseApi + 'setting/setGroupPurchasePreferentialRatio',
    method: 'post',
    params
  })
}

export function postSetOrderDeductionsRatio(arg) {
  const params = {
    ratio: arg
  }
  return request({
    url: baseApi + 'setting/setOrderDeductionsRatio',
    method: 'post',
    params
  })
}

/**
 * 店铺相关
 *
 * 删除店铺banner列表
 * 获取店铺banner列表
 * 新增店铺banner
 * 更新店铺banner
 * 更新店铺banner列表排序
 * 删除店铺分类
 * 获取店铺分类列表
 * 获取店铺分类列表All
 * 新增店铺分类
 * 更新店铺分类
 * 删除客服信息
 * 获取客服列表
 * 新增客服信息
 * 更新客服信息
 * 获取店铺详情
 * 获取店铺列表
 * 获取店铺可销售区域列表
 *
*/

export function postShopBannerDel(arg) {
  const params = {
    id: arg
  }
  return request({
    url: baseApi + 'shop/banner/del',
    method: 'post',
    params
  })
}

export function getShopBannerList() {
  return request({
    url: baseApi + 'shop/banner/list',
    method: 'get'
  })
}

export function postShopBannerSave(params) {
  return request({
    url: baseApi + 'shop/banner/save',
    method: 'post',
    params
  })
}

export function postShopBannerUpdateInfo(params) {
  return request({
    url: baseApi + 'shop/banner/updateInfo',
    method: 'post',
    params
  })
}

export function postShopBannerUpdateSort(params) {
  return request({
    url: baseApi + 'shop/banner/updateSort',
    method: 'post',
    params
  })
}

export function postShopClassifyDel(arg) {
  const params = {
    id: arg
  }
  return request({
    url: baseApi + 'shop/classify/del',
    method: 'post',
    params
  })
}

export function getShopClassifyList(params) {
  return request({
    url: baseApi + 'shop/classify/list',
    method: 'get',
    params
  })
}

export function getShopClassifyAllList(params) {
  return request({
    url: baseApi + 'shop/classify/listVo',
    method: 'get',
    params
  })
}

export function postShopClassifySave(params) {
  return request({
    url: baseApi + 'shop/classify/save',
    method: 'post',
    params
  })
}

export function postShopClassifyUpdate(params) {
  return request({
    url: baseApi + 'shop/classify/update',
    method: 'post',
    params
  })
}

export function postShopCustomerServiceDel(arg) {
  const params = {
    id: arg
  }
  return request({
    url: baseApi + 'shop/customerService/del',
    method: 'post',
    params
  })
}

export function getShopCustomerServiceList() {
  return request({
    url: baseApi + 'shop/customerService/list',
    method: 'get'
  })
}

export function postShopCustomerServiceSave(params) {
  return request({
    url: baseApi + 'shop/customerService/save',
    method: 'post',
    params
  })
}

export function postShopCustomerServiceUpdate(params) {
  return request({
    url: baseApi + 'shop/customerService/update',
    method: 'post',
    params
  })
}

export function getShop() {
  return request({
    url: baseApi + 'shop/get',
    method: 'get'
  })
}

export function getShopList(params) {
  return request({
    url: baseApi + 'shop/list',
    method: 'get',
    params
  })
}

export function getShopSalesAreaList() {
  return request({
    url: baseApi + 'shop/salesArea/list',
    method: 'get'
  })
}

/**
 * 拼团相关
 *
 * 获取所有拼团信息
 * 更新店铺拼团上线状态
 * 根据拼团ID获取具体拼团实例列表
 * 获取店铺拼团信息
 * 店铺拼团列表
 * 创建店铺拼团信息
*/

export function getShopGroupAllList(params) {
  return request({
    url: baseApi + 'shop/groupPurchase/all/list',
    method: 'get',
    params
  })
}

export function postShopGroupUpdateOnlineState(params) {
  return request({
    url: baseApi + 'shop/groupPurchase/batch/update/onlineState',
    method: 'post',
    params
  })
}

export function getShopGroupCaseList(params) {
  return request({
    url: baseApi + 'shop/groupPurchase/case/list',
    method: 'get',
    params
  })
}

export function getShopGroupGet(arg) {
  const params = {
    id: arg
  }
  return request({
    url: baseApi + 'shop/groupPurchase/get',
    method: 'get',
    params
  })
}

export function getShopGroupList(params) {
  return request({
    url: baseApi + 'shop/groupPurchase/list',
    method: 'get',
    params
  })
}

export function postShopGroupSave(params) {
  return request({
    url: baseApi + 'shop/groupPurchase/save',
    method: 'post',
    params
  })
}

/**
 * 余额相关
 *
 * 获取当前用户的余额
 * 商家余额列表
 * 获取当前用户的扣点纪录
 * 获取当前用户的充值记录
 * 根据店铺ID查询扣点纪录
 * 根据店铺ID查询充值记录
*/

export function getUserBalance() {
  return request({
    url: baseApi + 'user/balance/get',
    method: 'get'
  })
}

export function getUserBalanceList(params) {
  return request({
    url: baseApi + 'user/balance/list',
    method: 'get',
    params
  })
}

export function getUserBalanceListDeductions(params) {
  return request({
    url: baseApi + 'user/balance/list/deductions/record',
    method: 'get',
    params
  })
}

export function getUserBalanceListRecharge(params) {
  return request({
    url: baseApi + 'user/balance/list/recharge/record',
    method: 'get',
    params
  })
}

export function getUserBalanceShopListDeductions(params) {
  return request({
    url: baseApi + 'user/balance/list/shop/deductions/record',
    method: 'get',
    params
  })
}

export function getUserBalanceShopListRecharge(params) {
  return request({
    url: baseApi + 'user/balance/list/shop/recharge/record',
    method: 'get',
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
    url: baseApi + 'user/get',
    method: 'get'
  })
}

export function postUserResetPassword(oldPassword, newPassword) {
  const params = {
    oldPassword,
    newPassword
  }
  return request({
    url: baseApi + 'reset/password',
    method: 'post',
    params
  })
}
