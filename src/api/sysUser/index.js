import request from '@/axios/'

const pref = '/sysUser'

export const login = (data) => {
  return request.post(pref + '/login', data)
}

export const getInfo = (token) => {
  return request.get(pref + '/info', token)
}