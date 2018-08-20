import request from '@/utils/request'
/* index */

export const defaultQuery = {
  'dateType': 'YESTERDAY',
  'date': null,
  'device': 'ALL'
}

export function getEditorsSyntheticRankingData(params) {
  return request({
    url: '/dataStatistic/get/editorsSyntheticRankingData',
    method: 'get',
    params
  })
}

export function getEditorsFlowRankingData(params) {
  return request({
    url: '/dataStatistic/get/editorsFlowRankingData',
    method: 'get',
    params
  })
}

export function getAuditChannel(params) {
  return request({
    url: '/auditing/channel/get',
    method: 'get',
    params
  })
}

export function getUploadChannel(params) {
  return request({
    url: '/upload/channel/get',
    method: 'get',
    params
  })
}
export function getAudit(params) {
  return request({
    url: '/auditing/get',
    method: 'get',
    params
  })
}

export function getUpload(params) {
  return request({
    url: '/upload/get',
    method: 'get',
    params
  })
}

export function getCommonSyntheticData(params) {
  return request({
    url: '/dataStatistic/get/syntheticData',
    method: 'get',
    params
  })
}

export function getCommonPageDetail(params) {
  return request({
    url: '/dataStatistic/commonPageDetail',
    method: 'get',
    params
  })
}

export function getDeviceFlowDetail(params) {
  return request({
    url: '/dataStatistic/get/deviceFlow',
    method: 'get',
    params
  })
}

export function getCommonPie(params) {
  return request({
    url: '/dataStatistic/commonPie',
    method: 'get',
    params
  })
}

export function getDevicePie(params) {
  return request({
    url: '/dataStatistic/devicePie',
    method: 'get',
    params
  })
}

export function getCommonLine(params) {
  return request({
    url: '/dataStatistic/get/line',
    method: 'get',
    params
  })
}

export function getDeviceLine(params) {
  return request({
    url: '/dataStatistic/get/deviceLine',
    method: 'get',
    params
  })
}

export function getAuditLine(params) {
  return request({
    url: '/auditing/get/line',
    method: 'get',
    params
  })
}

export function getUploadLine(params) {
  return request({
    url: '/upload/get/line',
    method: 'get',
    params
  })
}

