import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/cookie'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'

Vue.use(Router)

const whiteList = ['/login'];
const title = '后台管理系统'

/*** 静态路由 ***/
export const constantRoutes = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
},
{
  path: '/',
  component: () => import('@/components/layout/index'),
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'dashboard'
    }
  }]
}
]

export const asyncRoutes = [{
  path: '/org',
  component: () => import('@/components/layout/index'),
  redirect: '/org/sysUser',
  name: 'Org',
  meta: {
    title: '用户管理',
    icon: 'el-icon-s-home',
    roles: ['SYS_USER']
  },
  children: [{
    path: 'sysRole',
    name: 'SysRole',
    component: () => import('@/views/sysRole/index'),
    meta: {
      title: '角色管理',
      roles: ['SYS_ROLE']
    }
  },
  {
    path: 'sysMenu',
    name: 'SysMenu',
    component: () => import('@/views/sysMenu/index'),
    meta: {
      title: '菜单管理',
      icon: 'sysMenu',
      roles: ['SYS_MENU']
    }
  },
  ],
}]

const createRouter = () => new Router({
  mode: 'hash',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}


router.beforeEach(async (to, from, next) => {
  document.title = title;
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      let userRoles = store.getters.getUserRoles;
      if (userRoles && userRoles.length > 0) {
        next()
      } else {
        try {
          const { userRoles } = await store.dispatch('getUserInfo')
          const accessRoutes = await store.dispatch('generateRoutes', userRoles);
          router.addRoutes(accessRoutes)
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          await store.dispatch('resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router