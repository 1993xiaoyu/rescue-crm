import net from './request'

const baseURL = '//test.forjhntech.online/api'

// 学历
export function getQualification(params) {
  return net.post(`${baseURL}/system/enumeration/qualification`, params)
}

// 医院
export function getHospital(params) {
  return net.post(`${baseURL}/system/enumeration/hospital`, params)
}

// 科室
export function getDepartment(params) {
  return net.post(`${baseURL}/system/enumeration/department`, params)
}

//职称
export function getTitle(params) {
  return net.post(`${baseURL}/system/enumeration/title`, params)
}

//运营性质
export function getManagement(params) {
  return net.post(`${baseURL}/system/enumeration/management`, params)
}
