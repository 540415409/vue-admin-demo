<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body,
#app,
.el-container {
  height: 100%;
  width: 100%;
  padding: 0 0;
  margin: 0 0;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #2c3e50;
  font-size: 14px;
  font-weight: 200;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
</style>
