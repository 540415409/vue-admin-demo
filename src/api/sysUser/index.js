import request from '@/axios/'

const pref = '/sysUser'

export const login = (data) => {
  return request.post('/api/login', data)
}

export const getInfo = (token) => {
  return request.get('/api/info', token)
}

export const logout = () => {
  return request.get('/api/logout')
}