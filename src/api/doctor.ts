import net from './request'

const baseURL = '//test.forjhntech.online/api'

export function tutorAdd(params) {
  return net.post(`${baseURL}/system/tutor/add`, params)
}

export function tutorEdit(params) {
  return net.post(`${baseURL}/system/tutor/edit`, params)
}
export function tutorList(params) {
  return net.post(`${baseURL}/system/tutor/list`, params)
}

export function tutorRemove(params) {
  return net.post(`${baseURL}/system/tutor/remove`, params)
}

// 志愿者导入模板下载
export function importTemplate(params) {
  return net.get(`${baseURL}/system/tutor/importTemplate`, params)
}

// 志愿者导入模板导入
export function importData(params) {
  return net.post(`${baseURL}/system/tutor/importData`, params)
}

// 导出
export function exportData(params) {
  return net.post(`${baseURL}/system/tutor/export`, params)
}
