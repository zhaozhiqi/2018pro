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
 * 产品相关接口
 *
 * 审核产品
 * 获取产品详情
 * 获取产品详情
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

export function getProductByCode(params) {
  return request({
    url: baseApi + 'product/getByCode',
    method: 'get',
    params
  })
}

export function getProductById(params) {
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
    url: baseApi + 'product/asve',
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
 * 店铺相关
 *
 * 删除店铺banner列表
 * 获取店铺banner列表
 * 新增店铺banner
 * 更新店铺banner
 * 更新店铺banner列表排序
 * 删除店铺分类
 * 获取店铺分类列表
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

export function postShopBannerDel(params) {
  return request({
    url: baseApi + 'shop/banner/del',
    method: 'post',
    params
  })
}

export function getShopBannerList(params) {
  return request({
    url: baseApi + 'shop/banner/list',
    method: 'get',
    params
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

export function postShopClassifyDel(params) {
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

export function postShopCustomerServiceDel(params) {
  return request({
    url: baseApi + 'shop/customerService/del',
    method: 'post',
    params
  })
}

export function getShopCustomerServiceList(params) {
  return request({
    url: baseApi + 'shop/customerService/list',
    method: 'get',
    params
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

export function getShopGroupGet(params) {
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
