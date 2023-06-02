import Vue from 'vue'
import Vuex from 'vuex'
import { resetRouter, constantRoutes, asyncRoutes } from '@/router'
import { login, logout, getInfo } from '@/api/sysUser'
import { filterAsyncRoutes } from '@/utils/';
import { getToken, setToken, removeToken } from '@/cookie'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userToken: getToken(),
    userId: '',
    userName: '',
    userRoles: [],
    routes: [],
    addRoutes: []
  },

  getters: {

    getUserToken(state) {
      return state.userToken;
    },

    getUserRoles(state) {
      return state.userRoles;
    },

    getRoutes(state) {
      return state.routes
    },
  },

  mutations: {
    /**** 同步操作 ****/
    setUserToken(state, userToken) {
      state.userToken = userToken;
    },
    setUserInfo(state, userInfo) {
      state.userId = userInfo.userId;
      state.userName = userInfo.userName;
      state.userRoles = userInfo.userRoles;
    },
    setRoutes(state, routes) {
      state.routes = routes;
      state.addRoutes = constantRoutes.concat(routes);
    },
  },
  actions: {
    /*** 异步操作 ***/
    dologin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          commit('setUserToken', response.data)
          setToken(response.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    dologout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          removeToken()
          resetRouter()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          if (!response.data) {
            reject('Verification failed, please Login again.')
          }
          commit('setUserInfo', response.data)
          resolve(response.data);
        }).catch(error => {
          reject(error)
        })
      })
    },
    generateRoutes({ commit }, roles) {
      return new Promise(resolve => {
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        commit('setRoutes', accessedRoutes)
        resolve(accessedRoutes)
      })
    },
    resetToken({ commit }) {
      return new Promise(resolve => {
        removeToken()
        resolve()
      })
    }
  }
})

export default store
