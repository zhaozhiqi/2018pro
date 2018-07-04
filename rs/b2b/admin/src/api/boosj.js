import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/boosj/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle(id) {
  return request({
    url: '/boosj/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/boosj/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/boosj/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/boosj/update',
    method: 'post',
    data
  })
}
