<template>
  <el-container>
    <el-header>
      <div class="header-body">
        <div class="header-body-user">
          创作者平台
        </div>
        <div class="header-body-logout" @click="logout">
          <el-avatar class="logout-btn"> {{ this.$store.state.userName }}</el-avatar>
        </div>
      </div>
    </el-header>
    <el-main class="main-wrap">
      <el-container>
        <el-row class="main-body">
          <el-col :span="4">
            <el-aside width="280px" class="app-left">
              <!--     <el-menu active-text-color="#ffd04b">
                <el-submenu index="0">
                  <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span class="menu-title">系统管理</span>
                  </template>
                  <el-menu-item index="0-1">用户管理</el-menu-item>
                  <el-menu-item index="0-2">角色管理</el-menu-item>
                  <el-menu-item index="0-3">菜单管理</el-menu-item>
                </el-submenu>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-s-data"></i>
                    <span class="menu-title">内容管理</span>
                  </template>
                  <el-menu-item index="1-1">视频管理</el-menu-item>
                  <el-menu-item index="1-2">音乐管理</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-s-custom"></i>
                    <span class="menu-title">互动管理</span>
                  </template>
                  <el-menu-item index="11-1">关注管理</el-menu-item>
                  <el-menu-item index="11-2">粉丝管理</el-menu-item>
                  <el-menu-item index="11-3">评论管理</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-video-camera-solid"></i>
                    <span class="menu-title">视频数据</span>
                  </template>
                  <el-menu-item index="12-1">数据总览</el-menu-item>
                  <el-menu-item index="12-2">作品数据</el-menu-item>
                  <el-menu-item index="12-3">粉丝面向</el-menu-item>
                </el-submenu>
              </el-menu> -->
            </el-aside>
          </el-col>
          <el-col :span="20">
            <div class="main-context">
              <router-view />
            </div>
          </el-col>
        </el-row>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {}
  },
  methods: {
    async logout() {
      await this.$store.dispatch('dologout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style scoped>
.el-main {
  padding: 0 0;
  margin: 0 0;
  background-color: #d1d1d1;
}

.el-header,
.el-main,
.el-footer {
  padding: 0 0;
  margin: 0 0;
  display: flex;
  justify-content: center;
  align-content: center;
}

.main-body,
.header-body {
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.header-body {
  justify-content: space-between;
  align-items: center;
}

.main-wrap {
  padding-top: 15px;
}

.app-left,
.main-context {
  height: 100%;
  background-color: #FFFFFF;
}

.el-menu {
  margin: 10px 10px;
  border: 0px;
}

/deep/ .el-submenu__title,
.el-submenu .el-menu-item {
  text-align: left !important;
}

.menu-title {
  font-size: 16px;
  font-weight: bolder;
}

.el-menu-item {
  padding-left: 52px !important;
}

.el-submenu {
  margin-right: 0px;
}

.logout-btn {
  cursor: pointer;
}
</style>
