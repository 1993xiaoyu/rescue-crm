import net from './request'

const baseURL = '//test.forjhntech.online/api'

export function userLogin(params) {
  return net.post(`${baseURL}/login`, params)
}

export function getMenu(params) {
  return net.post(`${baseURL}/system/menu/allLis`, params)
}
