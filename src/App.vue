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
    height: 100%;
    width:  100%;
  }
  #app{
    height: 100%;
    width:  100%;
    font-family:  Helvetica,Helvetica Neue, Arial, PingFang SC, Hiragino Sans GB, WenQuanYi Micro Hei, Microsoft Yahei, sans-serif;
    color: #323968;
    font-size: 1rem;
 /*   min-width: 1000px;*/
    word-break: break-all;
    word-wrap: break-word;
  }
  ul{
    list-style: none;
  }
  li{

  }
  a:visited, a:link, a:hover,a{
    color: inherit;
    text-decoration: none;
  }
</style>
