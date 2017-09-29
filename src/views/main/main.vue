<template>
  <div class="wrapper">
    <Navbar></Navbar>
    <SideBar></SideBar>
    <div class="sem-main">
     <router-view></router-view>
    </div>

  </div>
</template>
<script>
import Navbar from './navbar'
import SideBar from './sidebar'

export default {
  name: 'main',
  components: { Navbar, SideBar }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/css/baseStyle.scss";
</style>

