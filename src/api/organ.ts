import net from './request'

const baseURL = '//test.forjhntech.online/api'

export function mechanismAdd(params) {
  return net.post(`${baseURL}/system/mechanism/add`, params)
}

export function mechanismEdit(params) {
  return net.post(`${baseURL}/system/mechanism/edit`, params)
}
export function mechanismList(params) {
  return net.post(`${baseURL}/system/mechanism/list`, params)
}

export function mechanismRemove(params) {
  return net.post(`${baseURL}/system/mechanism/remove`, params)
}

// 志愿者导入模板下载
export function importTemplate(params) {
  return net.get(`${baseURL}/system/mechanism/importTemplate`, params)
}

// 志愿者导入模板导入
export function importData(params) {
  return net.post(`${baseURL}/system/mechanism/importData`, params)
}

// 导出
export function exportData(params) {
  return net.post(`${baseURL}/system/mechanism/export`, params)
}
