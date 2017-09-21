<template>
  <div class="wrapper">
    <Navbar></Navbar>
    <div class="sem-main">
     <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from './navbar'
import Footer from './footer'

export default {
  name: 'main',
  components: { Navbar, Footer }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/css/baseStyle.scss";
</style>

