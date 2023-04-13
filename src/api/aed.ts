// 封装一些用的API，不用把URL写在页面中，直接调用即可
import net from './request'

const baseURL = '//test.forjhntech.online/api'
export function aedAdd(params) {
  return net.post(`${baseURL}/system/aed/add`, params)
}

export function aedEdit(params) {
  return net.post(`${baseURL}/system/aed/edit`, params)
}
export function aedList(params) {
  return net.post(`${baseURL}/system/aed/list`, params)
}

export function aedQuantity(params) {
  return net.post(`${baseURL}/system/aed/quantity`, params)
}

export function aedRemove(params) {
  return net.post(`${baseURL}/system/aed/remove`, params)
}

// 志愿者导入模板下载
export function importTemplate(params) {
  return net.get(`${baseURL}/system/aed/importTemplate`, params)
}

// 志愿者导入模板导入
export function importData(params) {
  return net.post(`${baseURL}/system/aed/importData`, params)
}

// 导出
export function exportData(params) {
  return net.post(`${baseURL}/system/aed/export`, params)
}
