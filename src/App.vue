<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
html,body,p,h1,h2,h3,h4,h5,h6,ul,li{
    margin: 0;
    padding: 0;
}
html,body{
    height: auto;
    width:  100%;
    font-family:  Helvetica,Helvetica Neue, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
    color: #323968;
    font-size: 1rem;
    min-width: 1000px;
    word-break: break-all;
    word-wrap: break-word;
}
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
