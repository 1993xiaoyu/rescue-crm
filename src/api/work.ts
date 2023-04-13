// 封装一些用的API，不用把URL写在页面中，直接调用即可
import net from './request'

const baseURL = '//test.forjhntech.online/api'

export function userAdd(params) {
  return net.post(`${baseURL}/system/user/add`, params)
}

export function userEdit(params) {
  return net.post(`${baseURL}/system/user/edit`, params)
}

export function userList(params) {
  return net.post(`${baseURL}/system/user/list`, params)
}

export function userRemove(params) {
  return net.post(`${baseURL}/system/user/remove`, params)
}

export function operlogList(params) {
  return net.post(`${baseURL}/monitor/operlog/list`, params)
}

// 导入模板下载
export function importTemplate(params) {
  return net.get(`${baseURL}/system/user/importTemplate`, params)
}

// 导入模板导入
export function importData(params) {
  return net.post(`${baseURL}/system/user/importData`, params)
}

// 导出
export function exportData(params) {
  return net.post(`${baseURL}/system/user/export`, params)
}

// 导入模板下载
export function download(params) {
  return net.get(`${baseURL}/common/download`, params)
}

export function roleAdd(params) {
  return net.post(`${baseURL}/system/role/add`, params)
}

export function roleEdit(params) {
  return net.post(`${baseURL}/system/role/edit`, params)
}
export function roleList(params) {
  return net.post(`${baseURL}/system/role/list`, params)
}

export function roleRemove(params) {
  return net.post(`${baseURL}/system/role/remove`, params)
}

const mockBaseURL = 'https://www.fastmock.site/mock/7de9bff710a909df77374614ab83ac91/api'
export function getCensusVoluteer(params) {
  return net.get(`${mockBaseURL}/census/voluteer`, params)
}
