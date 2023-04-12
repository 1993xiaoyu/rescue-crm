import net from './request'

const baseURL = '//test.forjhntech.online/api'

export function getEventList(params) {
  return net.post(`${baseURL}/cockpit/eventList`, params)
}

export function getEventDetails(params) {
  return net.post(`${baseURL}/cockpit/eventDetails`, params)
}

export function getEventStatistics(params) {
  return net.post(`${baseURL}/cockpit/eventStatistics`, params)
}

export function getAedStatisticss(params) {
  return net.post(`${baseURL}/cockpit/aedStatistics`, params)
}

export function getVolunteerStatistics(params) {
  return net.post(`${baseURL}/cockpit/volunteerStatistics`, params)
}

export function getStatusList(params) {
  return net.post(`${baseURL}/cockpit/statusList`, params)
}

export function getVolunteerThermodynamics(params) {
  return net.post(`${baseURL}/cockpit/volunteerThermodynamics`, params)
}

const mockBaseURL = 'https://www.fastmock.site/mock/7de9bff710a909df77374614ab83ac91/api'
export function getCensusVoluteer(params) {
  return net.get(`${mockBaseURL}/census/voluteer`, params)
}

export function getCensusAed(params) {
  return net.get(`${mockBaseURL}/cockpit/aedStatistics`, params)
}

export function getCensusDuty(params) {
  return net.get(`${mockBaseURL}/census/duty`, params)
}

export function getCensusDoctor(params) {
  return net.get(`${mockBaseURL}/census/doctor`, params)
}

export function getCensusWaring(params) {
  return net.get(`${mockBaseURL}/census/waring`, params)
}

export function getCensusAbnormal(params) {
  return net.get(`${mockBaseURL}/census/abnormal`, params)
}

export function getCensusRespond(params) {
  return net.get(`${mockBaseURL}/census/respond`, params)
}

export function getCensuResponseTime(params) {
  return net.get(`${mockBaseURL}/census/response-time`, params)
}

export function getCensuDisease(params) {
  return net.get(`${mockBaseURL}/census/disease`, params)
}

export function saveJcInfo(params) {
  return net.post('/api/saveJcInfo', params)
}
