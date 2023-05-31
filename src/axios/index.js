import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/cookie'

const error = '操作失败，请稍后再试';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  }
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['x-token'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data

    if (res.code !== 200) {
      Message({
        message: error,
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 41000 || res.code === 512 || res.code === 514) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout', {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(error))
    } else {
      return res
    }
  },
  error => {
    Message({
      message: error,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service;
