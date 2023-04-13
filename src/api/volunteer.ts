import net from './request'

const baseURL = '//test.forjhntech.online/api'

export function volunteerAdd(params) {
  return net.post(`${baseURL}/system/volunteer/add`, params)
}

export function volunteerEdit(params) {
  return net.post(`${baseURL}/system/volunteer/edit`, params)
}
export function volunteerList(params) {
  return net.post(`${baseURL}/system/volunteer/list`, params)
}

export function volunteerRemove(params) {
  return net.post(`${baseURL}/system/volunteer/remove`, params)
}

// 志愿者导入模板下载
export function importTemplate(params) {
  return net.get(`${baseURL}/system/volunteer/importTemplate`, params)
}

// 志愿者导入模板导入
export function importData(params) {
  return net.post(`${baseURL}/system/volunteer/importData`, params)
}

// 导出
export function exportData(params) {
  return net.post(`${baseURL}/system/volunteer/export`, params)
}
