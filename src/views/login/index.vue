<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
      label-position="left">

      <div class="title-container">
        <h3 class="title">后台管理系统</h3>
      </div>

      <el-form-item prop="username">
        <el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1" clearable
          auto-complete="on" />
      </el-form-item>

      <el-form-item prop="password">
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" placeholder="密码" name="password" clearable
          tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
      </el-form-item>

      <el-form-item prop="password">
        <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin"
          style="width: 100%;">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: 'admin'
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur'
          }],
          password: [{
            required: true,
            trigger: 'blur'
          }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('dologin', this.loginForm).then(() => {
              this.$router.push({
                path: this.redirect || '/'
              })
              this.loading = false
            }).catch((error) => {
              console.log('error error' + error)
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login-container {
    margin: 0 0;
    padding: 0 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(http://demo.ruoyi.vip/img/login-background.jpg);
    background-size: cover;
  }
</style>
