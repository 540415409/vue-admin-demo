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
            <el-aside width="250px" class="app-left">
              <el-menu active-text-color="#ffd04b" router :default-active="this.$route.path" collapse-transition>
                <el-submenu :index="item.path" v-for="(item, index) in this.$store.getters.getRoutes" :key="index">
                  <template slot="title">
                    <i :class="item.meta.icon"></i>
                    <span class="menu-title">{{ item.meta.title }}</span>
                  </template>
                  <el-menu-item :index="child.path" v-for="(child, index) in item.children" :key="index">{{
                    child.meta.title }}</el-menu-item>
                </el-submenu>
              </el-menu>
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
      this.$router.push(`/login?redirect=/dashboard`)
    }
  },
  mounted() {
    console.log(this.$router.options);
    console.log(this.$store.getters.getRoutes);
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
  max-width: 230px;
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
